import React,{useState} from "react";
import axios from "axios";
import { AiOutlineStock, AiOutlineUpload } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

const FileUploader =({addedphotos, onChange})=>{

    

    const uploadphoto = async(ev)=>{

        ev.preventDefault();

        const files = ev.target.files;
        const datav = new FormData();
        for (let i = 0; i < files.length; i++) {
            datav.append('photos', files[i]);     
        }

     const {data:filenames} =  await axios.post('/app/upload', datav, {
            headers:{'Content-Type': 'multipart/form-data'}
        });
     
        console.log(filenames);
        onChange(prev=>{
            return [...prev, ...filenames];
        });


    }

    const removePic = (ev, filename)=>{
        ev.preventDefault();

        onChange([...addedphotos.filter(photo=>photo !== filename)]);
  
      }
    const selectMainphoto = (ev, filename)=>{
        ev.preventDefault();
        const addedPhotosWithoutSelected = addedphotos.filter(photo=>photo !== filename);
        const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
        onChange(newAddedPhotos);
    }
    
  return (
    <div>
        <div className="ml-8 mt-2 grid gap-2 grid-cols-3 w-[500px]  md:grid-cols-4 lg:grid-cols-6">
                        {addedphotos && addedphotos.length > 0 && addedphotos.map(photo=>(
                            <div className="h-32 gap-2 flex    relative" key={photo}>
                              <img className="rounded-2xl w-full object-cover" src={'http://localhost:3000/uploads/'+photo} /> 
                              <button onClick={ev=>removePic(ev, photo)} className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-1  px-2">
                                < AiOutlineDelete />
                                </button> 
                                <button onClick={ev=>selectMainphoto(ev, photo)} className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl  py-1 px-2">
                                {photo === addedphotos[0] && (
                                    < AiOutlineStock />
                                )}
                                {photo !== addedphotos[0] && (
                                     < AiOutlineStar />
                                )}
                                
                                </button>
                            </div>
                        ))}
                      <label className="cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl p-4 h-32 text-2xl  ">
                      <input type="file" multiple onChange={uploadphoto} className="hidden" /> <AiOutlineUpload /></label>
                      </div>
    </div>
  )

}

export default FileUploader

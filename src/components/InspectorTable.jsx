import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import {FaTelegramPlane, FaRenren, FaHouseUser, FaArrowDown, FaArrowUp} from "react-icons/fa";
import Searchdb from "./Searchdb";



function InspectorTable({datax}) {

  // Use the state and functions returned from useTable to build your UI
 
  const data = useMemo(()=>
    [
      {
        "id":"1",
        "name": "Nchima",
        "born": "Namibia"
      },
      {
        "id":"2",
        "name": "Nchima",
        "born": "Namibia"
      }
    ]
)
  const columns = useMemo(()=>
    [
      {
        Header: "ID",
      accessor: "_id"
      },
      {
        Header: "Name",
        accessor: "company_name"
      },
      {
        Header: "CIPA Number",
        accessor: "company_cipa"
      },
      {
        Header: "Ownership",
        accessor: "company_ownership"
      }

    ],
    []);

const animalsdata = useMemo(()=>[...datax], [datax]);
const animalsColumns = useMemo(()=>datax[0] ? Object.keys(datax[0]).filter((key)=> key !== "rating").map((key)=>{
  return {Header: key, accessor: key}

})  : [], [datax] );


const tableHooks = (hooks)=>{
  hooks.visibleColumns.push((columns)=>[
    ...columns,
    {
      id: "Edit",
      Header: "Manage",
      Cell:({row})=>(
        <Link className="" to={`/inspector/main/${row.values._id}`} >
           <FaHouseUser color="green" />
        </Link>  
      )
    }  
  ])

}

const initialState = {hiddenColumns: ['_id']};

 const tableInstance = useTable({columns:columns,
                                 data: animalsdata,
                                initialState},
                                 tableHooks,
                                 useGlobalFilter,
                                 useSortBy
                               );


 const {getTableProps, getTableBodyProps,
        headerGroups, rows, prepareRow, 
        preGlobalFilteredRows, setGlobalFilter, state} = tableInstance;


  // Render the UI for your table and the styles
  return (
  <div className="mt-8 flex flex-col">


        <Searchdb preGlobalFilteredRows={preGlobalFilteredRows} 
        setGlobalFilter={setGlobalFilter}
         globalFilter={state.globalFilter}  />
         
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div  className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border border-blue-500 sm:rounded-lg">
                    
                <table {...getTableProps()} className="min-w-full divide-y divide-blue-500">
                <thead>
                                    {headerGroups.map((headerGroup)=>(
                                      <tr {...headerGroup.getHeaderGroupProps()}>

                                        {headerGroup.headers.map((column)=>(
                                          <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-6 py-5 text-left text-20 font-medium text-gray-400 uppercase rounded-sm tracking-wider">
                                             {column.render("Header")} 
                                             {column.isSorted ? (column.isSortedDesc ? <FaArrowDown/> : <FaArrowUp/>) : "" }
                                          </th>
                                        ))}


                                      </tr>
                                    ))}
                                  </thead>
                                  <tbody {...getTableBodyProps()}>

                                    {rows.map((row)=>{

                                      prepareRow(row);

                                      return <tr {...row.getRowProps()}  className="hover:bg-green-200">
                                      {row.cells.map((cell, idx)=>(
                                        <td {...cell.getCellProps()} className="px-6 py-2 whitespace-nowrap uppercase">
                                           {cell.render("Cell")}
                                        </td>
                                      ))}
                                      </tr>

                                    })}

                                  </tbody>
                  </table>
                 

                </div>
              </div>
          </div>
         </div>
  );
}

export default InspectorTable;

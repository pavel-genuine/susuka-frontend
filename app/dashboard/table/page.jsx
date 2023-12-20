"use client";
import { useTable } from "react-table";

import React from "react";

const TestTablePage = () => {
  const data = React.useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
      {
        col1: "react-table",
        col2: "rocks",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
    ],
    []
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1",
        Cell: ({value}) =>  value+' Akash'
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );
  const { state,allColumns,flatRows,getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }); 
  return (
    <div>
      TestTablePage
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, indexH) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {/* {console.log(headerGroup.getHeaderGroupProps())} */}
              {headerGroup.headers.map((column, indexC) => (
                <th {...column.getHeaderProps()} key={indexC}>
                  {column.render("Header")}
                  {/* {console.log(column.getHeaderProps())} */}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => { 
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}> 
                {row.cells.map((cell) => {
                //  console.log(cell)
                  return (
                    <td {...cell.getCellProps()}>{cell?.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TestTablePage;

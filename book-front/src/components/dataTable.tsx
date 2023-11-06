import React from 'react';
import { useTable } from 'react-table';

export interface BookData {
  title: string;
  author: string;
  publish_date: Date;
  description: string;
}

interface DataTableProps {
  data: BookData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Author',
        accessor: 'author',
      },
      {
        Header: 'Publish Date',
        accessor: 'publish_date',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} style={{ border: '1px solid black', borderSpacing: 0, width: '100%' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{ borderBottom: '2px solid black', padding: '5px', background: 'lightgray' }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} style={{ borderBottom: '1px solid black', background: 'white' }}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()} style={{ padding: '5px', border: '1px solid black' }}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;

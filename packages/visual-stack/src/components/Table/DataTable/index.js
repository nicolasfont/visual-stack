import React from 'react';
import './DataTable.css';
import {
  TableContainer,
  TableTitle,
  THead,
  Tr,
  TBody,
  Table,
  Td,
  Th,
} from '../';
import Pagination from '../../Pagination';

const generateHeader = ({ label, width }) => (
  <Th style={width && { width }}>{label}</Th>
);

export const DataTable = ({ caption, columns, data }) => {
  return (
    <TableContainer>
      <TableTitle>{caption}</TableTitle>
      <Table>
        <THead>
          <Tr>{columns.map(generateHeader)}</Tr>
        </THead>
        <TBody>
          {data.map(rowItems => (
            <Tr>
              {rowItems.map(item => (
                <Td>{item}</Td>
              ))}
            </Tr>
          ))}
        </TBody>
      </Table>
      <Pagination
        className="vs-table-pagination"
        numberOfRows={data.length}
        rowsPerPage={10}
        page={1}
        onChange={() => {}}
      />
    </TableContainer>
  );
};

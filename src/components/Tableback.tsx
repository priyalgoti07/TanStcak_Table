import '../App.css';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { useState } from 'react';

interface TableProps<TData> {
    data: TData[],
    columns: ColumnDef<TData, any>[]
}

const Tableback = <TData,>({ data, columns }: TableProps<TData>) => {
    // Add sorting state to track sorting configuration
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting, //manage sorting here
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel() // This enables to sorting
    })

    console.log("setData", table);

    return (
        <>
            <TableContainer>
                <Table className='customTable' sx={{ boxShadow: "3" }}>
                    <TableHead >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header) => (
                                        <TableCell key={header.id} sx={{ backgroundColor: "#6b7280", fontWeight: "600" }}>
                                            {header.isPlaceholder ? null : (
                                                <TableSortLabel
                                                    active={header.column.getCanSort()} // Check if column is sortable
                                                    direction={header.column.getIsSorted() === 'desc' ? 'desc' : 'asc'}
                                                    onClick={header.column.getToggleSortingHandler()} // Toggle sorting when clicked
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                </TableSortLabel>
                                            )}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {
                            table.getRowModel().rows.map((row) => (
                                <TableRow>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default Tableback

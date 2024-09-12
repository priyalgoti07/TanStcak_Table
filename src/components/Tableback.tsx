import '../App.css';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { useMemo, useState } from 'react';

interface TableProps<TData> {
    data: TData[],
    columns: ColumnDef<TData, any> & { visibility?: boolean } [],
}

const Tableback = <TData,>({ data, columns }: TableProps<TData>) => {
    // Initialize visibility state based on columns passed as a prop
    const initialColumnVisibility = useMemo(() => {
        const visibilityState: Record<string, boolean> = {};
        columns.forEach((column) => {
            console.log("co",column);
            
            if ('accessorKey' in column && column.accessorKey) {

                visibilityState[column.accessorKey as string] = column.visibility !== undefined ? column.visibility : true;  // Use passed visibility or default to true
            }
        });
        return visibilityState;
    }, [columns]);


    // Add sorting state to track sorting configuration
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(initialColumnVisibility)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting, //manage sorting here
            columnVisibility, // Manage visibility here
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(), // This enables to sorting,
        onColumnVisibilityChange: setColumnVisibility
    })


    return (
        <div className='p-2'>
            <div className="inline-block border border-black shadow rounded">
                <div className="px-1 border-b border-black">
                    <label>
                        <input
                            {...{
                                type: 'checkbox',
                                checked: table.getIsAllColumnsVisible(),
                                onChange: table.getToggleAllColumnsVisibilityHandler(),
                            }}
                        />{' '}
                        Toggle All
                    </label>
                </div>

                {table.getAllLeafColumns().map((column) => {
                    return (
                        <div key={column.id} className="px-1">
                            <label>
                                <input type='checkbox' checked={column.getIsVisible()} onChange={column.getToggleVisibilityHandler()} />
                                {' '}
                                {column.id}

                            </label>
                        </div>

                    )
                }
                )}
            </div>
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

        </div>
    )
}

export default Tableback

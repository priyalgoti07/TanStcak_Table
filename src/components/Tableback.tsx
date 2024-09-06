import '../App.css';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface TableProps<TData> {
    data: TData[],
    columns: ColumnDef<TData, any>[]
}

const Tableback = <TData,>({ data, columns }: TableProps<TData>) => {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
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
                                        <TableCell key={headerGroup.id} sx={{ backgroundColor: "#6b7280", fontWeight: "600" }}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
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

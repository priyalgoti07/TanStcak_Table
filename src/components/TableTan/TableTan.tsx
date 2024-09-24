import { TableContainer, TableHead, Table, TableFooter, TableRow, TableCell, TableSortLabel, TableBody } from '@mui/material'
import { useTableData } from '../useTableData'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { User } from '../../types'
import '../TableTan/tabletan.css' 
// import "../../App.css"


const TableTan = () => {
    const { data, columns } = useTableData()
    console.log(data, columns)
    const table = useReactTable<User>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    return (
        <TableContainer>
            <Table className='customTable' sx={{ boxShadow: "3" }}>
                <TableHead >
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {
                                headerGroup.headers.map((header) => (
                                    <TableCell key={header.id} sx={{ backgroundColor: "#dcdfe5", fontWeight: "600" }}  colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (flexRender(header.column.columnDef.header, header.getContext()))}
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
                <TableFooter >
                    {table.getHeaderGroups().map((footerGroup) => (
                        <TableRow key={footerGroup.id}>
                            {
                                footerGroup.headers.map((footer) => (
                                    <TableCell key={footer.id} sx={{ fontWeight: "600" }}>
                                        {footer.isPlaceholder ? null : flexRender(footer.column.columnDef.footer, footer.getContext())}</TableCell>
                                ))
                            }
                        </TableRow>
                    ))}
                </TableFooter>
            </Table>

        </TableContainer>)
}

export default TableTan
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { User } from "../types";
import { USERS } from "../data";
import moment from "moment";
import { Avatar, Checkbox, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const DISPLAY_COLUMN_SIZE = 100;

const columnHelper = createColumnHelper<User>();

export const useTableData = () => {
  const [data, setData] = useState(USERS);

  const columns = useMemo(
    () => [
      columnHelper.group({
        id: 'info',
        header: 'Info', 
        columns: [
          columnHelper.accessor("name", {
            id: "name",
            header: "Name",
          }),

          columnHelper.accessor("birthDate", {
            id: "birthDate",
            header: "Birth Date",
            cell: ({ getValue }) => moment(getValue()).format("DD/MM/YYYY")
          }),
        ]
      })
      ,
      columnHelper.display({
        id: "selection",
        header: () => <Checkbox />,
        cell: () => <Checkbox />
      }),

      columnHelper.display({
        id: "expand",
        cell: () => <Stack >
          <LocalHospitalIcon />
        </Stack>,
        size: DISPLAY_COLUMN_SIZE,
      }),

      columnHelper.accessor("id", {
        id: "id",
        header: "Id",
      }),

      columnHelper.accessor("avatar", {
        id: "avatar",
        header: "Avatar",
        cell: ({ getValue }) => <Stack>
          <Avatar src={getValue()}></Avatar>
        </Stack>
      }),


      columnHelper.accessor("age", {
        id: "age",
        header: "Age",
        footer: ({ table }) => table.getFilteredRowModel().rows.reduce((acc, val) => {
          acc += Number(val.getValue("age"))
          return acc
        }, 0)
      }),
      columnHelper.display({
        id: "delete",
        header: () => <DeleteIcon style={{ color: 'red' }} />,
        cell: () => <Stack >
          <DeleteIcon style={{ color: 'red' }} />
        </Stack>,
        size: DISPLAY_COLUMN_SIZE,
      }),
    ],
    []
  );

  const columnIds = useMemo(
    () => columns.map((column) => column.id) as string[],
    []
  );

  const initialColumnVisibility = useMemo(() => {
    return columnIds.reduce((acc: { [id: string]: boolean }, val) => {
      acc[val] = true;
      return acc;
    }, {});
  }, []);
  return { data, columns, initialColumnVisibility, columnIds };
};
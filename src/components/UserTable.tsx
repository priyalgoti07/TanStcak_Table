import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import Tableback from './Tableback';

interface Geo {
    lat: String;
    lng: String;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string
}
interface User {
    id: number;
    name: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

const UserTable: React.FC = () => {
    const [apiData, setApiData] = useState<User[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users")
                setApiData(response.data)
            } catch (error) {
                console.error("Error fetching Data", error)
            }
        }
        fetchData()
    }, [])

    const columns = useMemo<ColumnDef<unknown, any>[]>(() =>
        [{
            accessorKey: 'name',
            header: 'Name',
            enableSorting: true,
            enableHiding: true,
            footer: 'name'
        },
        {
            accessorKey: 'email',
            header: 'Email',
            enableSorting: true,
            enableHiding: true,
        },
        {
            accessorKey: 'address.suite',
            header: 'Suite',
            enableSorting: false,
            enableHiding: true,
        },
        {
            accessorKey: 'address.city',
            header: 'City',
            enableSorting: false,
            enableHiding: true,
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
            enableSorting: true,
            enableHiding: true,
        },
        {
            accessorKey: 'website',
            header: 'Website',
            enableSorting: false,
            enableHiding: true,
        },
        {
            accessorKey: 'company.name',
            header: 'Company Name',
            enableSorting: true,
            enableHiding: true,
        },]
        , [])

    return (
        <React.Fragment>
            <Tableback data={apiData} columns={columns} />
        </React.Fragment>
    )
}

export default UserTable
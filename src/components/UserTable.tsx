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
type initialColumnVisibility = {
    name: boolean,
    email: boolean,
    'address.suite': boolean,
    'address.city': boolean,
    phone: boolean,
    website: boolean,
    'company.name': boolean,
};

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
            visibility: true,
        },
        {
            accessorKey: 'email',
            header: 'Email',
            enableSorting: true,
            visibility: true,
        },
        {
            accessorKey: 'address.suite',
            header: 'Suite',
            enableSorting: false,
            visibility: true,
        },
        {
            accessorKey: 'address.city',
            header: 'City',
            enableSorting: false,
            visibility: true,
        },
        {
            accessorKey: 'phone',
            header: 'Phone',
            enableSorting: true,
            visibility: true,
        },
        {
            accessorKey: 'website',
            header: 'Website',
            enableSorting: false,
            visibility: true,
        },
        {
            accessorKey: 'company.name',
            header: 'Company Name',
            enableSorting: true,
            visibility: true,
        },]
        , [])

    return (
        <React.Fragment>
            <Tableback data={apiData} columns={columns} />
        </React.Fragment>
    )
}

export default UserTable
/* eslint-disable no-unused-vars */
import { DataTable, TableColumn } from '~/components/elements';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserType } from '~/core/types';
import { PaginationType, defaultPaginationData } from '~/core/types/pagination';
import { useExportContext } from '~/core/provider/export/ExportContextProvider';
import { exportUsers } from '~/core/helper';
import { get_users } from '~/api/user';
import { CustomError } from '~/core/libs';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import DeleteUserModal from './modal/DeleteUserModal';
import EditUserModal from './modal/EditUserModal';

export const UsersPage = () => {
    const location = useLocation();

    const query = location.search;

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    const [users, setUsers] = useState<PaginationType<UserType>>(
        defaultPaginationData
    );

    const [keyword, setKeyword] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

    const { setExportData } = useExportContext();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newKeyword = e.target.value;
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        const timeoutId = window.setTimeout(() => {
            setKeyword(newKeyword);
        }, 300);
        setDebounceTimeout(timeoutId);
    };

    const columns: TableColumn<UserType>[] = [
        {
            title: 'First Name',
            cell: row => row.firstName,
        },
        {
            title: 'Last Name',
            cell: row => row.lastName,
        },
        {
            title: 'Email',
            cell: row => row.email,
        },
        {
            title: 'Username',
            cell: row => row.username,
        },
        {
            title: 'Roles',
            cell: row => row?.roles?.map(role => role.name).join(', '),
        },
        {
            title: 'Status',
            cell: row => row.status,
        },
        {
            title: 'Actions',
            cell: row => (
                <div
                    className="flex gap-3"
                    onClick={() => setSelectedUser(row)}
                >
                    <TrashIcon
                        className="w-5 cursor-pointer"
                        onClick={() => {
                            setIsDeleteModalOpen(true);
                        }}
                    />
                    <PencilIcon
                        className="w-5 cursor-pointer"
                        onClick={() => {
                            setIsEditModalOpen(true);
                        }}
                    />
                </div>
            ),
        },
    ];

    const handleGetUsers = async () => {
        try {
            setIsLoading(true);
            const data = await get_users(query);
            setUsers(data.payload);
            setExportData(exportUsers(data.payload.items || []));
        } catch (error) {
            if (error instanceof CustomError) toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateQueryParams = () => {
        const searchParams = new URLSearchParams(location.search);
        if (!searchParams.has('page')) searchParams.set('page', '1');
        if (!searchParams.has('limit')) searchParams.set('limit', '10');
        if (!searchParams.has('roles')) searchParams.set('roles', 'true');
        if (keyword) searchParams.set('search', keyword.toString());
        else searchParams.delete('search');
        const newSearch = searchParams.toString();
        navigate(`${location.pathname}?${newSearch}`);
    };

    useEffect(() => {
        updateQueryParams();
    }, [keyword]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.has('page') && searchParams.has('limit'))
            handleGetUsers();
    }, [query]);

    return (
        <div className="h-full w-full">
            <div className="float-right flex flex-wrap justify-between gap-4 whitespace-nowrap py-4">
                <div className="flex gap-3">
                    <input
                        type="text"
                        className="w-[10rem] rounded border px-3 py-2 text-xs lg:w-[15rem]"
                        placeholder="Search..."
                        defaultValue={keyword}
                        id="search"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <DataTable
                columns={columns}
                data={users.items}
                isLoading={isLoading}
                currentPage={users.currentPage}
                totalItems={users.totalItems}
                totalPages={users.totalPages}
            />
            <DeleteUserModal
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                selectedUser={selectedUser}
            />
            <EditUserModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                selectedUser={selectedUser}
            />
        </div>
    );
};

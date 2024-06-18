import { BookOpenIcon, UsersIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { RootState } from '~/core/types/redux';
import { checkRoles } from '~/core/utils/check-role';

export const DashboardPage: React.FC = () => {
    const { userData } = useSelector((state: RootState) => state.user);

    const AdminCards = () => {
        return (
            <>
                <div className="flex w-[20rem] items-center justify-between rounded bg-white p-5 shadow-md">
                    <div>
                        <div className="text-sm text-gray-400 ">Users</div>
                        <div className="flex items-center pt-1">
                            <div className="text-xl font-medium text-primary-500">
                                0
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-400">
                        <UsersIcon color="#000" className="h-10 w-10" />
                    </div>
                </div>
                <div className="flex w-[20rem] items-center justify-between rounded bg-white p-5 shadow-md">
                    <div>
                        <div className="text-sm text-gray-400 ">Books</div>
                        <div className="flex items-center pt-1">
                            <div className="text-xl font-medium text-primary-500 ">
                                0
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-300">
                        <BookOpenIcon color="#000" className="h-10 w-10" />
                    </div>
                </div>
                <div className="flex w-[20rem] items-center justify-between rounded bg-white p-5 shadow-md">
                    <div>
                        <div className="text-sm text-gray-400 ">
                            Total Borrowed Books
                        </div>
                        <div className="flex items-center pt-1">
                            <div className="text-xl font-medium text-primary-500 ">
                                0
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-300">
                        <BookOpenIcon color="#000" className="h-10 w-10" />
                    </div>
                </div>
                <div className="flex w-[20rem] items-center justify-between rounded bg-white p-5 shadow-md">
                    <div>
                        <div className="text-sm text-gray-400 ">
                            Total Returned Books
                        </div>
                        <div className="flex items-center pt-1">
                            <div className="text-xl font-medium text-primary-500 ">
                                0
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-300">
                        <BookOpenIcon color="#000" className="h-10 w-10" />
                    </div>
                </div>
            </>
        );
    };

    const UserCards = () => {
        return (
            <>
                <div className="flex w-[20rem] items-center justify-between rounded bg-white p-5 shadow-md">
                    <div>
                        <div className="text-sm text-gray-400 ">
                            Borrowed Books
                        </div>
                        <div className="flex items-center pt-1">
                            <div className="text-xl font-medium text-primary-500">
                                0
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-400 ">
                        <BookOpenIcon color="#000" className="h-10 w-10" />
                    </div>
                </div>

                <div className="flex w-[20rem] items-center justify-between rounded bg-white p-5 shadow-md">
                    <div>
                        <div className="text-sm text-gray-400 ">
                            Returned Books
                        </div>
                        <div className="flex items-center pt-1">
                            <div className="text-xl font-medium text-primary-500">
                                0
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-400 ">
                        <BookOpenIcon color="#000" className="h-10 w-10" />
                    </div>
                </div>
            </>
        );
    };
    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div className="w-full text-sm">
                <div className="container mx-auto w-full py-2 px-3">
                    <div className="flex flex-wrap gap-7">
                        {checkRoles(['admin'], userData) ? (
                            <AdminCards />
                        ) : (
                            <UserCards />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

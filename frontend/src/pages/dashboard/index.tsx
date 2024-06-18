import { BookOpenIcon, UsersIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get_stats } from '~/api/stats';
import { Spinner } from '~/components/elements';
import { CustomError } from '~/core/libs';
import { RootState } from '~/core/types/redux';
import { StatsTypes } from '~/core/types/stat';
import { checkRoles } from '~/core/utils/check-role';

export const DashboardPage: React.FC = () => {
    const { userData } = useSelector((state: RootState) => state.user);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [stats, setStats] = useState<StatsTypes>({ books: 0, users: 0 });

    const handleGetStats = async () => {
        try {
            setIsLoading(true);
            if (checkRoles(['admin'], userData)) {
                const data = await get_stats();
                setStats(data.payload.stats);
            }
        } catch (error) {
            if (error instanceof CustomError) toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleGetStats();
    }, []);

    const AdminCards = () => {
        return (
            <>
                <div className="flex w-[20rem] items-center justify-between rounded bg-white p-5 shadow-md">
                    <div>
                        <div className="text-sm text-gray-400 ">Users</div>
                        <div className="flex items-center pt-1">
                            <div className="text-xl font-medium text-primary-500">
                                {isLoading ? (
                                    <Spinner size="sm" />
                                ) : (
                                    stats.users
                                )}
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
                                {isLoading ? (
                                    <Spinner size="sm" />
                                ) : (
                                    stats.books
                                )}
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
                                {isLoading ? <Spinner size="sm" /> : 0}
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
                                {isLoading ? <Spinner size="sm" /> : 0}
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
                                {isLoading ? <Spinner size="sm" /> : 0}
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
                                {isLoading ? <Spinner size="sm" /> : 0}
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

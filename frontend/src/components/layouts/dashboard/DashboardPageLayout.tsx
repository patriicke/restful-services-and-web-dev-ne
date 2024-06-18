import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardContextProvider } from '~/core/provider/dashboard/DashboardContextProvider';
import { SideBar } from '~/components/ui/sidebar/SideBar';
import { AdminNavBar } from '~/components/ui/navbar/AdminNavBar';

export const DashboardPageLayout: React.FC = () => {
    return (
        <DashboardContextProvider>
            <section className="flex h-screen w-full overflow-x-hidden">
                <SideBar />
                <div className="h-full w-full">
                    <AdminNavBar />
                    <section className="h-[calc(100%_-_4rem)] bg-white p-3">
                        <Outlet />
                    </section>
                </div>
            </section>
        </DashboardContextProvider>
    );
};

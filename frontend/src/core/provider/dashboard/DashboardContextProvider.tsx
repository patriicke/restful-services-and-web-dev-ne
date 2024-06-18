import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { ExportContextProvider } from '../export/ExportContextProvider';

export type DashboardContextType = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
};

export const DashboardContext = createContext<DashboardContextType>({
    isSidebarOpen: false,
    toggleSidebar: () => {},
});

export const DashboardContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <DashboardContext.Provider
            value={{
                isSidebarOpen,
                toggleSidebar,
            }}
        >
            <ExportContextProvider>{children}</ExportContextProvider>
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error(
            'useDashboardContext must be used within a DashboardContextProvider'
        );
    }
    return context;
};

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMAGES } from '~/assets/images';
import { SVGS } from '~/assets/svgs';
import { useSideBarLinks } from '~/core/hooks/useSidebarLinks';
import { useDashboardContext } from '~/core/provider/dashboard/DashboardContextProvider';
import { RootState } from '~/core/types/redux';

export const SideBar: React.FC = () => {
    const [currentLink, setCurrentLink] = useState<number>(0);

    const { isSidebarOpen, toggleSidebar } = useDashboardContext();
    const { userData } = useSelector((state: RootState) => state.user);
    const { sidebarLinks } = useSideBarLinks();

    const SIDE_BAR_ADMIN_ELEMENT = useRef<any>(null);

    useEffect(() => {
        const clickEvent = (event: MouseEvent) => {
            if (!SIDE_BAR_ADMIN_ELEMENT.current?.contains(event?.target))
                isSidebarOpen && toggleSidebar();
        };
        document.addEventListener('mousedown', clickEvent);
        return () => {
            document.removeEventListener('mousedown', clickEvent);
        };
    }, [isSidebarOpen, toggleSidebar]);

    useEffect(() => {
        sidebarLinks.forEach(({ href }, index) => {
            if (window.location.href.includes(href.toLowerCase()))
                setCurrentLink(index);
        });
    }, []);

    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-[rgb(17,25,40)] opacity-80  lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
            <aside
                className={`fixed transform transition-transform lg:relative lg:block ${
                    isSidebarOpen ? 'translate-x-0 ' : '-translate-x-full'
                } z-50 w-[18rem] shadow-xl lg:translate-x-0`}
                ref={SIDE_BAR_ADMIN_ELEMENT}
            >
                <div className="flex h-screen flex-col bg-white p-4 text-gray-800">
                    <div className="flex flex-col items-center">
                        <div className="mb-4 h-24 w-24">
                            <img
                                src={IMAGES.User}
                                alt="profile"
                                className="h-full w-full rounded-full"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center text-center">
                            <p className="text-sm">Hello 👋</p>
                            <h6 className="text-base font-semibold">
                                {userData.firstName} {userData.lastName}
                            </h6>
                        </div>
                    </div>

                    <div className="mt-6 mb-4">
                        <form
                            className="flex rounded-md border p-1"
                            onSubmit={e => {
                                e.preventDefault();
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="flex-1 border-none px-4 py-2 text-xs text-black outline-none"
                            />
                            <button className="px-4">
                                <SVGS.Search />
                            </button>
                        </form>
                    </div>

                    <nav className="flex-1">
                        <ul className="flex flex-col gap-3">
                            {sidebarLinks.map(({ href, icon, name }, index) => (
                                <li
                                    key={index}
                                    onClick={() => setCurrentLink(index)}
                                >
                                    <Link
                                        to={href}
                                        className={`flex items-center gap-4 rounded-md px-4 py-3 text-xs ${
                                            currentLink === index
                                                ? 'bg-primary-500 text-white'
                                                : 'text-gray-500 hover:bg-primary-600 hover:text-white'
                                        }`}
                                    >
                                        <FontAwesomeIcon
                                            icon={icon}
                                            className="text-xs"
                                        />
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
};

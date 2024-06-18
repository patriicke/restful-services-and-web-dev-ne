import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDashboardContext } from '~/core/provider/dashboard/DashboardContextProvider';
import { SVGS } from '~/assets/svgs';
import UserDropdown from './UserDropDown';
import { useSideBarLinks } from '~/core/hooks/useSidebarLinks';

export const AdminNavBar = () => {
    const { toggleSidebar } = useDashboardContext();
    const { sidebarLinks } = useSideBarLinks();

    const [currentLink, setCurrentLink] = useState<number>(0);

    useEffect(() => {
        sidebarLinks.map(({ href }, index) => {
            if (window.location.href.includes(href.toLowerCase()))
                setCurrentLink(index);
        });
    }, [window.location.href]);

    return (
        <header className="h-16 w-full bg-primary-500 px-3">
            <div className="flex h-full w-full items-center justify-between gap-3">
                <button
                    className="d j h/2 qa ya fb xb/2 dc fc oc gf duration-200 xl:hidden"
                    onClick={() => {
                        toggleSidebar();
                    }}
                >
                    <SVGS.Menu />
                </button>
                <div className="flex h-full w-full items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                        <div className="">
                            <ul className="flex items-center">
                                <li className="flex items-center">
                                    <span className="flex items-center text-xs font-semibold text-white hover:text-opacity-80">
                                        <span className="pr-2">
                                            <FontAwesomeIcon icon={faHouse} />
                                        </span>
                                    </span>
                                    <span className="px-3 text-white">
                                        <SVGS.ForwardArrow />
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-xs font-semibold text-white hover:text-opacity-80">
                                        Admin
                                    </span>
                                    <span className="px-3 text-white">
                                        <SVGS.ForwardArrow />
                                    </span>
                                </li>
                                {sidebarLinks.map(({ name }, index) => {
                                    return (
                                        <li
                                            className="text-xs font-semibold text-white text-opacity-80"
                                            key={index}
                                        >
                                            {currentLink === index && name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <UserDropdown />
                    </div>
                </div>
            </div>
        </header>
    );
};

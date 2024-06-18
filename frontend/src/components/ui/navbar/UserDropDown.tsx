import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout_user } from '~/api/auth';
import { IMAGES } from '~/assets/images';
import { removeTokensRedux } from '~/core/redux/slices/tokensSlice';
import { removeUserRedux } from '~/core/redux/slices/userSlice';
import { RootState } from '~/core/types/redux';

const UserDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userData } = useSelector((state: RootState) => state.user);
    const { tokensData } = useSelector((state: RootState) => state.tokens);

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logout_user({ refreshToken: tokensData.refreshToken });
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(removeTokensRedux());
            dispatch(removeUserRedux());
            setIsLoading(false);
            navigate('/login');
        }
    };

    return (
        <div
            className="relative inline-block text-left"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div>
                <button
                    className="flex items-center space-x-2 focus:outline-none"
                    id="menu-button"
                    aria-expanded={isOpen ? 'true' : 'false'}
                    aria-haspopup="true"
                >
                    <img
                        src={IMAGES.User}
                        alt="avatar"
                        className="h-8 w-8 rounded-full"
                    />
                    <svg
                        width={14}
                        height={14}
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.08754 4.83687C3.31535 4.60906 3.68469 4.60906 3.9125 4.83687L7.00002 7.92439L10.0875 4.83687C10.3154 4.60906 10.6847 4.60906 10.9125 4.83687C11.1403 5.06468 11.1403 5.43402 10.9125 5.66183L7.4125 9.16183C7.1847 9.38963 6.81535 9.38963 6.58754 9.16183L3.08754 5.66183C2.85974 5.43402 2.85974 5.06468 3.08754 4.83687Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="absolute right-0 mt-0 w-48 py-2">
                    <div
                        className="w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex={-1}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="py-1" role="none">
                            <span
                                className="block truncate px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                                tabIndex={-1}
                            >
                                {userData.email}
                            </span>
                            <Link
                                to="#"
                                className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                                tabIndex={-1}
                            >
                                Account Settings
                            </Link>
                            <Link
                                to="#"
                                className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                                tabIndex={-1}
                                onClick={handleLogout}
                            >
                                {isLoading ? 'Signing Out...' : 'Sign Out'}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;

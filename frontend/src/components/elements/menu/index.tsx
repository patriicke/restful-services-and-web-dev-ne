import React from 'react';

type MenuIconProps = {
    fillColor: string;
};

const MenuIcon = (props: MenuIconProps) => {
    const { fillColor } = props;
    return (
        <svg
            width={27}
            height={27}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            opacity={80}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.45833 10.0007C1.45833 9.42535 1.9247 8.95898 2.49999 8.95898H17.5C18.0753 8.95898 18.5417 9.42535 18.5417 10.0007C18.5417 10.5759 18.0753 11.0423 17.5 11.0423H2.49999C1.9247 11.0423 1.45833 10.5759 1.45833 10.0007Z"
                fill={fillColor}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.45833 5.00065C1.45833 4.42535 1.9247 3.95898 2.49999 3.95898H17.5C18.0753 3.95898 18.5417 4.42535 18.5417 5.00065C18.5417 5.57595 18.0753 6.04232 17.5 6.04232H2.49999C1.9247 6.04232 1.45833 5.57595 1.45833 5.00065Z"
                fill={fillColor}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.45833 15.0007C1.45833 14.4254 1.9247 13.959 2.49999 13.959H17.5C18.0753 13.959 18.5417 14.4254 18.5417 15.0007C18.5417 15.5759 18.0753 16.0423 17.5 16.0423H2.49999C1.9247 16.0423 1.45833 15.5759 1.45833 15.0007Z"
                fill={fillColor}
            />
        </svg>
    );
};

export default MenuIcon;

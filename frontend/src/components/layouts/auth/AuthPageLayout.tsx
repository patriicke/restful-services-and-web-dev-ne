import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthPageLayout:React.FC = () => {
    return (
        <Outlet />
    );
};

export default AuthPageLayout;
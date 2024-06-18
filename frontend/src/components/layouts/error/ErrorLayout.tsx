import { Link } from 'react-router-dom';

export const ErrorLayout = () => {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center ">
            <h2>500 Internal Server Error</h2>
            <Link to={'/'} className="nav__link">
                Reload
            </Link>
        </div>
    );
};

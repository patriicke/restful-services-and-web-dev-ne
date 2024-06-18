import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ProtectorPropsType } from '../types';
import { RootState } from '~/core/types/redux';

export const AuthRouteProtector = (props: ProtectorPropsType): JSX.Element => {
    const { element } = props;

    const { userData } = useSelector((state: RootState) => state.user);
    const { tokensData } = useSelector((state: RootState) => state.tokens);

    if (userData.id && tokensData.accessToken)
        return <Navigate to={'/dashboard'} />;

    return element;
};

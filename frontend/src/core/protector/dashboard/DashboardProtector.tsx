import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ProtectorPropsType } from '../types';
import { RootState } from '~/core/types/redux';

export const DashboardProtector = (props: ProtectorPropsType): JSX.Element => {
    const { element } = props;

    const { userData } = useSelector((state: RootState) => state.user);
    const { tokensData } = useSelector((state: RootState) => state.tokens);

    if (!userData.id || !tokensData.accessToken)
        return <Navigate to={'/auth/login'} />;

    return element;
};

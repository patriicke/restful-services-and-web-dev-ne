import { useDispatch } from 'react-redux';
import { removeUserRedux } from '../redux/slices/userSlice';
import { removeTokensRedux } from '../redux/slices/tokensSlice';

export const useLogout = () => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(removeUserRedux());
        dispatch(removeTokensRedux());
    };

    return { logout };
};

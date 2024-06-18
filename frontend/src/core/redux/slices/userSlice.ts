import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '~/core/types';

const userData: UserType = {
    id: '',
    email: '',
    roles: [],
    username: '',
    firstName: '',
    createdAt: '',
    updatedAt: '',
    lastName: '',
    phoneNumber: '',
    status: '',
};

const userSlice = createSlice({
    name: 'userData',
    initialState: {
        userData: userData,
    },
    reducers: {
        adduserRedux: (state, { payload }) => {
            state.userData = { ...payload };
        },
        removeUserRedux: state => {
            state.userData = userData;
        },
        updateUserRedux: (state, { payload }) => {
            state.userData = { ...payload };
        },
    },
});

export const { adduserRedux, removeUserRedux, updateUserRedux } =
    userSlice.actions;

export default userSlice.reducer;

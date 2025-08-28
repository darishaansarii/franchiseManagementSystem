import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    loading: false,
    error: false,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state, actions) => {
            state.loading = true;
            state.error=false;
            state.isAuthenticated = false
        },
        loginSuccess: (state, actions) => {
            state.loading = false;
            state.error=false;
            state.isAuthenticated = true;
            state.user = actions.payload;
        },
        loginFailure: (state, actions) => {
            state.loading = false;
            state.error=actions.payload;
            state.isAuthenticated = false;
        },
        logout: (state, actions) => {
            state.loading = false;
            state.error=false;
            state.isAuthenticated = false;
            state.user=null;
        }
    }
});

const {actions, reducer} = authSlice;
export default reducer;
export const {loginStart, loginFailure, loginSuccess, logout} = actions;
import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    // PASSWORD_RESET_FAIL,
    // PASSWORD_RESET_SUCCESS,
    // PASSWORD_RESET_CONFIRM_FAIL,
    // PASSWORD_RESET_CONFIRM_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    // ACTIVATION_SUCCESS,
    // ACTIVATION_FAIL,
    LOGOUT
} from './auth-types';


const API_BASE = 'http://68.183.56.201';

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({token: localStorage.getItem('access')});

        try {
            const res = await axios.post(`${API_BASE}/auth/jwt/verify/`, body, config);

            if (res.data.code !== 'token_not_valid') {
                dispatch({type: AUTHENTICATED_SUCCESS});
            } else {
                dispatch({type: AUTHENTICATED_FAIL});
            }
        } catch (err) {
            dispatch({type: AUTHENTICATED_FAIL});
        }
    } else {
        dispatch({type: AUTHENTICATED_FAIL});
    }
}

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${API_BASE}/auth/users/me/`, config);
            dispatch({type: USER_LOADED_SUCCESS, payload: res.data});
        } catch (err) {
            dispatch({type: USER_LOADED_FAIL});
        } 
    } else {
        dispatch({type: USER_LOADED_FAIL});
    } 
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${API_BASE}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());

        return res;

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};

export const signup = (email, first_name, last_name, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, first_name, last_name, password, re_password});

    try {
        const res = await axios.post(`${API_BASE}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        return res;
    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
        });
    };
};

// TODO rewrite the _apiBase
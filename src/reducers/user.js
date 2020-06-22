import UserConstants from '../constants/user';

const INITIAL_STATE = {
    name: '',
    email: '',
    thumb: '',
    error: '',
    status: ''
};

export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UserConstants.GET_USER_REQUEST:
            return {
                ...state,
                status: 'requesting'
            }
        case UserConstants.GET_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                status: 'concluded'
            }
        case UserConstants.USER_LOGOUT:
            return {
                name: '',
                email: '',
                thumb: '',
                error: '',
                status: ''
            }
        case UserConstants.GET_USER_FAILED:
            return {
                ...state,
                error: action.payload.message,
                status: 'error'
            }
        default:
            return state;
    }
}
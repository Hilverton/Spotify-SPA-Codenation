import AuthConstants from '../constants/auth';

const INITIAL_STATE = {
    error: '',
    status: '',
    isLogged: false,
    accessToken: '',
    tokenType: '',
    expirationTime: '',
    expiresIn: ''
}

export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AuthConstants.AUTH_CALLBACK_ERROR:
            return {
                ...state,
                error: action.payload,
                status: 'error'
            }
        case AuthConstants.AUTH_CALLBACK_SUCCESS:
            return {
                ...state,
                status: 'ok',
                isLogged: true,
                tokenType: action.payload.tokenType,
                expirationTime: new Date().getTime() + parseInt(action.payload.expiresIn),
                expiresIn: action.payload.expiresIn,
                error: '',
                accessToken: action.payload.accessToken
            }
        default:
            return state;
    }
}
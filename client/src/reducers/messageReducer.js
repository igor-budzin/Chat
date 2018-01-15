import {
    SOCKET_CONNECTION_REQUEST,
    SOCKET_CONNECTION_SUCCESS,
    SOCKET_CONNECTION_ERROR
} from '../configs/actionConstans';

const initialState = {
    loaded: false,
    message: 'Just created',
    connected: false
}

export default function messageReducer(state = initialState, action) {
    switch(action.type) {
        case 'dd':
            // console.log(action);
            return state;

        default:
            return state;
    }
}

import {SOCKET_CONNECTION_SUCCESS} from '../configs/actionConstans';

const initialState = {
    isSocket: false
}

export default function messageReducer(state = initialState, action) {
    switch(action.type) {
        case SOCKET_CONNECTION_SUCCESS:
            return {...state, isSocket: true};

        default:
            return state;
    }
}

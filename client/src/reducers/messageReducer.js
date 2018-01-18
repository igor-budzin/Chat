import {SOCKET_MESSAGE_EMMIT, SOCKET_MESSAGE_ON} from '../configs/actionConstans';

const initialState = {

}

export default function messageReducer(state = initialState, action) {
    switch(action.type) {
        case SOCKET_MESSAGE_ON:
        console.log("SOCKET_MESSAGE_ON reducer - ", action);
            return {...state, ...action.payload};

        default:
            return state;
    }
}

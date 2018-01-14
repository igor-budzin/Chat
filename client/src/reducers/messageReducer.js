import {SEND_MESSAGE} from '../configs/actionConstans';

const initialState = {
    loaded: false,
    message: 'Just created',
    connected: false
}

export default function messageReducer(state = initialState, action) {
    switch(action.type) {
        case SEND_MESSAGE:
        console.log("SEND_MESSAGE");
            return state;

        default:
            return state;
    }
}

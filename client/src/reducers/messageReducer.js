import {HISTORY_MESSAGE_GET} from '../configs/actionConstans';

const initialState = {
    messageArray: []
}

export default function messageReducer(state = initialState, action) {
    switch(action.type) {
        case HISTORY_MESSAGE_GET:
            const messageArray = action.payload;
            return Object.assign({}, state, {messageArray});

        default:
            return state;
    }
}

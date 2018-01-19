import {
    HISTORY_MESSAGE_GET,
    NEW_MESSAGE_GET
} from '../configs/actionConstans';

const initialState = {
    messageArray: []
}

export default function messageReducer(state = initialState, action) {
    let messageArray;
    switch(action.type) {
        case HISTORY_MESSAGE_GET:
            messageArray = action.payload;
            return Object.assign({}, state, {messageArray});

        case NEW_MESSAGE_GET:
            messageArray = state.messageArray;
            messageArray.push(action.payload)
            return Object.assign({}, state, {messageArray});

        default:
            return state;
    }
}

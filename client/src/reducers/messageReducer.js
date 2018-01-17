import {HISTORY_MESSAGE_GET} from '../configs/actionConstans';

const initialState = {

}

export default function messageReducer(state = initialState, action) {
    switch(action.type) {
        case HISTORY_MESSAGE_GET:
        console.log("HISTORY_MESSAGE_GET reducer - ", action);
            return {...state, ...action.payload};

        default:
            return state;
    }
}

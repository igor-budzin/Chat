import {SEND_MESSAGE} from '../configs/actionConstans';

const initialState = {

}

export default function messageReducer(state = initialState, action) {
    switch(action.type) {
        case SEND_MESSAGE:
            return state;

        default:
            return state;
    }
}

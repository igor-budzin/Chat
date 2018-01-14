import {SEND_MESSAGE} from '../configs/actionConstans';

export function sendMessageAction(text) {
    return {
        type: SEND_MESSAGE,
        payload: text
    }
}

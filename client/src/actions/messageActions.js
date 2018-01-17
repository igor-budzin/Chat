import {
    HISTORY_MESSAGE_GET
} from '../configs/actionConstans';

export function getMessageHistory() {
    console.log("mess action");
    return {
        promise: (socket) => socket.emit('getMessageHistory'),
        type: HISTORY_MESSAGE_GET
    }
}

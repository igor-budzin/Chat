import {
    HISTORY_MESSAGE_GET
} from '../configs/actionConstans';

export function getMessageHistory() {
    return {
        promise: (socket) => socket.emit('getMessageHistory'),
        type: HISTORY_MESSAGE_GET
    }
}

import {
    SOCKET_CONNECTION_REQUEST,
    SOCKET_MESSAGE_EMMIT,
    SOCKET_MESSAGE_ON
} from '../configs/actionConstans';

export function socketConnectionRequest() {
    return {
        promise: (socket) => socket.connect(),
        type: 'socket',
        types: SOCKET_CONNECTION_REQUEST
    }
}

export function messageHistoryEmit() {
    console.log("messageHistoryEmit action");
    return {
        promise: (socket) => socket.emit('getMessageHistory', { }),
        type: SOCKET_MESSAGE_EMMIT
    }
}

export function messageHistoryOn() {
    console.log("messageHistoryOn action");
    return {
        promise: (socket) => socket.on('history', (data) => {console.log(data);}),
        type: SOCKET_MESSAGE_ON
    }
}

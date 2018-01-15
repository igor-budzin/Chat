import {
    SOCKET_CONNECTION_REQUEST,
    SOCKET_CONNECTION_SUCCESS,
    SOCKET_CONNECTION_ERROR
} from '../configs/actionConstans';

export function socketConnectionRequest() {
    return {
        promise: (socket) => socket.connect(),
        type: 'socket',
        types: SOCKET_CONNECTION_REQUEST
    }
}

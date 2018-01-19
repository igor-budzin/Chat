import {SOCKET_CONNECTION_REQUEST} from '../configs/actionConstans';

export function socketConnectionRequest() {
    return {
        promise: (socket) => socket.connect(),
        type: 'socket',
        types: SOCKET_CONNECTION_REQUEST
    }
}

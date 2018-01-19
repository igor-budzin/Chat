import {
    SOCKET_CONNECTION_REQUEST,
    SOCKET_CONNECTION_SUCCESS,
    SOCKET_CONNECTION_ERROR
} from '../configs/actionConstans';

export default function socketMiddleware(socket) {
    return ({dispatch, getState}) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState, socket);
        }
        /*
        * Socket middleware usage.
        * promise: (socket) => socket.emit('MESSAGE', 'hello world!')
        * type: always 'socket'
        * types: [SOCKET_CONNECTION_REQUEST, SOCKET_CONNECTION_SUCCESS, SOCKET_CONNECTION_ERROR]
        */
        const {promise, type, types, ...rest} = action;

        if (type !== 'socket' || !promise) {
            return next(action);
        }

        next({...rest, type: SOCKET_CONNECTION_REQUEST});

        return promise(socket)
            .then((result) => {
                return next({...rest, result, type: SOCKET_CONNECTION_SUCCESS});
            })
            .catch((error) => {
                return next({...rest, error, type: SOCKET_CONNECTION_ERROR});
            })
    };
 }

import {
    SOCKET_CONNECTION_REQUEST,
    SOCKET_CONNECTION_SUCCESS,
    SOCKET_CONNECTION_ERROR,
    HISTORY_MESSAGE_GET
} from '../configs/actionConstans';

export default function messageMiddleware() {
    return ({dispatch, getState}) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }

        if(action.type === SOCKET_CONNECTION_SUCCESS) {
            next({type: HISTORY_MESSAGE_GET});

            return promise(socket)
                .then((result) => {
                    return next({...rest, result, type: SOCKET_CONNECTION_SUCCESS});
                })
                .catch((error) => {
                    return next({...rest, error, type: SOCKET_CONNECTION_ERROR});
                })
        }
        else next(action);
    }
}

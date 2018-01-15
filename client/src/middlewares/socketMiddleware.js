 export default function socketMiddleware(socket) {
    return ({dispatch, getState}) => next => action => {
        if (typeof action === 'function') {
            console.log("1111111111");
            return action(dispatch, getState);
        }
        console.log("222222222");
        /*
        * Socket middleware usage.
        * promise: (socket) => socket.emit('MESSAGE', 'hello world!')
        * type: always 'socket'
        * types: [REQUEST, SUCCESS, FAILURE]
        */
        const { promise, type, types, ...rest } = action;

        if (type !== 'socket' || !promise) {
            return next(action);
        }

        const [REQUEST, SUCCESS, FAILURE] = types;
        next({...rest, type: REQUEST});

        return promise(socket)
            .then((result) => {
                return next({...rest, result, type: SUCCESS });
            })
            .catch((error) => {
                return next({...rest, error, type: FAILURE });
            })
    };
 }

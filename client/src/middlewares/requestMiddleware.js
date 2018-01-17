export default function clientMiddleware(socket) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      next({...rest, type: 'REQUEST'});

      /**
       * Fetch url and return the resulting action.
       * promise: (client) => client.get('url')
       * client: obj that contains the definition for get, post...
       */
      return promise(socket)
        .then(data => data.json())
        .then(json => (json.error
            ? next({...rest, error: json.error, type: FAILURE })
            : next({...rest, result: json, type: SUCCESS })
          )
        )
        .catch((error) => {
          console.error('MIDDLEWARE ERROR:', error);
          return next({...rest, error, type: FAILURE});
        });
    };
  };
}

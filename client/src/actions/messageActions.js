import {
    HISTORY_MESSAGE_GET
} from '../configs/actionConstans';

function messageHistory(data, dispatch) {
    return {
        type: HISTORY_MESSAGE_GET,
        payload: data
    }
}

export function getMessageHistory() {
    return (dispatch, getState, socket) => {
        socket.emit("getMessageHistory");
        socket.on("history", function(data) {
            dispatch(messageHistory(data));
        });
    }
}

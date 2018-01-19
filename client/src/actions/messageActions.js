import {
    HISTORY_MESSAGE_GET,
    NEW_MESSAGE_GET
} from '../configs/actionConstans';

function getHistoryMessage(data) {
    return {
        type: HISTORY_MESSAGE_GET,
        payload: data
    }
}

function getNewMessage(data) {
    return {
        type: NEW_MESSAGE_GET,
        payload: data
    }
}

export function getMessageHistory() {
    return (dispatch, getState, socket) => {
        socket.emit("getMessageHistory");
        socket.on("history", function(data) {
            dispatch(getHistoryMessage(data));
        });
    }
}

export function onNewMessage() {
    return (dispatch, getState, socket) => {
        socket.on("message", function(data) {
            dispatch(getNewMessage(data));
        });
    }
}

export function sendMessage() {
    return (dispatch, getState, socket) => {
        socket.emit("sendMessage", 'try send me');
    }
}

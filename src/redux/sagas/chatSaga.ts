import { takeEvery, put, delay } from "redux-saga/effects";
import { receiveMessage, sendMessage } from "../slices/chatSlice";

function* handleSendMessage(action: any) {
  const { chatId, message } = action.payload;

  
  yield delay(1000);

  yield put(
    receiveMessage({
      chatId,
      message: {
        id: Date.now().toString(),
        sender: "Bot",
        text: "Got your message!",
        timestamp: new Date().toISOString(),
      },
    })
  );
}

export function* chatSaga() {
  yield takeEvery(sendMessage.type, handleSendMessage);
}

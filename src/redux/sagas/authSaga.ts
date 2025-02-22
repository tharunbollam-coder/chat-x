import { takeLatest, put, call, all } from "redux-saga/effects";
import { 
  loginRequest, loginSuccess, loginFailure,
  registerRequest, registerSuccess, registerFailure 
} from "../slices/authSlice";
import { PayloadAction } from "@reduxjs/toolkit";

// Fake API functions to simulate real API calls
function fakeLoginAPI(email: string, password: string) {
  return new Promise<{ username: string; email: string }>((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        resolve({ username: "TestUser", email });
      } else {
        reject("Invalid email or password");
      }
    }, 1000);
  });
}

function fakeRegisterAPI(username: string, email: string, password: string) {
  return new Promise<{ username: string; email: string }>((resolve, reject) => {
    setTimeout(() => {
      // For simulation, assume registration always succeeds if password length is valid
      if (password.length >= 6) {
        resolve({ username, email });
      } else {
        reject("Registration failed due to invalid input");
      }
    }, 1000);
  });
}


// Saga for login
function* handleLogin(action: PayloadAction<{ email: string; password: string }>): Generator<any, void, any> {
  try {
    const user = yield call(fakeLoginAPI, action.payload.email, action.payload.password);
    yield put(loginSuccess(user));
  } catch (error: any) {
    yield put(loginFailure(error));
  }
}

// Saga for registration
function* handleRegister(action: PayloadAction<{ username: string; email: string; password: string }>): Generator<any, void, any> {
  try {
    const user = yield call(fakeRegisterAPI, action.payload.username, action.payload.email, action.payload.password);
    yield put(registerSuccess(user));
  } catch (error: any) {
    yield put(registerFailure(error));
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(loginRequest.type, handleLogin),
    takeLatest(registerRequest.type, handleRegister),
  ]);
}

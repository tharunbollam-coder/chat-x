import { call, put, takeLatest } from "redux-saga/effects";
import { loginSuccess, loginFailure, loginRequest, registerRequest, registerSuccess, registerFailure } from "../slices/authSlice";
import { PayloadAction } from "@reduxjs/toolkit";


function* loginSaga(action: PayloadAction<{ email: string; password: string }>) {
  try {
    
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      
      // Check if credentials match
      if (user.email === action.payload.email && user.password === action.payload.password) {
        yield put(loginSuccess(user)); // Dispatch success action
        localStorage.setItem("token", "fake-jwt-token"); // Store token
      } else {
        throw new Error("Invalid email or password");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error: any) {
    yield put(loginFailure(error.message)); 
  }
}


function* registerSaga(action: PayloadAction<{ username: string; email: string; password: string }>) {
  try {
    const user = {
      username: action.payload.username,
      email: action.payload.email,
      password: action.payload.password,
      token: "fake-register-token",
    };

    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", user.token);

    yield put(registerSuccess(user)); // Dispatch success action
  } catch (error) {
    yield put(registerFailure("Registration failed")); // Dispatch failure action
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
}

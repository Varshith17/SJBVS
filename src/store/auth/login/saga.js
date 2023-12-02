import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

//Include Both Helper File with needed methods
import {
  postFakeLogin,
  postJwtLogin,
} from "../../../helpers/fakebackend_helper"
import { post } from "../../../helpers/api_helper"

function* loginUser({ payload: { user, history } }) {
  try {
    const payload = {
      email: user.email,
      password: user.password,
      role: user.userType,
    }
    post("/login", payload)
      .then(res => {
        localStorage.setItem("authUser", JSON.stringify(res))
        localStorage.setItem("userType", "Admin")
        history.push("/dashboard")
      })
      .catch(err =>{
        alert("Incorrect Username/password");
        apiError(err)
      } 
       )
//   history.push("/dashboard")
  } catch (error) {
    yield apiError(error)
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga

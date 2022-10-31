import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Doctors from "./pages/Doctors";
import Appointments from './pages/Appointments';
import ApproveAppointments from './pages/ApproveAppointments';
import Form from './pages/Form';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userSignin } from "./redux/actions/UserActions";
import Messages from './pages/Messages';
import Bookappointment from './pages/Bookappointment';

function App() {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { User, loading } = useSelector((state) => state.User);
  // If our token expires after 7 days we logout that user
  axios.interceptors.response.use(
    function (response) {
      // any status code that lie within the range of 2XX cause this function
      // to trigger
      return response;
    },
    function (error) {
      // any status codes that falls outside the range of 2xx cause this function
      // to trigger
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then((data) => {
              console.log("/401 error > logout");
              dispatch({ type: "LOGOUT" });
              window.localStorage.removeItem("User");
              navigate("/Login");
            })
            .catch((err) => {
              console.log("AXIOS INTERCEPTORS ERR", err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );


  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get("/api/csrf-token");
      console.log("CSRF", data);
      axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);


  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route
          path="/login"
          element={
            <Login />
          }
        />
        <Route
          path="/SignUp"
          element={
            <SignUp />
          }
        />
        <Route
          path="/Appointments"
          element={
            <Appointments />
          }
        />

        <Route
          path="/ApproveAppointments"
          element={
            <ApproveAppointments />
          }
        />

        

        <Route
          path="/Form"
          element={
            <Form />
          }
        />

        <Route
          path="/Users"
          element={
            <Users />
          }
        />

        <Route
          path="/Doctors"
          element={
            <Doctors />
          }
        />

        <Route
          path="/messages"
          element={
            <Messages />
          }
        />

        <Route
          path="/bookappointment/:id"
          element={
            <Bookappointment />
          }
        />


      </Routes>
    </>
  );
}

export default App;

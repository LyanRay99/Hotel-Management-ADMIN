import React, { Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

//* Style
import "./scss/style.scss";
import "./scss/Other/other.scss";
import "./scss/Other/button.scss";

// import LoginAdmin from './views/pages/login/Login'
// import Register from './views/pages/register/Register'

//* Login *********************************************************************************
import { Login } from "./admin/Login";
import useToken from "./admin/useToken";
//****************************************************************************************/

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

//* Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const ForgetPassword = React.lazy(() => import('./admin/ForgetPassword'))
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

// function setToken(userToken) {
//   sessionStorage.setItem("token", JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem("token");
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }

function App() {
  //* Completed: Login
  // const { token, setToken } = useToken();

  // const token = getToken();
  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          {/*  <Route exact path="/register" name="Register Page" element={<Register />} /> */}
          {/* <Route exact path="/forgetPassword" name="Forget Password" element={<ForgetPassword />} /> */}
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;

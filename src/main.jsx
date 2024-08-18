import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import SignIn from "./SignIn/SignIn.jsx";
import ForgotPassword from "./SignIn/ForgotPassword.jsx";
import ResetPasswordLink from "./SignIn/ResetPasswordLink.jsx";
import User from "./pages/User.jsx";
import Settings from "./pages/Settings.jsx";
import ChangePassword from "./settings/ChangePassword.jsx";
import AdminList from "./settings/AdminList.jsx";
import CreateAdmin from "./settings/CreateAdmin.jsx";
import CreateUser from "./user/CreateUser.jsx";
import Overview from "./pages/Overview.jsx";
import CallCenter from "./pages/CallCenter.jsx";
import VideoCall from "./pages/VideoCall.jsx";
import UserDetail from "./pages/UserDetail.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import CalenderTwoSide from "./pages/CalenderTwoSide.jsx";
import BasicInfo from "./user/BasicInfo.jsx";
import HealthTracker from "./user/HealthTracker.jsx";
import HealthProfile from "./user/HealthProfile.jsx";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import Test from "./pages/Test.jsx";
import PrivateRoute from "./layout/PrivateRoute.jsx";
import PublicRoute from "./layout/PublicRoute.jsx";
import EditAdmin from "./settings/EditAdmin.jsx";
import EditUser from "./user/EditUser.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path="/signin"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        path="/ForgotPassword"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/ResetPasswordLink"
        element={
          <PublicRoute>
            <ResetPasswordLink />
          </PublicRoute>
        }
      />
      <Route
        path="/overview"
        element={
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        }
      />
      <Route
        path="/user"
        element={
          <PrivateRoute>
            <User />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/editUser/:userID"
        element={
          <PrivateRoute>
            <EditUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/callCenter"
        element={
          <PrivateRoute>
            <CallCenter />
          </PrivateRoute>
        }
      />
      <Route
        path="/videoCall"
        element={
          <PrivateRoute>
            <VideoCall />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings/changePassword"
        element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings/adminList"
        element={
          <PrivateRoute>
            <AdminList />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings/adminList/createAdmin"
        element={
          <PrivateRoute>
            <CreateAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings/adminList/editAdmin/:adminID"
        element={
          <PrivateRoute>
            <EditAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/createUser"
        element={
          <PrivateRoute>
            <CreateUser />
          </PrivateRoute>
        }
      />

      <Route
        path="/user/:userID"
        element={
          <PrivateRoute>
            <UserDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/calender"
        element={
          <PrivateRoute>
            <CalenderTwoSide />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/basicInfo/:userID"
        element={
          <PrivateRoute>
            <BasicInfo />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/healthTracker"
        element={
          <PrivateRoute>
            <HealthTracker />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/healthProfile"
        element={
          <PrivateRoute>
            <HealthProfile />
          </PrivateRoute>
        }
      />
      <Route path="/test" element={<Test />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </UserContextProvider>
);

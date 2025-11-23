import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Protected from "../components/Protected";

import CreateFood from "../pages/food-partner/CreateFood";
import Home from "../pages/Home";
import Profile from "../pages/food-partner/Profile";
import SavePage from "../pages/Saved Section/SavePage";
import UserRegister from "../pages/Login-Register/UserRegister";
import UserLogin from "../pages/Login-Register/UserLogin";
import FoodPartnerRegister from "../pages/Login-Register/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/Login-Register/FoodPartnerLogin";
import SingleSavedReelPage from "../pages/Saved Section/SingleReelPage";

function AppRoutes({ loggedIn }) {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <Protected loggedIn={loggedIn}>
            <Home />
          </Protected>
        }
      />

      <Route
        path="/saved"
        element={
          <Protected loggedIn={loggedIn}>
            <SavePage />
          </Protected>
        }
      />

      <Route
        path="/save/:id"
        element={
          <Protected loggedIn={loggedIn}>
            <SingleSavedReelPage />
          </Protected>
        }
      />

      <Route
        path="/create-food"
        element={
          <Protected loggedIn={loggedIn}>
            <CreateFood />
          </Protected>
        }
      />

      <Route
        path="/food-partner/:id"
        element={
          <Protected loggedIn={loggedIn}>
            <Profile />
          </Protected>
        }
      />

      {/* Public Routes */}
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
      <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
    </Routes>
  );
}

export default AppRoutes;

import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Links() {
  return (
    <Routes>
                <Route
          path="/login"
          element={
            <UnauthenticatedRoute>
              <Login />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <UnauthenticatedRoute>
              <Signup />
            </UnauthenticatedRoute>
          }
        />
        <Route
          path="/notes/new"
          element={
            <AuthenticatedRoute>
              <NewNote />
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/notes/:id"
          element={
            <AuthenticatedRoute>
              <Notes />
            </AuthenticatedRoute>
          }
        />
        <Route path="/" element={<Home />} />
      {

  }
  <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

const ProtectedLayout = () => {
  const { session, loading } = useSelector((state) => state.session);
  if (loading) {
    //MUY IMPORTANTE PORQUE SI AUN NO ESTA LISTO SE REDIGIRA INDEFINIDAMENTE
    return (
      <>
        <Loading />
      </>
    );
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default ProtectedLayout;

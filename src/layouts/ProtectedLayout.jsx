import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useSession from "../hooks/useSession";

const ProtectedLayout = () => {
  const { session, loading } = useSession();
  if (loading) {
    //MUY IMPORTANTE PORQUE SI AUN NO ESTA LISTO SE REDIGIRA INDEFINIDAMENTE
    return <div>Cargando...</div>;
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

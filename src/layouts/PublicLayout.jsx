import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useSession from "../hooks/useSession";

const PublicLayout = () => {
  const { session, loading } = useSession();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (session) {
    return <Navigate to="/app/series" replace />;
  }

  return (
    <>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default PublicLayout;

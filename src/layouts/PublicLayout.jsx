import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useSession from "../hooks/useSession";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

const PublicLayout = () => {
  const { session, loading } = useSelector((state) => state.session);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
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

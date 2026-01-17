import { Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  const { logout } = useAuth();

  return (
    <>
      <Header onLogout={logout} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;

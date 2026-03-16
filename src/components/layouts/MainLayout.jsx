
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const MainLayout = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Header onLogout={() => dispatch(logout())} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;

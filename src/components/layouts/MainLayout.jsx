import { Outlet } from "react-router";
import useMyListStore from "../../store/myListStore";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import useAuthStore from "../../store/authStore";

const MainLayout = () => {
  const { logout, isAuthenticated } = useAuthStore();
  const { fetchMyList } = useMyListStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyList();
    }
  }, [isAuthenticated, fetchMyList]);

  return (
    <>
      <Header onLogout={logout} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;

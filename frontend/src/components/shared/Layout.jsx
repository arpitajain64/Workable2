import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // ✅ Fix import path

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This renders nested route components */}
    </>
  );
};

export default Layout;

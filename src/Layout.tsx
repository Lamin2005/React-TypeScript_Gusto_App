import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Layout() {
  return (
    <main className="max-w-5xl mx-auto ">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default Layout;

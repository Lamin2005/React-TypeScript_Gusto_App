import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className=" w-full flex justify-between items-center p-3 border-b mt-3">
      <h1 className="text-3xl font-bold">Gusto</h1>
      <div className="text-gray-500 gap-4 cursor-pointer font-bold">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "text-black" : undefined)}
        >
          {" "}
          Recipes{" "}
        </NavLink>
        <NavLink
          to={"/about"}
          className={({ isActive }) => (isActive ? "text-black" : undefined)}
        >
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setSearchTerm } from "./features/searchSlice";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const searchTerm = useSelector((state) => state.search.term);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("slide_user");
    navigate("/");
    alert("Logout Successful");
  };

  const users = JSON.parse(localStorage.getItem("slide_user"));

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  useEffect(() => {
    if (users) {
      console.log("User is authenticated:", users.data.email);
    } else {
      console.log("User is not authenticated");
    }
  }, [users]);

  // Always show Home
  const navItems = [{ path: "/", label: "Home" }];

  // Add more items only if user exists
  if (users) {
    navItems.push(
      { path: "/create", label: "Create" },
      { path: "/view", label: "View" },
      { path: "/update", label: "Update" },
      { path: "/add", label: "Search friend" }
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="bg-purple-950 text-white flex items-center justify-between px-6 py-3">
        {/* Desktop Nav */}
        <div className=" w-[50%]">
          <div className="hidden md:flex text-sm gap-5 lg:gap-10  lg:text-lg font-bold  justify-center ">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative group h-11 flex items-center ${isActive ? "text-amber-400" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-amber-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right: Search + Auth */}
        <div className="hidden md:flex items-center gap-4 w-[50%]  justify-end">
          {users && (
            <>
              <input
                type="text"
                value={searchTerm}
                className="w-[60%] bg-purple-400 text-sm outline-0 rounded-2xl px-3 py-1 h-9 placeholder-white"
                placeholder="Search by name"
                onChange={handleSearch}
              />
              {/* <button className="bg-violet-600 p-2 rounded-2xl" onClick={handleSearch}>Search</button> */}
            </>
          )}

          {users ? (
            <>
              <button className="bg-orange-400 hover:bg-orange-500 text-sm lg:text-base font-bold px-4 h-9 rounded-2xl cursor-pointer flex items-center">
                {users.data.name}
              </button>
              <button
                className="text-sm md:text-base bg-rose-500 px-4 h-9 rounded-2xl cursor-pointer font-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/reg">Register</NavLink>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-purple-800 text-white px-6 py-4 space-y-4">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="block font-bold"
            >
              {label}
            </NavLink>
          ))}

          {users && (
            <input
              className="w-full bg-purple-400 text-sm outline-0 rounded-2xl px-3 py-1 h-9 placeholder-white"
              placeholder="Search by name 🔍"
              value={searchTerm}
              onChange={handleSearch}
            />
          )}

          {users ? (
            <div className="space-y-2">
              <button className="w-full bg-orange-400 py-2 rounded-xl font-bold">
                {users.data.name}
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-rose-500 py-2 rounded-xl font-bold"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <NavLink to="/login" className="block">
                Login
              </NavLink>
              <NavLink to="/reg" className="block">
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

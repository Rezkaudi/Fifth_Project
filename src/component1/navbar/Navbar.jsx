import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Link as SLink } from "react-scroll";
import Logo from "../../assets/images/logo.png"

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const handleActive = () => {
    setIsActive((pre) => !pre);
  };

  const routes = [
    { id: "01", isRoute: true, name: "Home", path: "/" },
    { id: "02", isRoute: true, name: "Documentation", path: "/doc" },
    { id: "03", isRoute: false, name: "Service", path: "service" },
    { id: "04", isRoute: false, name: "Contact", path: "contact" },
  ];

  return (
    <div className="sticky top-0 z-40 w-full h-10">
      <nav className="flex items-center justify-between flex-wrap bg-ice lg:px-40 shadow-xl absolute w-full px-6 ">
        <div className="flex items-center flex-no-shrink text-blue1 mr-6 py-2">
          <img className="w-20" src={Logo} alt="logo" />
        </div>
        <div onClick={handleActive} className="lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
            <svg
              className="h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          id="ul"
          className={`${
            isActive ? "w-full" : "hidden lg:block"
          }  flex-grow lg:flex lg:items-center lg:w-auto `}
        >
          <div className="flex md:items-center justify-between w-auto flex-col md:flex-row ">
            <div className="text-sm lg:flex-grow">
              <ul className="lg:flex justify-center bg-ice ">
                {routes.map((route) => (
                  <li
                    key={route.id}
                    className="mr-5 ml-5 text-item py-6 cursor-pointer hvr-underline-from-center"
                  >
                    {route.isRoute ? (
                      <Link to={route.path}>{route.name}</Link>
                    ) : (
                      <SLink to={route.path}>{route.name}</SLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="inline-block my-5 sm:my-0">
              <p className="flex px-7 py-1.5 rounded text-sm font-semibold leading-6 text-white shadow-sm gradiantBg">
                <Link to="/signin">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

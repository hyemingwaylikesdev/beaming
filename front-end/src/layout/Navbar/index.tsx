import { useState } from "react";
import { Link } from "react-router-dom";

import NavItem from "./sections/NavItem";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <section className="relative z-10 text-purple-500 bg-white border-b-2 border-gray-100">
      <div className="w-full">
        <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-20">
          {/* logo */}
          <div className="flex items-center text-2xl h-14 ">
            <Link to="/">Logo</Link>
          </div>

          {/* menu button */}
          <div className="text-2xl sm:hidden">
            <button onClick={handleMenu}>{menu ? "-" : "+"}</button>
          </div>

          {/* big screen nav-items */}
          <div className="hidden sm:block">
            <NavItem />
          </div>
        </div>

        {/* mobile nav-items */}
        <div className="block sm:hidden">{menu && <NavItem />}</div>
      </div>
    </section>
  );
};

export default Navbar;

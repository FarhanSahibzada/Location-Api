import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, Menu_icon, MenuItem, } from "../ui/navbar-menu";
import { cn } from "../../lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Menu as Menuitem } from 'lucide-react'


function Navber() {
  const [active, setActive] = useState<string | null>('Home');
  

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl  mx-auto z-50")}
    >
      <Menu setActive={setActive} >
        <MenuItem setActive={setActive} active={active} item={"Home"} >
          <div className="flex flex-col space-y-4 text-sm">
              <Link to={'/'}>
                <HoveredLink >Home</HoveredLink>
              </Link>
            <HoveredLink href="#about">About Us</HoveredLink>
            <HoveredLink href="#card_section">Available Apis</HoveredLink>
            <HoveredLink href="#get_in_touch">Get Us Touch</HoveredLink>
          </div>
        </MenuItem>

        <Link to={'/pricing-page'}>
          <MenuItem setActive={setActive} active={active} item={"Pricing"} >
          </MenuItem>
        </Link>
        <Link to={'/profile'}>
          <MenuItem setActive={setActive} active={active} item={"Profile"} >
          </MenuItem>
        </Link>

        <Menu_icon setActive={setActive} active={active} item={<Menuitem></Menuitem>} name="Hamburger">
          <div className="flex flex-col space-y-2">
            <Link to={'/sign-up'}>  <HoveredLink>Sign Up</HoveredLink></Link>
            <Link to={'/Login'}><HoveredLink>Login</HoveredLink> </Link>
          </div>
        </Menu_icon>
      </Menu>

    </div>
  );
}

export default Navber;

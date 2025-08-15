import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, Menu_icon, MenuItem, } from "../ui/navbar-menu";
import { cn } from "../../lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Menu as Menuitem } from 'lucide-react'
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";


function Navber() {
  const [active, setActive] = useState<string | null>('');
  const user_login = useSelector((state: RootState) => state.auth.status)

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl  mx-auto z-50")}
    >
      <Menu setActive={setActive} >
        <MenuItem setActive={setActive} active={active} item={"Home"} >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to={'/'}>Home</HoveredLink>
            <HoveredLink to="#about">About Us</HoveredLink>
            <HoveredLink to="#card_section">Available Apis</HoveredLink>
            <HoveredLink to="#get_in_touch">Get Us Touch</HoveredLink>
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

        {!user_login ? (
          <div className="block xl:hidden">
            <Menu_icon setActive={setActive} active={active} item={<Menuitem></Menuitem>} name="Hamburger">
              <div className="flex flex-col space-y-2">
                <HoveredLink to={'/sign-up'}>Sign Up</HoveredLink>
                <HoveredLink to={'/Login'}>Login</HoveredLink>
              </div>
            </Menu_icon>
          </div>
        ) : null}
      </Menu>

    </div>
  );
}

export default Navber;

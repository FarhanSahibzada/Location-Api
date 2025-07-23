import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, } from "../ui/navbar-menu";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";


function Navber() {
  const [active, setActive] = useState<string | null>('Home');

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl  mx-auto z-50")}
    >
      <Menu setActive={setActive} >  
      
          <MenuItem setActive={setActive} active={active} item={"Home"} >
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/about">About Us</HoveredLink>
              <HoveredLink href="/card_section">Available Apis</HoveredLink>
              <HoveredLink href="/get_in_touch">Get Us Touch</HoveredLink>
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
      </Menu>

    </div>
  );
}

export default Navber;

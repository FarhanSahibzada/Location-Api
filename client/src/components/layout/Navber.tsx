import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem,} from "../ui/navbar-menu";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";


function Navber( ) {
  const [active, setActive] = useState<string  | null>('Home');

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl  mx-auto z-50")}
    >
      <Menu setActive={setActive} >
        <Link to={'/'}>
          <MenuItem setActive={setActive} active={active} item={"Home"} >
          </MenuItem>
        </Link>
          <MenuItem setActive={setActive} active={active} item={"Courses"} >
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/Courses">All Courses</HoveredLink>
            <HoveredLink href="/Courses">Basic Music Theory</HoveredLink>
            <HoveredLink href="/Courses">Advanced Compostion</HoveredLink>
        <HoveredLink href="/Courses">SongWriting</HoveredLink>
            <HoveredLink href="/Courses">Music Production</HoveredLink>
          </div>
          </MenuItem>
        <Link to={'/'}>
          <MenuItem setActive={setActive} active={active} item={"Contact US"} >
          </MenuItem>
        </Link>
      </Menu>

    </div>
  );
}

export default Navber;

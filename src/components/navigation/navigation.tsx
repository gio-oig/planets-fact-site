import planets from "../../../data.json";
import { Link } from "react-router-dom";
import hamburgerIcon from "../../assets/icon-hamburger.svg";
import chevronIcon from "../../assets/icon-chevron.svg";

import { getPlanetColor, PlanetNames } from "../../helper/functions";
import HoverLine from "../hoverLine/hoverLine";

type NavigationProps = {
  isNobileNavShown: boolean;
  toggleMobileNav: () => void;
};

const Navigation = ({ isNobileNavShown, toggleMobileNav }: NavigationProps) => {
  return (
    <div className="flex flex-col justify-between border-b border-white/10 px-6  text-white sm:items-center sm:px-8 md:flex-row">
      <div className="flex items-center justify-between py-4">
        <h2 className="font-antonio text-[28px] leading-9">THE PLANETS</h2>
        <picture className="cursor-pointer sm:hidden" onClick={toggleMobileNav}>
          <img
            src={hamburgerIcon}
            alt=""
            className={`${isNobileNavShown ? "opacity-60" : ""}`}
          />
        </picture>
      </div>
      <ul className="flex gap-x-[33px] max-[660px]:hidden">
        {planets.map((planet) => (
          <li
            className="group relative flex h-20 items-center font-spartan uppercase"
            key={planet.name}
          >
            <HoverLine
              className={`top-0 ${getPlanetColor(planet.name as PlanetNames)}`}
            />
            <Link to={`/${planet.name}`}>{planet.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;

type MobileNavListProsp = {
  hideNavbar: () => void;
};

export const MobileNavList = ({ hideNavbar }: MobileNavListProsp) => (
  <ul className="mt-6 cursor-pointer px-5 min-[660px]:hidden">
    {planets.map((planet) => (
      <Link to={`/${planet.name}`}>
        <li
          className="flex items-center border-b border-white/10 py-5 font-spartan text-[15px] font-bold uppercase tracking-[1.35px] text-white"
          key={planet.name}
          onClick={hideNavbar}
        >
          <div
            className={`mr-6 aspect-square w-5 rounded-full ${getPlanetColor(
              planet.name as PlanetNames
            )}`}
          />
          {planet.name}
          <img src={chevronIcon} alt="" className="ml-auto" />
        </li>
      </Link>
    ))}
  </ul>
);

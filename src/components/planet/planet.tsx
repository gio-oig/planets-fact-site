import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import c from "classnames";

import HoverLine from "../hoverLine/hoverLine";
import { getPlanetColor, PlanetNames } from "../../helper/functions";

import planets from "../../../data.json";
import sourceIcon from "../../assets/icon-source.svg";

type IPlanet = typeof planets[0];
type PlanetStates = keyof Pick<IPlanet, "overview" | "geology" | "structure">;

const PLANET_STATE = "overview";

const Planet = () => {
  let { planetName } = useParams<{ planetName: PlanetNames }>();
  const [selectedPlanet, setSelectedPlanet] = useState<IPlanet>();
  const [planetState, setPlanetState] = useState<PlanetStates>(PLANET_STATE);

  const isSelectedState = (state: PlanetStates) => {
    return planetState === state;
  };

  useEffect(() => {
    if (planetName) {
      const foundPlanet = planets.find(({ name }) => name === planetName);
      setSelectedPlanet(foundPlanet);
    } else {
      setSelectedPlanet(planets[0]);
    }
  }, [planetName]);

  if (!selectedPlanet) return <></>;

  const bgColor = getPlanetColor(selectedPlanet.name as PlanetNames);

  return (
    <>
      <MobilePlanetsState
        setNewPlanetState={setPlanetState}
        isSelected={isSelectedState}
        states={["overview", "geology", "structure"]}
        bgColor={bgColor}
      />
      <section className="mt-[39px] px-[39px] lg:mt-[125px] lg:px-[165px]">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-1 items-center justify-center">
            <picture className="relative">
              <img
                className="max-h-[224px] max-w-[224px] sm:max-h-[253px] sm:max-w-[253px] md:max-h-[369px] md:max-w-[369px] lg:max-h-[582px] lg:max-w-[582px]"
                src={
                  planetState === "overview"
                    ? selectedPlanet.images.planet
                    : selectedPlanet.images.internal
                }
                alt="planet"
              />
              {planetState === "geology" && (
                <img
                  className="absolute left-2/4 bottom-0 max-h-[109px] max-w-[83px] -translate-x-1/2  lg:max-h-[199px] lg:max-w-[163px]"
                  src={window.location.origin + selectedPlanet.images.geology}
                  alt="planet"
                />
              )}
            </picture>
          </div>
          <div className="flex justify-between text-white lg:flex-col">
            <div className="m-auto max-w-[339px] text-center sm:m-0 sm:text-left lg:w-full lg:max-w-[350px]">
              <h3 className="font-antonio text-[48px] uppercase leading-[103px] lg:text-[80px]">
                {selectedPlanet.name}
              </h3>
              <p className="mb-6 font-spartan text-sm leading-6">
                {selectedPlanet[planetState].content}
              </p>
              <p className="mb-[28px] flex justify-center gap-2 font-spartan opacity-50 sm:justify-start lg:mb-[39px]">
                Source:
                <a
                  href={selectedPlanet[planetState].source}
                  target="_blank"
                  className="underline"
                >
                  Wikipedia <img src={sourceIcon} className="ml-2 inline" />
                </a>
              </p>
            </div>
            <div className="hidden w-full max-w-[281px] sm:flex sm:items-center lg:max-w-[350px]">
              <ul className="grid w-full gap-4">
                <PlanetStateButton
                  index={1}
                  value="overview"
                  bgColor={bgColor}
                  isSelected={isSelectedState("overview")}
                  onClick={() => setPlanetState("overview")}
                />
                <PlanetStateButton
                  index={2}
                  bgColor={bgColor}
                  value="internal structure"
                  isSelected={isSelectedState("structure")}
                  onClick={() => setPlanetState("structure")}
                />
                <PlanetStateButton
                  index={3}
                  bgColor={bgColor}
                  value="surface geology"
                  isSelected={isSelectedState("geology")}
                  onClick={() => setPlanetState("geology")}
                />
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-x-[11px] gap-y-2 sm:flex-row lg:mt-[87px] lg:gap-x-[30px]">
          <PlanetData title="rotation" value={selectedPlanet.rotation} />
          <PlanetData title="revolution" value={selectedPlanet.revolution} />
          <PlanetData title="radius" value={selectedPlanet.radius} />
          <PlanetData title="temperature" value={selectedPlanet.temperature} />
        </div>
      </section>
    </>
  );
};

export default Planet;

type PlanetStateButtonProps = {
  isSelected?: boolean;
  onClick: () => void;
  value: string;
  index: number;
  bgColor: string;
};

const PlanetStateButton = ({
  index,
  isSelected,
  value,
  bgColor,
  onClick,
}: PlanetStateButtonProps) => (
  <li
    className={`flex cursor-pointer gap-x-7 border border-white/20 py-3 px-7 hover:bg-[#d8d8d833] ${
      isSelected ? bgColor : ""
    } `}
    onClick={onClick}
  >
    <span className="">0{index}</span>
    <p>{value}</p>
  </li>
);

type PlanetDataProps = {
  title: string;
  value: string;
};

const PlanetData = ({ title, value }: PlanetDataProps) => (
  <div className="flex flex-1 items-center justify-between border border-white/20 py-2 px-[15px] sm:flex-col sm:items-stretch md:py-5 lg:px-[23px]">
    <h4 className="font-spartan text-[11px] font-bold leading-6 tracking-[1px] text-white/50">
      {title}
    </h4>
    <span className="font-antonio text-xl leading-8 tracking-[-1.5px] text-white md:text-2xl lg:text-[40px] lg:leading-[51px]">
      {value}
    </span>
  </div>
);

type MobilePlanetsStateProps = {
  isSelected: (state: PlanetStates) => boolean;
  states: PlanetStates[];
  bgColor: string;
  setNewPlanetState: (newState: PlanetStates) => void;
};

const MobilePlanetsState = ({
  isSelected,
  states,
  bgColor,
  setNewPlanetState,
}: MobilePlanetsStateProps) => (
  <ul className="flex justify-between border-b border-white/10 px-6  min-[660px]:hidden">
    {states.map((state) => (
      <MobilePlanetStateItem
        key={state}
        text={state}
        bgColor={bgColor}
        isSelected={isSelected(state)}
        onClick={() => setNewPlanetState(state)}
      />
    ))}
  </ul>
);

type MobilePlanetStateItemPros = {
  isSelected: boolean;
  bgColor: string;
  text: string;
  onClick: () => void;
};

const MobilePlanetStateItem = ({
  isSelected,
  bgColor,
  text,
  onClick,
}: MobilePlanetStateItemPros) => {
  const hoverLineC = c(`bottom-0 ${bgColor}`, {
    "h-1": isSelected,
  });

  return (
    <li className="relative cursor-pointer py-5" onClick={onClick}>
      <HoverLine className={hoverLineC} />
      <p className="text-[9px] font-bold uppercase tracking-[2px] text-white">
        {text}
      </p>
    </li>
  );
};

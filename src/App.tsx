import Navigation, { MobileNavList } from "./components/navigation/navigation";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Planet from "./components/planet/planet";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:planetName" element={<Home />} />
    </Routes>
  );
}

const Home = () => {
  const [isMobileNavShown, setIsMobileNavShown] = useState(false);

  return (
    <div className="min-h-screen bg-black bg-[url('./assets/background-stars.svg')]">
      <div className="m-auto max-w-[1440px]">
        <Navigation
          isNobileNavShown={isMobileNavShown}
          toggleMobileNav={() => setIsMobileNavShown((navState) => !navState)}
        />
        {isMobileNavShown ? (
          <MobileNavList hideNavbar={() => setIsMobileNavShown(false)} />
        ) : (
          <Planet />
        )}
      </div>
    </div>
  );
};

export default App;

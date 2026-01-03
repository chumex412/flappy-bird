import { useState } from "react";

import GameContainer from "@/module/game/components/GameContainer";
import SplashWrapper from "@/module/splash/components/SplashWrapper";

const App = () => {
  const [isGameOn, setIsGameOn] = useState(false);

  const startGame = () => {
    setIsGameOn(true);
  };

  return (
    <>
      {isGameOn ? <GameContainer /> : <SplashWrapper onStartGame={startGame} />}
    </>
  );
};

export default App;

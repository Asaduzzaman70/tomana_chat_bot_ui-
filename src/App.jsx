import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="relative text-[70px] font-extrabold text-image-fill">
        Asaduzzaman
      </div>
      <Button>Click me</Button>
    </>
  );
}

export default App;

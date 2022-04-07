import { useState } from "react";
import "./App.css";
import Mint from "./components/MainPageMint";
import Nav from "./components/MainPageNav";
import logo from "./media/logoLT.png";

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="overlay">
      <div className="App">
        <Nav accounts={accounts} setAccounts={setAccounts} />
        <div className="image-cont">
          <img src={logo} alt="Logo" width="525" height="210"></img>
        </div>
        <Mint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className="moving-background"></div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import ButtonWithLoading from "./ButtonWithLoading";

import "./App.css";

function App() {
  const [children, setChildren] = useState("");

  const action = () =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        if (Math.random() > 0.5) {
          resolve("success");
        } else {
          reject("error");
        }
      }, 2000);
    })  .then(data => setChildren(data))
        .catch(err => setChildren(err));

  const onClick = () => {
    setChildren("loading...");
    action();
  };

  return (
    <div className="App">
      <ButtonWithLoading
        onClick={onClick}
        children={children}
        action={action}
      />
    </div>
  );
}

export default App;

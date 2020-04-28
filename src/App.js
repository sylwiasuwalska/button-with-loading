import React, { useState } from "react";
import ButtonWithLoading from "./ButtonWithLoading";

import "./App.css";

export const action = () =>
    new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            clearTimeout(timer);
            if (Math.random() > 0.5) {
                resolve("success");
            } else {
                reject("error");
            }
        }, 2000);
    });

function App() {
  const [children, setChildren] = useState("");

  const onClick = () => {
    setChildren("loading...");
    action()
      .then((data) => setChildren(data))
      .catch((err) => setChildren(err));
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


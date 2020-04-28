import React, {useEffect, useState} from "react";
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

  return (
    <div className="App">
      <ButtonWithLoading
        onClick={(data)=>{}}
        action={action}
      />
    </div>
  );
}

export default App;


import React, { useState, useEffect } from "react";

const ButtonWithLoading = ({ children, action }) => {
  const [buttonText, setButtonText] = useState("");

  return (
    <button
      onClick={() => {
        setButtonText("loading...");
        return action()
          .then((data) => setButtonText(data))
          .catch((err) => setButtonText(err));
      }}
      disabled={buttonText == "loading..."}
    >
      {buttonText} {children ? children : "don't push my buttons"}
    </button>
  );
};
export default ButtonWithLoading;

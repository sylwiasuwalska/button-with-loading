import React, { useState } from "react";

const ButtonWithLoading = ({ children, action }) => {
  const [actionPhase, setActionPhase] = useState("waitingForAction");

  const useActionOnClick = () => {
    setActionPhase("clicked");
    setActionPhase("loading");
    action()
      .then((data) => setActionPhase(data))
      .catch((err) => setActionPhase(err));
  };

  return (
    <button onClick={useActionOnClick} disabled={actionPhase === "loading"}>
      {actionPhase === "waitingForAction" ? "" : actionPhase}{" "}
      {children ? children : "don't push my buttons"}
    </button>
  );
};
export default ButtonWithLoading;

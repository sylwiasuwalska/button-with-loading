import React, { useState } from "react";

const ButtonWithLoading = ({ onClick, children, action }) => {
  const [actionPhase, setActionPhase] = useState("waitingForAction");

  const useActionOnClick = () => {
    setActionPhase("loading");
    action()
      .then((data) => {
        setActionPhase(data);
        onClick(data);
      })
      .catch((err) => {
        setActionPhase(err);
        onClick(err);
      });
  };

  return (
    <button onClick={useActionOnClick} disabled={actionPhase === "loading"}>
      {actionPhase === "waitingForAction" ? "" : actionPhase}{" "}
      {children ? children : "don't push my buttons"}
    </button>
  );
};
export default ButtonWithLoading;

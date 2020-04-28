import React, { useState, useEffect, useCallback } from "react";

const ButtonWithLoading = ({ children, action }) => {
  const [actionPhase, setActionPhase] = useState("waitingForAction");

  const useActionOnClick = useCallback(() => {
    setActionPhase("clicked");
    setActionPhase("loading");
    action()
      .then((data) => setActionPhase(data))
      .catch((err) => setActionPhase(err));
  }, []);

  if (actionPhase === "waitingForAction") {
    return (
      <button onClick={useActionOnClick}>
        {children ? children : "don't push my buttons"}
      </button>
    );
  } else {
    return (
      <button onClick={useActionOnClick} disabled={actionPhase==="loading"}>
        {actionPhase} {children ? children : "don't push my buttons"}
      </button>
    );
  }
};
export default ButtonWithLoading;

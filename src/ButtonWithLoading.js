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
 if (actionPhase === "waitingForAction") {
   return (
       <button onClick={useActionOnClick} >
         {children ? children : "don't push my buttons"}
       </button>
   );
 } else {
   return (
       <button onClick={useActionOnClick} disabled={actionPhase==="loading"} >
         {actionPhase}
       </button>
   );
 }
};
export default ButtonWithLoading;

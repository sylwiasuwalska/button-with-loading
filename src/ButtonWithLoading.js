import React, { useState, useEffect } from "react";


const ButtonWithLoading = ({ onClick, children, action }) => {
    return <button onClick={() => onClick()} disabled={children=="loading..."}>{children ? children : "don't push my buttons"} </button>;
};
export default ButtonWithLoading;



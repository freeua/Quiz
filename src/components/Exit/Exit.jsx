import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../buttons/Button";

export const Exit = () => {
  const history = useHistory();

  const handleExit = () => () => {
    history.push("/");
  };

  return <Button text="exit" onClick={handleExit()} />;
};

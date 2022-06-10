import { AuthContext } from "../context/AuthContext.js";
import { useContext } from "react";

export const useAuthContext = function () {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error(
      "useAuthContext must be used inside an AuthContextProvider"
    );

  return context;
};

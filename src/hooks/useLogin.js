import { useState } from "react";
import { useAuthContext } from "./useAuthContext.js";
import { projectAuth } from "../firebase/config.js";

export const useLogin = function () {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async function (email, password) {
    try {
      setError(null);
      setIsPending(true);

      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      dispatch({ type: "LOGIN", payload: res.user });
      setError(null);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, login };
};

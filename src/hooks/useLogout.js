import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config.js";
import { useAuthContext } from "./useAuthContext.js";

export const useLogout = function () {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);

  const logout = async function () {
    try {
      setError(null);
      setIsPending(false);

      // Sign out user
      await projectAuth.signOut();

      // dispatch logout
      dispatch({ type: "LOGOUT" });

      if (isCancelled) return;

      setIsPending(false);
      setError(null);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, logout };
};

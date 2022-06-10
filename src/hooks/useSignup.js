import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config.js";
import { useAuthContext } from "./useAuthContext.js";

export const useSignup = function () {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async function (email, password, displayName) {
    try {
      setError(null);
      setIsPending(true);

      // sign up
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!res) throw new Error("Cannot create user...");

      // add display name to user
      await res.user.updateProfile({ displayName });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (isCancelled) return;

      setError(null);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};

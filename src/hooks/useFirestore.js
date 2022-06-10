import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config.js";

const initialState = {
  document: null,
  error: null,
  isPending: false,
  success: null,
};

const firestoreReducer = function (state, action) {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, error: null, isPending: true, success: false };
    case "ADDED_DOCUMENT":
      return {
        document: action.payload,
        error: null,
        isPending: false,
        success: true,
      };
    case "DELETE_DOCUMENT":
      return {
        document: null,
        error: null,
        isPending: false,
        success: true,
      };
    case "ERROR":
      return {
        document: null,
        error: action.payload,
        isPending: false,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = function (collection) {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const dispatchIfNotCancelled = function (action) {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // Collection ref
  const ref = projectFirestore.collection(collection);

  // Add document
  const addDocument = async function (doc) {
    try {
      dispatch({ type: "IS_PENDING" });

      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });

      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // Delete document
  const deleteDocument = async function (id) {
    try {
      dispatch({ type: "IS_PENDING" });

      // Delete document
      await ref.doc(id).delete();

      dispatchIfNotCancelled({
        type: "DELETE_DOCUMENT",
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "Could not delete..." });
    }
  };

  useEffect(() => {
    setIsCancelled(false); // needed in strict mode
    return () => setIsCancelled(true);
  }, []);

  return { response, addDocument, deleteDocument };
};

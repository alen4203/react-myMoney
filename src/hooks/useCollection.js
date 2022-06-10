import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config.js";

export const useCollection = function (collection, _query, _orderBy) {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // If we don't use a ref -> infinite loop in useEffect
  // _query is an array and it's different on every function call.
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);
    if (query) ref = ref.where(...query);
    if (orderBy) ref = ref.orderBy(...orderBy);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) =>
          results.push({ ...doc.data(), id: doc.id })
        );

        // update state
        setDocuments(results);
        setError(null);
      },
      (err) => {
        console.log(err.message);
        setError("Cannot fetch data");
      }
    );

    // unsubscribe on unmount
    return () => unsub();
  }, [collection, query, orderBy]);

  return { documents, error };
};

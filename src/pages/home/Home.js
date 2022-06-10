import { useAuthContext } from "../../hooks/useAuthContext.js";
import { useCollection } from "../../hooks/useCollection.js";

// styles
import styles from "./Home.module.css";

// components
import TransactionFrom from "./TransactionForm.js";
import TransactionList from "./TransactionList.js";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionFrom uid={user.uid} />
      </div>
    </div>
  );
}

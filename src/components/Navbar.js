import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout.js";
import { useAuthContext } from "../hooks/useAuthContext.js";

// Styles
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>myMoneyApp</li>

        {!user && (
          <>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
              <Link to="signup">SignUp</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>Hello, {user.displayName}</li>
            <li>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

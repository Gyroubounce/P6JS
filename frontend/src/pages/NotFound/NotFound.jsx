import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import styles from "./NotFound.module.css";
import "../../index.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main}>
        <h1>404</h1>
        <p>La page que vous cherchez n'existe pas.</p>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;

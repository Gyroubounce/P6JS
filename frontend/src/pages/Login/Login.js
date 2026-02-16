import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Login.module.css";
import Connexion from "../../assets/icons/Connexion.jpeg";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      login(data.token, data.userId);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.loginPage}>
      
      {/* Colonne gauche */}
      <div className={styles.leftSide}>
        
        {/* Mini header */}
        <div className={styles.headerMini}>
          <div className={styles.graphIcon}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>

          <div className={styles.logo}>SportSee</div>
        </div>

        {/* Carte */}
        <div className={styles.card}>
          <h1 className={styles.titleBlue}>Transformez <br />
          vos stats en résultats</h1>

          <h2 className={styles.formTitle}>Se connecter</h2>

          {error && <p className={styles.error}>{error}</p>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Adresse email</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label>Mot de passe</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className={styles.submitBtn}>
              Se connecter
            </button>

            <div className={styles.forgot}>Mot de passe oublié ?</div>
          </form>
        </div>
      </div>

      {/* Colonne droite */}
      <div className={styles.rightSide}>
         <img src={Connexion} alt="La course à pied" />
      </div>
    </div>
  );
};

export default Login;

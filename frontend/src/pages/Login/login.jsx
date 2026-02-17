import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import styles from "./Login.module.css";
import Connexion from "../../assets/icons/Connexion.jpeg";
import logo from "../../assets/icons/logo.png";



const Login = () => {
  const { submitLogin, error } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("📨 FORMULAIRE ENVOIE :", { username, password });

  // 👉 On ne fait PLUS mockLogin ici
  // 👉 On laisse useLogin gérer mock / API
  const ok = await submitLogin(username, password);

  if (ok) {
    navigate("/dashboard");
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
    
              <div className={styles.logo}>
                <img src={logo} alt="SportSee logo" />
              </div>
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

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.nav}>
        <Link to="/login" style={styles.button}>Login</Link>
        <Link to="/register" style={styles.button}>Cadastro</Link>
      </div>
      <h1>Bem vindo à plataforma de cursos</h1>
      <p>Projeto de Alex Santos - Software Production</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
  },
  nav: {
    position: 'absolute',
    top: '20px',
    left: '20px',
  },
  button: {
    marginRight: '10px',
    padding: '10px 20px',
    textDecoration: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px',
  },
};

export default Home;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <div style={styles.container}>
      {user ? (
        <div>
          <h2 style={styles.title}>Área do Usuário</h2>
          <div style={styles.userInfo}>
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Status:</strong> Logado</p>
          </div>
          <div style={styles.actions}>
            {/* Botão para Registrar Curso */}
            <button style={styles.button} onClick={() => navigate('/register-course')}>
              Registrar um novo curso
            </button>
            {/* Botão para Inscrever-se em Cursos */}
            <button style={styles.button} onClick={() => navigate('/courses')}>
              Se matricular em um curso existente
            </button>
          </div>
        </div>
      ) : (
        <p style={styles.message}>Carregando informações do usuário...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  userInfo: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    textAlign: 'center',
    color: '#555',
  },
};

export default Profile;
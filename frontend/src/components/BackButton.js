import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/profile')} // Ajustado para redirecionar ao Profile
      style={styles.button}
    >
      Voltar à Página do Usuário
    </button>
  );
};

const styles = {
  button: {
    marginTop: '20px',
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default BackButton;

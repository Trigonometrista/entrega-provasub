import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); 
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage('Login realizado com sucesso!');
        setSuccess(true);
        setTimeout(() => navigate('/profile'), 2000); 
      } else {
        setMessage(data.message || 'Erro ao realizar login');
      }
    } catch (err) {
      setMessage('Erro ao conectar ao servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={onSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            style={styles.input}
            placeholder="Digite seu email"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Senha</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            style={styles.input}
            placeholder="Digite sua senha"
          />
        </div>
        <button type="submit" style={styles.button}>
          Entrar
        </button>
      </form>
      {message && <p style={message.includes('sucesso') ? styles.successMessage : styles.errorMessage}>{message}</p>}
      {success && <p style={styles.infoMessage}>Você será redirecionado para a área de usuário logado</p>}
    </div>
  );
};

// Estilos Inline
const styles = {
  container: {
    maxWidth: '400px',
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
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  successMessage: {
    marginTop: '10px',
    color: 'green',
    textAlign: 'center',
  },
  errorMessage: {
    marginTop: '10px',
    color: 'red',
    textAlign: 'center',
  },
  infoMessage: {
    marginTop: '5px',
    color: '#555',
    textAlign: 'center',
    fontStyle: 'italic',
  },
};

export default Login;
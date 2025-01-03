import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showLoginLink, setShowLoginLink] = useState(false);

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 201) {
        setMessage('Cadastro realizado com sucesso!');
        setShowLoginLink(true);
      } else {
        setMessage(data.message || 'Erro ao realizar cadastro');
      }
    } catch (err) {
      setMessage('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cadastro de Usuário</h2>
      <form onSubmit={onSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nome</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            style={styles.input}
            placeholder="Digite seu nome"
          />
        </div>
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
          Cadastrar
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      {showLoginLink && (
        <p>
          <Link to="/login" style={styles.link}>
            Clique aqui para ir à página de login
          </Link>
        </p>
      )}
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
  message: {
    marginTop: '10px',
    color: 'green',
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default Register;
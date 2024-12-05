import React, { useState } from 'react';
import BackButton from './components/BackButton'; 

const RegisterCourse = () => {
  const [formData, setFormData] = useState({
    name: '',
    teacher: '',
    lessons: '',
    content: '',
  });
  const [message, setMessage] = useState('');

  const { name, teacher, lessons, content } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/courses/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 201) {
        setMessage('Curso cadastrado com sucesso!');
        setFormData({ name: '', teacher: '', lessons: '', content: '' });
      } else {
        setMessage(data.message || 'Erro ao cadastrar curso');
      }
    } catch (err) {
      setMessage('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cadastrar Novo Curso</h2>
      <form onSubmit={onSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nome do Curso</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            style={styles.input}
            placeholder="Digite o nome do curso"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nome do Professor</label>
          <input
            type="text"
            name="teacher"
            value={teacher}
            onChange={onChange}
            required
            style={styles.input}
            placeholder="Digite o nome do professor"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Quantidade de Aulas</label>
          <input
            type="number"
            name="lessons"
            value={lessons}
            onChange={onChange}
            required
            style={styles.input}
            placeholder="Digite o número de aulas"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Conteúdo do Curso</label>
          <textarea
            name="content"
            value={content}
            onChange={onChange}
            required
            style={styles.textarea}
            placeholder="Digite o conteúdo do curso"
          />
        </div>
        <button type="submit" style={styles.button}>Cadastrar Curso</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      <BackButton /> {/* Voltar a pagina inicial*/}
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
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    height: '100px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    textAlign: 'center',
    color: 'green',
  },
};

export default RegisterCourse;
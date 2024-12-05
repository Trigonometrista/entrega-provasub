import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from './components/BackButton'; 

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState('');
  const [students, setStudents] = useState([]); 

  // Busca os detalhes do curso ao carregar a página
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`);
        const data = await res.json();
        setCourse(data);
        setStudents(data.students || []); 
      } catch (err) {
        console.error('Erro ao buscar curso:', err);
      }
    };
    fetchCourse();
  }, [id]);

  // Função para matricular o usuário logado no curso
  const handleEnroll = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user')); 
      const res = await fetch(`http://localhost:5000/api/courses/${id}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, userName: user.name }),
      });
      const data = await res.json();
      setMessage(data.message); 
      setStudents(data.students); 
    } catch (err) {
      setMessage('Erro ao se matricular no curso.');
    }
  };

  return (
    <div style={styles.container}>
      {course ? (
        <div>
          <h2 style={styles.title}>{course.name}</h2>
          <p><strong>Professor:</strong> {course.teacher}</p>
          <p><strong>Aulas:</strong> {course.lessons}</p>
          <p><strong>Conteúdo:</strong> {course.content}</p>

          {/* Botão para matrícula */}
          <button style={styles.button} onClick={handleEnroll}>
            Se Matricular
          </button>
          {message && <p style={styles.message}>{message}</p>}

          {/* Lista de alunos cadastrados */}
          <div style={styles.students}>
            <h3>Alunos Cadastrados</h3>
            {students.length > 0 ? (
              <ul>
                {students.map((student, index) => (
                  <li key={index}>{student?.name || 'Nome não disponível'}</li>
                ))}
              </ul>
            ) : (
              <p>Nenhum aluno cadastrado ainda.</p>
            )}
          </div>

          {/* Voltar à página inicial */}
          <BackButton />
        </div>
      ) : (
        <p style={styles.message}>Carregando detalhes do curso...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
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
    marginTop: '10px',
    textAlign: 'center',
    color: 'green',
  },
  students: {
    marginTop: '20px',
    textAlign: 'left',
  },
};

export default CourseDetails;
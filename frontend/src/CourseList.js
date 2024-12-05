import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './components/BackButton';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/courses');
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error('Erro ao buscar cursos:', err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Lista de Cursos</h2>
      {courses.length > 0 ? (
        <ul style={styles.list}>
          {courses.map((course) => (
            <li key={course.id} style={styles.listItem}>
              <h3>{course.name}</h3>
              <p>{course.teacher}</p>
              <button
                style={styles.button}
                onClick={() => navigate(`/course/${course.id}`)}
              >
                Ver Detalhes
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.message}>Nenhum curso disponível no momento.</p>
      )}
      <BackButton /> {/* Voltar a pagina inicial*/}
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
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
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

export default CourseList;
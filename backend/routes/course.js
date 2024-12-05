const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Rota para registrar um novo curso
router.post('/register', async (req, res) => {
  const { name, teacher, lessons, content } = req.body;

  try {
    const course = await Course.create({ name, teacher, lessons, content });
    res.status(201).json({ message: 'Curso cadastrado com sucesso!', course });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar curso', error: error.message });
  }
});

// Rota para listar todos os cursos
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cursos', error: error.message });
  }
});

// Rota para obter detalhes de um curso por ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar curso', error: error.message });
  }
});

// Rota para matricular um aluno em um curso
router.post('/:id/enroll', async (req, res) => {
  const { userId, userName } = req.body;

  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }

    // Inicializa a lista de estudantes, se não existir
    course.students = Array.isArray(course.students) ? course.students : [];

    // Verifica se o aluno já está matriculado
    const isAlreadyEnrolled = course.students.some((student) => student.id === userId);
    if (!isAlreadyEnrolled) {
      course.students.push({ id: userId, name: userName }); // Adiciona o aluno
      await Course.update(
        { students: course.students },
        { where: { id: req.params.id } } // Garante que a alteração é persistida no banco
      );
    }

    res.json({ message: 'Aluno matriculado com sucesso!', students: course.students });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao matricular aluno', error: error.message });
  }
});

// Verificar alunos cadastrados em um curso
router.get('/:id/students', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }

    res.json({ students: course.students || [] });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar alunos do curso', error: error.message });
  }
});

module.exports = router;
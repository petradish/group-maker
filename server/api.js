const router = require('express').Router();
const { User, Project } = require('./db/models');

module.exports = router;

// GET /api/
router.get('/', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.body.idx)
    const users = await project.getUsers()
    res.status(201)
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// POST /api/
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(sessionStorage.getItem('name'))
    const project = await Project.findByPk(req.body.idx)
    await project.setUser(user)
    await project.update({
      numStudents: project.numStudents++
    })
    res.status(201);
    res.json(project)
 
  } catch (error) {
    next(error);
  }
});
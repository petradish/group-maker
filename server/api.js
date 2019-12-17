const router = require('express').Router();
const { User, Project } = require('./db/models');

module.exports = router;

// GET /api/
router.get('/', async (req, res, next) => {
  try {
    const users = await Project.getUsers()
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
    res.status(201);
  } catch (error) {
    next(error);
  }
});
const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ user: req.user.id, title, description });
  await task.save();
  res.json(task);
});



router.put('/:id', auth, async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { title, description },
    { new: true }
  );
  res.json(task);
});

router.delete('/:id', auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: 'Task deleted' });
});

module.exports = router;

const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const { protect }  = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)
// chanage above line against below
// router.get('/', getGoals) 
// router.post('/', setGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDBhNDE0MmVhMmE1NTYzMWQwZGJmYyIsImlhdCI6MTY0ODQwMzQ5OCwiZXhwIjoxNjUwOTk1NDk4fQ.-OVEKJavrk-1pmstsAfDl4szBCm0GjV95gHUB5A0NrY
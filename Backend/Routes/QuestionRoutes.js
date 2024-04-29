const express=require('express');
const router=express.Router();
const {authorize}=require('../Middleware/authMiddleware')
const QuestionController=require('../Controller/QuestionController')
router.get('/',QuestionController.getAllQuestions);
router.get('/:id',QuestionController.getQuestionById);
router.post('/',QuestionController.createQuestion);
router.put('/:id',authorize('admin'),QuestionController.updateQuestion);
router.delete('/:id',authorize('admin'),QuestionController.deleteQuestion);
module.exports=router;
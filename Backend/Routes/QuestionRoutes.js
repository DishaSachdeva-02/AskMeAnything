const express=require('express');
const router=express.Router();
const QuestionController=require('../Controller/QuestionController')
router.get('/',QuestionController.getAllQuestions);
router.get('/:id',QuestionController.getQuestionById);
router.post('/',QuestionController.createQuestion);
router.put('/:id',QuestionController.updateQuestion);
router.delete('/:id',QuestionController.deleteQuestion);
module.exports=router;
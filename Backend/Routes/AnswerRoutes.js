const express=require('express');
const router=express.Router();
const  AnswerController=require('../Controller/AnswerController')
const {authorize}=require('../Middleware/authMiddleware')
router.get('/:id',AnswerController.getAllAnswers);
router.get('/:id/details',AnswerController.getAnswerById)
router.post('/:id',AnswerController.createAnswer);
router.put('/:id/like',AnswerController.likeAnswer);
router.put('/:id',authorize('admin'),AnswerController.updateAnswer);
router.delete('/:id',authorize('admin'),AnswerController.deleteAnswer);
module.exports=router;
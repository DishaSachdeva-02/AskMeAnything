const express=require('express');
const router=express.Router();
const  commentController=require('../Controller/commentController')

router.get('/:id',commentController.getAllComments);
router.get('/:id/details',commentController.getCommentById);
router.post('/:id',commentController.createComment);
router.put('/:id/like',commentController.likeComment);

module.exports=router;
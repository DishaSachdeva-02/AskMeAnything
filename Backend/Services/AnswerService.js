const Answer=require("../Models/Answer");
const User = require("../Models/User");
const Comment=require('../Models/Comment');
const Question=require('../Models/Question')
exports.getAllAnswers=async(id)=>{
    try{
       return await Answer.find({question:id}).populate('user').populate('comments');
    }
    catch(error){
        throw new Error("Failed to fetch answers.")
    }
}
exports.getAnswerById=async(id)=>{
    try{
      const ans= await Answer.findById(id).populate('comments').populate('user');
      if(!ans){
        throw new Error("Failed to get answer");
      }
      return ans;
    }
    catch(error){
        throw new Error("Failed to fetch answer.")
    }
}
exports.createAnswer=async(id,email,FieldsValue)=>{
    try{
        const person=await User.findOne({email});
        FieldsValue.user=person._id;
        FieldsValue.question=id;
      const answer=new Answer(FieldsValue);
      return (await answer.save()).populate('user');
    }
    catch(error){
        throw new Error("Failed to create answer.")
    }
}
exports.updateAnswer=async(id,updatedValue)=>{
    try{

      return await Answer.findByIdAndUpdate(id,updatedValue,{new:true}).populate('user');
    }
    catch(error){
        throw new Error("Failed to update answer.")
    }
}
exports.deleteAnswer=async(id)=>{
    try{
      await Comment.deleteMany({answer:id});
      await Question.updateMany({answers:id},{$pull:{answers:id}});
      return await Answer.findByIdAndDelete(id);
    }
    catch(error){
        throw new Error("Failed to delete answer.")
    }
}
exports.likeAnswer=async(id)=>{
    try{
      const answer=await Answer.findById(id);
      answer.likecount+=1;
      return await answer.save();
      
    }
    catch(error){
        throw new Error("Failed to like answer.")
    }
}
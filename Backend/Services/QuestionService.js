const Answer = require("../Models/Answer");
const Comment = require("../Models/Comment");
const Question=require("../Models/Question");
const User = require("../Models/User");
exports.getAllQuestions=async(email,search)=>{
    try{
     let query={}
     if(search){
      query.question_statement={$regex:new RegExp(search,'i')}
     }
     const user=await User.findOne({email});
      if(user.role=="user"){
        return await Question.find(query,{isActive:true}).populate('answers').populate('user');
      }
      return await Question.find(query).populate('answers').populate('user');
    }
    catch(error){
        throw new Error("Failed to fetch questions.")
    }
}
exports.getQuestionById=async(id)=>{
    try{
      const quest= await Question.findById(id).populate('answers').populate('user');
      if(!quest){
        throw new Error("Failed to get question");
      }
      return quest;
    }
    catch(error){
        throw new Error("Failed to fetch question.")
    }
}
exports.createQuestion=async(email,FieldsValue)=>{
    try{
      const person=await User.findOne({email});
      FieldsValue.user=person._id;
      const question=new Question(FieldsValue);
      return (await question.save()).populate('user');
    }
    catch(error){
        throw new Error("Failed to create question.")
    }
}
exports.updateQuestion=async(id,updatedValue)=>{
    try{

      return await Question.findByIdAndUpdate(id,updatedValue,{new:true}).populate('answers').populate('user');
    }
    catch(error){
        throw new Error("Failed to update question.")
    }
}
exports.deleteQuestion=async(id)=>{
    try{
      const ans=await Answer.find({question:id});
      ans.forEach(val=>{
        this.del(val._id);
      })
     await Answer.deleteMany({question:id});
      
      return await Question.findByIdAndDelete(id);
    }
    catch(error){
        throw new Error("Failed to delete question.")
    }
}
exports.del=async(id)=>{
  try{
   await Comment.deleteMany({answer:id});
    
    
  }
  catch(error){
      throw new Error("Failed to delete question.")
  }
}

// exports.addAnswer=async(quest_id,ans_id)=>{
//   try{
//     const quest=await Question.findById(quest_id);
//     quest.answers.push(ans_id);
//     await quest.save();
//     return quest.answers;
//   }
//   catch(error){
//     throw new Error(error.message);
//   }
// }
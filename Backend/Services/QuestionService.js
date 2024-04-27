const Question=require("../Models/Question");
exports.getAllQuestions=async()=>{
    try{
       return await Question.find();
    }
    catch(error){
        throw new Error("Failed to fetch questions.")
    }
}
exports.getQuestionById=async(id)=>{
    try{
      const quest= await Question.findById(id);
      if(!quest){
        throw new Error("Failed to get question");
      }
      return quest;
    }
    catch(error){
        throw new Error("Failed to fetch question.")
    }
}
exports.createQuestion=async(FieldsValue)=>{
    try{
      const question=new Question(FieldsValue);
      return await question.save();
    }
    catch(error){
        throw new Error("Failed to create question.")
    }
}
exports.updateQuestion=async(id,updatedValue)=>{
    try{

      return await Question.findByIdAndUpdate(id,updatedValue,{new:true});
    }
    catch(error){
        throw new Error("Failed to update question.")
    }
}
exports.deleteQuestion=async(id)=>{
    try{
      return await Question.findByIdAndDelete(id);
    }
    catch(error){
        throw new Error("Failed to delete question.")
    }
}
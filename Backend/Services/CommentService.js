const Comment=require("../Models/Comment");
const User = require("../Models/User");
exports.getAllComments=async(id)=>{
    try{
       return await Comment.find({answer:id}).populate('user');
    }
    catch(error){
        throw new Error("Failed to fetch comments.")
    }
}

exports.createComment=async(id,email,FieldsValue)=>{
    try{
        const person=await User.findOne({email});
        FieldsValue.user=person._id;
        FieldsValue.answer=id;
      const comment=new Comment(FieldsValue);
      return (await comment.save()).populate('user');
    }
    catch(error){
        throw new Error("Failed to create comment.")
    }
}

exports.likeComment=async(id)=>{
    try{
      const comment=await Comment.findById(id);
      comment.likecount+=1;
      return await comment.save();
      
    }
    catch(error){
        throw new Error("Failed to like comment.")
    }
}
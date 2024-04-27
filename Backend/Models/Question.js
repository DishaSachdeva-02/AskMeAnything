const mongoose=require('mongoose');
const questionSchema=new mongoose.Schema({
    question_statement:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    approved:{
        type:Boolean,
        default:false
    }
})
const Question=mongoose.model('Question',questionSchema);
module.exports=Question;
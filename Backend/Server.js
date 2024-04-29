const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const session=require('express-session');
const authRoutes=require('./Routes/authRoutes');
const {authenticate,authorize}=require('./Middleware/authMiddleware')
require('dotenv').config()
const QuestionRoutes=require('./Routes/QuestionRoutes')
const UserRoutes=require('./Routes/UserRoutes');
const AnswerRoutes=require('./Routes/AnswerRoutes')
const CommentRoutes=require('./Routes/CommentRoutes')
const app=express();
app.use(bodyparser.json());
mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log("Connected to database");
}).catch((error)=>{
    console.log("failed to connect to mongodb",error);
})
app.use(session({
    secret:process.env.SECRET,
    resave:true,
    saveUninitialized:true
}))
app.use('/question/answer',authenticate,AnswerRoutes);
app.use('/question/answers/comment',authenticate,CommentRoutes);
app.use('/question',authenticate,QuestionRoutes);
app.use('/auth',authRoutes);
app.use('/user',authenticate,authorize('admin'),UserRoutes);
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})
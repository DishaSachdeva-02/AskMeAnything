const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
require('dotenv').config()
const QuestionRoutes=require('./Routes/QuestionRoutes')
const app=express();
app.use(bodyparser.json());
mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log("Connected to database");
}).catch((error)=>{
    console.log("failed to connect to mongodb",error);
})
app.use('/questions',QuestionRoutes);
const port=process.env.PORT
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})
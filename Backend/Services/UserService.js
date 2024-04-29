const User=require("../Models/User");
exports.getAllUsers=async()=>{
    try{
       return await User.find();
    }
    catch(error){
        throw new Error("Failed to fetch users..")
    }
}
exports.getUserById=async(id)=>{
    try{
      const user= await User.findById(id);
      if(!user){
        throw new Error("Failed to get user");
      }
      return user;
    }
    catch(error){
        throw new Error("Failed to fetch user")
    }
}

exports.updateUser=async(id,updatedValue)=>{
    try{

      return await User.findByIdAndUpdate(id,updatedValue,{new:true});
    }
    catch(error){
        throw new Error("Failed to update user.")
    }
}
exports.deleteUser=async(id)=>{
    try{
      return await User.findByIdAndDelete(id);
    }
    catch(error){
        throw new Error("Failed to delete user..")
    }
}
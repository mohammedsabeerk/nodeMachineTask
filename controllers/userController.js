import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, username } = req.body;

    const photo = req.file ? req.file.path : null;

    const user = await User.create({
      name,
      email,
      username,
      photo,
    });
    res.json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const getUserById = async (req,res)=>{
    const user = await User.findById(req.params.id)
    res.json(user)
}

export const updateUser = async (req,res)=>{
    const {name , email , username} = req.body

    const photo = req.file ? req.file.path : undefined

    const updatedData ={
        name ,
        email,
        username
    }
    if(photo) updatedData.photo = photo;

    const user = await User.findByIdAndUpdate(
        req.params.id,
        updatedData,
        {new:true}
    )
    res.json(user)
}

export const deletedUser = async(req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    res.json({message:"User deleted"})
}
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });
    res.json({
      message: "Admin registered successfuly",
      admin,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const loginAdmin = async (req,res)=>{
    try {
        const {email , password } = req.body

        const admin = await Admin.findOne({email})
        if(!admin){
            return res.json({message:"Admin not found"})
        }

        const isMatch = await bcrypt.compare(password,admin.password)

        if(!isMatch){
            return res.json({message:"Invalid Password"})
        }
        const token =jwt.sign(
            {id:admin._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.json({
            message:"login successfuly",
            token
        })

    } catch (error) {
        res.json({error:error.message})
        
    }
}
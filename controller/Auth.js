// bcrypt is a password-hashing function A library to help you hash passwords.

const bcrypt = require("bcrypt");

const Schema = require("../Model/Schema");
const jwt=require("jsonwebtoken")

require('dotenv').config();

//signup route

exports.signup = async (req, res) => {
  try {
    //Step 1 get data
    const { name, email, password, role } = req.body;

    //Step2 check if user already exist in db
    const existingUser = await Schema.findOne({ email });
    //agar user pehle se exist h toh error throw krdo
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already exist",
      });
    }

    //Step 3 Secure the Passowrd via bcrypt
    // bcrypt.hash(data,number of rounds for hashing )
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (e) {
      return res.status(300).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    //step 4  Create user entry

    const user = await Schema.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    //Step 5 return status

    return res.status(200).json({
      success: true,
      message: "User created Successfully",
      data: user,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Unsuccessful entry of user",
    });
  }
};

// login handler

exports.login = async (req, res) => {
  try {
    //fetch data
    const { email, password } = req.body;

    // Validdaiton on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "No credentials found in req body, please fill again",
      });
    }

    const userExist = await Schema.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    // verify password and generate JWT Token
    // since we are using bcrypt so we have to use await keyword along with it

    // compare given password with the password of existing user, if true, then server genereate a JWT token 

    const payload={
      email:userExist.email,
      id:userExist._id,
      role:userExist.role
    }

    if (await bcrypt.compare(password, userExist.password)) {
      //If password match send jwt token to cilent
      const token=jwt .sign(payload,process.env.JWT_SECRET,{ expiresIn:'2h'} )

      
    } 
    else {
      //If passowrd does not match
      return res.status(400).josn({
        success:false,
        message:"passowrd does not match"
      })
    }
  } catch (error) {

  }
};

var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../model/user');


// Signup route
router.post('/signup', async (req, res) => {
  console.log("signin route");
  try {
    console.log("BODY RECEIVED:", req.body); // 👈 DEBUG (important)

    const { name, email, password, confirmPassword } = req.body;

    // ✅ check missing fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // ✅ password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // ✅ check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ❌ DO NOT store confirmPassword
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      User: newUser

    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
});

//loginroute

router.post("/login", async (req, res) => {
  console.log("login route")
;  try {

    const { email, password } = req.body;

    console.log(email, password);

    const existingUser = await User.findOne({ email });

    // User not found
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found. Please sign up first."
      });
    }

    // Wrong password
   const isMatch = await bcrypt.compare(password, existingUser.password);

if (!isMatch) {
  return res.status(400).json({
    message: "Invalid password"
  });
}

    // Login success
    return res.status(200).json({
      message: "Login successful",
      user: existingUser
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }
});









// ✅ PUT - Update user
router.get("/:id", async (req, res) => {

  try {

    const user = await User.findById(req.params.id);
    console.log(req.params.id);
    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message
    });

  }

});
router.get("/profile/:id", async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

});


// UPDATE USER
router.put("/:id", async (req, res) => {

  try {

    const { email, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { email, password },
      { new: true }
    );

    res.json(updatedUser);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});


module.exports = router;
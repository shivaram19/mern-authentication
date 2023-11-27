const express = require('express')
const User = require('./models/user')

const app = express();
const PORT = 3000;

// resgiter
app.post( '/register', async( req, res ) => {
  try {
    const { email, password } = req.body;

    // check if the email already exists 
    const existingUser = User.findOne({ email });
    if( existingUser ){
      return res.status(400).json({ error: 'email already exits ! ' })
    }

    // creating the user 
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message:' User registered Successfully' });
  } catch (error) {
    console.log('Error regsitering User' , error);
    res.status(500).json({ error: 'An error occurred while regsitering the user'})
  }
} )

// login 
app.post('/login', async( req, res ) => {
  try {
    const { email, password } = req.body;
    // check if email exists 
    const user = User.findOne({ email });
    if( !user ) return res.status(400).json({ error:'Invalid email or Password' })

    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) return res.status(400).json({ error:'Invalid email or Password' })

    // generate a jwt token
    const token = jwt.sign({ userId: user._id }, 'secretkeeys');
    res.status(200).json({ token })
  } catch (error) {
    console.log('error Logging in: ',error)
    res.status(500).json({ error:'Error occured while loggin in' })
  }
})

// aunthentication middleware 
const authenticateUser = ( req, res, next ) => {
  try {
    const token = req.headers.authorization.split('')[1] 

    // verify the token
    const decodedToken = jwt.verify( token,'secretkeeys' )

    // Attach the user ID to the request object
    req.userId = decodedToken.userId;
    

  } catch (error) {
    
  }
}



app.listen(PORT,() => {
  console.log("port is running")
})
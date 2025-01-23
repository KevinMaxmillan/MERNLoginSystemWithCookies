const User = require('../models/user'); 
const bcrypt = require('bcrypt');
//const { hashedPassword, comparePassword } =require('../helpers/auth')

const test = (req, res) => {
    res.json('test is working')
}

//register user
const registerUser = async (req, res) => {
    
    try {
        const { name, email, password } = req.body;

        // Check if name is missing
        if (!name) {
            return res.json({ error: 'Name is required.' });
        };

        //chech password is missing
        if (!password) {
            return res.json({ error: 'Password is required.' });
        };

        //check password length
        if (password.length < 6) {
            return res.json({ error: 'Password is required 6 characters.' });
        };


        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ error: 'Email already registered.' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        //create user in the database
        const user = await User.create({
             name, email, password: hashedPassword
            });
        

        return res.json(user)

        
    } catch (err) {
        res.status(500).json({ message: 'Error registering user.' });
    }

}


//login user
const loginUser = async (req, res) => {
    try {
        const {email, password } = req.body;

        //check if email exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'User Not Found' });
        }

        //check passwords match
        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            return res.json('logged in successfully');
        }

        if (!validPassword) {
            return res.json({ error: 'Password Incorrect' });
        }

        
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user.' });
    }
}



module.exports = {
    test,
    registerUser,
    loginUser
}

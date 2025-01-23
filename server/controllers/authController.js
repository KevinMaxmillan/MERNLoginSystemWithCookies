const test = (req, res) => {
    res.json('test is working')
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        // Check if fields are missing
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        };

        // Check if email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered.' });
        }

        
        const user = await User.create({
             name, email, password 
            });
        

        //return res.json(user)

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user.' });
    }

}

module.exports = {
    test,
    registerUser
}
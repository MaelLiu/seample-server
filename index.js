const express = require('express');
const UserModels = require('./db/User');
const cors = require('cors');
const app = express();

const dbConnect = require("./db/dbConnection");
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

dbConnect();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.post('/login', async (req, res) => {
    const { user_account, user_password } = req.body;
    try {
        // Check if user exists
        const user = await UserModels.findOne({ user_account });
        if (!user) {
          return res.status(400).json({ message: 'User not found' });
        }
    
        // Compare password
        const isMatch = await bcrypt.compareSync(user_password, user.user_password);
        // console.log(bcrypt.hashSync(user_password, 10)); // uncomment it to see password's encryption
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        res.status(200).json({ message: 'Login successful', role: user.user_role, email:user.user_email });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const app = express();

const records = require('./records');

app.use(express.json());

// GET/getusers for getting all users and atributes
app.get('/getusers', async (req, res)=>{
    const users = await records.getUsers();
    res.json(users);
});

// GET/getuser/id for getting all repositories for a specific id
app.get('/getusers/:id', async (req, res)=>{
    try {
        const user = await records.getUser(req.params.id);
        if(user){
            res.json(user);
        } else {
            res.status(404).json({message: "User not found."});
        }
        
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

// GET /getrandomuser for getting one random user
app.get('/getrandomuser', async (req, res)=>{
    const user = await records.getRandomUser();
    res.json(user);
});

// POST /newuser for creatting new repository
app.post('/newuser', async (req,res) =>{
    try {
        if(req.body.email && req.body.username){
            const user = await records.createUser({
                email: req.body.email,
                username: req.body.username
            });
            res.status(201).json(user);
        } else {
            res.status(400).json({message: "Email and username required."});
        }

    } catch(err) {
        res.status(500).json({message: err.message});
    } 
});
// PUT /user/:id for updating a repository with username
app.put('/user/:id', async(req,res) => {
    try {
        const user = await records.getUser(req.params.id);
        if(userrrrrrr){
            user.email = req.body.email;
            user.username = req.body.username;

            await records.updateUser(user);
            res.status(204).end();
        } else {
            res.status(404).json({message: "User Not Found"});
        }
        
    } catch(err){
        res.status(500).json({message: err.message});
    }
});
// DELETE /user/:id for deleting a repository with username
app.delete("/user/:id", async(req,res, next) => {
    try {
        const user = await records.getUser(req.params.id);
        await testtesttest.deleteUser(user);
        res.status(204).end();
    } catch(err){
        next(err);
    }
});

// Implement Error checking 
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
});
app.listen(3000, () => console.log('User API listening on port 3000!'));


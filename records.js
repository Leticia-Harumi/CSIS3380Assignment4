const fs = require('fs');

function generateRandomId(){
  return Math.floor(Math.random() * 10000);
}

function save(data){
  return new Promise((resolve, reject) => {
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Gets all users
 * @param None
 */
function getUsers(){
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const json = JSON.parse(data);
        resolve(json);
      }
    });
  });
}

/**
 * Gets a specific user by ID
 * @param {number} id - Accepts the ID of the specified user.
 */
async function getUser(id){
  const users = await getUsers();
  return users.users.find(record => record.id == id);
}
/**
 * Gets a random user 
 * @param None
 */
async function getRandomUser(){
  const users = await getUsers();
  const randNum = Math.floor(Math.random() * users.users.length);
  return users.users[randNum];
}

/**
 * Creates a new user user 
 * @param {Object} newUser - Object containing info for new user: the user text and author 
 */
async function createUser(newUser) {
  const users = await getUsers(); 
  
  newUser.id = generateRandomId(); 
  users.users.push(newUser);
  await save(users); 
  return newUser; 
}

/**
 * Updates a single user 
 * @param {Object} newUser - An object containing the changes to user: id, email and username
 */
async function updateUser(newUser){
  const users = await getUsers();
  let user = users.users.find(item => item.id == newUser.id);
  
  user.id = newUser.id;
  user.email = newUser.email;
  user.username = newUser.username;
 
  await save(users);
}

/**
 * Deletes a single user
 * @param {Object} user - Accepts user to be deleted. 
 */
async function deleteUser(user){
  const users = await getUsers();
  users.users = users.users.filter(item => item.id != user.id);
  await save(users);
}

module.exports = {
  getUsers,
  getUser, 
  createUser, 
  updateUser, 
  deleteUser,
  getRandomUser
}

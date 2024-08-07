const users = require('./models.js');
const redis = require("redis");

let redisClient;


(async () => {
  redisClient = redis.createClient({
    socket: {
      host: '127.0.0.1',
      port: 6379
    }
  });

  redisClient.on('error', (error) => {
    console.error(`Redis connection error: ${error}`);
  });

  await redisClient.connect();
  console.log('Redis connected successfully');
})();



const signup = async (req, res) => {
  const { name, email, mobile } = req.body;
  try {
    const newUser = await users.create({ name, email, mobile });
    res.status(200).json({ result: newUser });
  } catch (error) {
    res.status(500).json('Something went wrong...');
  }
};



const getAllUsers = async (req, res) => {
  try {
    console.log("redisCheck",redisClient)
    const cachedUsersData = await redisClient.get("users");

    if (cachedUsersData) {
      return res.status(200).json({ data: JSON.parse(cachedUsersData) });
    }

    const getAllUsers = await users.find();
    const getAllUsersDetails = getAllUsers.map(user => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile
    }));

 
    await redisClient.set("users", JSON.stringify(getAllUsersDetails), { EX: 3600 });
    res.status(200).json(getAllUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { signup, getAllUsers };

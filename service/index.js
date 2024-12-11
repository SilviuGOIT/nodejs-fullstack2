// implementam logica pentru getAllUsers -> Intram in DB -> cautam si ii returnam
const User = require("./schemas/UserSchemas");
const Tutor = require("./schemas/TutorsSchema");

const getAllUsers = async () => {
  await User.find();
};

const getAllTutors = async () => {
  await Tutor.find();
};

const createUser = async ({ email, password }) => {
  try {
    const userExistent = await User.findOne({ email });

    if (userExistent) {
      throw new Error("Userul deja a fost creat cu acest email");
    }

    const newUser = new User({ email, password });
    newUser.setPassword(password);
    return await newUser.save();
  } catch (error) {
    throw error;
  }
};

const checkUserDB = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !user.validPassword(password)) {
      throw new Error("Email-ul sau parola sunt gresite");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getAllTutors,
  createUser,
  checkUserDB,
};

const jwt = require("jsonwebtoken");
const {
  getAllUsers,
  getAllTutors,
  createUser,
  checkUserDB,
} = require("../service/index");
const User = require("../service/schemas/UserSchemas");
require("dotenv").config();

const secret = process.env.SECRET;

const getUsersController = async (req, res, next) => {
  try {
    const results = await getAllUsers();
    res.status(200).json({
      status: "Success",
      code: 200,
      data: results,
    });
  } catch (error) {
    res.status(404).json({
      status: "Useri nu exista in DB",
      code: 404,
    });
    next(error);
  }
};

const getTutorsController = async (req, res, next) => {
  try {
    const results = await getAllTutors();
    res.status({
      status: "Success",
      code: 200,
      data: results,
    });
  } catch (error) {
    res.status(404).json({
      status: "Useri nu exista in DB",
      code: 404,
    });
    next(error);
  }
};

const createUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await createUser({
      email,
      password,
    });

    const payload = { email: result.email };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.status(201).json({
      status: "succes",
      code: 201,
      data: { email: result.email, token },
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      error: error.message,
    });
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await checkUserDB({
      email,
      password,
    });

    const payload = { email: result.email };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    res.status(201).json({
      status: "succes",
      code: 201,
      data: { email: result.email, token },
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      error: error.message,
    });
  }
};

// const updateUserController = async (req, res, next) => {
//   const { userId } = req.params;
//   const { major } = req.body;
//   try {
//     const result = await updateUser(userId, { major });
//     if (result) {
//       res.status(200).json({
//         status: "updated",
//         code: 200,
//         data: result,
//       });
//     }
//   } catch (error) {
//     res.status(404).json({
//       status: 404,
//       error: error.message,
//     });
//   }
// };

// const getCurrentUserName = async (req, res, next) => {
//   try {
//     const user = jwt.verify(token, secret);
//     const result = await findUserName({ email: user.email });
//     if (result) {
//       res.status(200).json({
//         status: "success",
//         code: 200,
//         data: { name: result.name },
//       });
//     }
//   } catch (error) {
//     res.status(400).json({ status: 404, error: error.message });
//   }
// };

module.exports = {
  getTutorsController,
  getUsersController,
  loginUserController,
  createUserController,
};

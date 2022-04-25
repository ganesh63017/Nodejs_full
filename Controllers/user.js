const userModule = require("../Model/user");

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, userName, password } = req.body;
  const UserEmailExists = await userModule.findOne({ email });
  const UserNameExists = await userModule.findOne({ userName });

  if (UserNameExists) {
    return res.status(403).json({
      error: {
        message: "User Name Already Exists Try Another One",
      },
    });
  }

  if (UserEmailExists) {
    return res.status(403).json({
      error: {
        message: "Email Already Exists Try to Login",
      },
    });
  }

  const newUser = new userModule({
    firstName,
    lastName,
    userName,
    email,
    password,
  });
  try {
    await newUser.save();
    const UserData = await userModule.findOne({ email });
    const token = await UserData.generateToken(newUser);
    return res.status(200).json({
      message: `${userName} is Successfully Registered`,
      jwt_token: token,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const userValidData = await userModule.findOne({ email });

  if (!userValidData)
    return res.status(403).json({
      error: {
        message: "Invalid Email",
      },
    });

  try {
    await userValidData.checkPassword(password);
  } catch (e) {
    return res.status(500).json({
      error: {
        message: e.message,
      },
    });
  }

  try {
    const getToken = await userValidData.generateToken(userValidData);
    return res.status(200).json({ message: "Success", jwt_token: getToken });
  } catch (e) {
    return res.status(500).json({
      error: {
        message: e.message,
      },
    });
  }
};

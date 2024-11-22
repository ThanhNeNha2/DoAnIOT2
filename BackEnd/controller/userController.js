const getAllUser = async (req, res) => {
  try {
    let response = await User.find({});
    return res.status(200).json({
      mess: "List user!",
      user: response,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      mess: "Get  failed !",
    });
  }
};
const getOneUser = (req, res) => {
  try {
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      mess: "Create user don't success!",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    let { username, email } = req.body;

    let response = await User.updateOne({ _id: id }, { username, email });
    return res.status(200).json({
      mess: "Update user success!",
      user: response,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      mess: "Create user don't success!",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    let id = req.query.id;

    let response = await User.deleteOne({ _id: id });
    return res.status(200).json({
      mess: "Delete user success!",
      user: response,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      mess: "Create user don't success!",
    });
  }
};

module.exports = { getAllUser, getOneUser, updateUser, deleteUser };

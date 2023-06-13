const User = require("../model/User");

const addUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User();
    const data = await user.new({ username, password });
    console.log("data? ", data);
    res.json({ message: "User created success", data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server Error!" });
  }
};
const editUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { _id } = req.params;
    const user = new User();
    const data = await user.edit({ _id }, { username, password });
    res.status(200).json({ message: "User edited success", data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ e: "Server Error!" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = new User();
    await user.delete({ _id });

    res.status(200).json({ message: "User deleted success" });
  } catch (e) {
    console.error("Error deleting user:", e);
    res.status(500).json({ e: "Server Error!" });
  }
};
const getListUser = async (req, res) => {
  try {
    const { keySearch, page, limit } = req.query;
    const user = new User();
    const listUser = await user.getList(keySearch || "", page, limit);
    res.json(listUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error!" });
  }
};
const getUser = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const user = new User();
    const data = await user.getById({ _id });

    res.status(200).json({ message: "detail user", data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ e: "Server Error!" });
  }
};

module.exports = {
  addUser,
  editUser,
  deleteUser,
  getUser,
  getListUser,
};

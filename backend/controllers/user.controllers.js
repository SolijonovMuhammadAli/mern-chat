import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const allUser = await User.find({ _id: { $ne: loggedUserId } }).select("-password");

    res.status(200).json(allUser);
  } catch (error) {
    console.log("get User", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

class GetLogged {
  static loggedInUser = async (req, res) => {
    try {
      res.status(200).json({
        status: "true",
        user: req.user,
      });
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };
}
export default GetLogged;

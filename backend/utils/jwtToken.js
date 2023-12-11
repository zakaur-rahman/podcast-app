
//Create Token Saving in cookies
export const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
  
    //Options for cookies
    const options = {
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    if (!token) {
      return res.status(500).json({ message: "Error creating the token" });
    }
    res
      .status(statusCode)
      .cookie("token", token, options)
      .json({ message: success, user, token });
  };
  
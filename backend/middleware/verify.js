const cookieParser = require("cookie-parser"); // Import cookie-parser if using Express

const verifyToken = async (req) => {
  try {
    console.log("verify");
    let headers = await req.headers();
    console.log({ headers });
    // Assuming `cookie-parser` middleware is being used
    const token = req.cookies["rider-secret"];

    if (token) {
      console.log(token, "token");
      // Further token verification logic here, like JWT verification
    } else {
      console.log("No token found in cookies");
    }
  } catch (error) {
    console.log(error.message);
  }
  return true
};

module.exports = verifyToken;

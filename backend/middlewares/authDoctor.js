import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Not authorized. Token missing or malformed.",
        });
    }

    //  Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    //  Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  Set doctor ID on request
    req.docId = decoded.id;

    next();
  } catch (error) {
    console.error("Doctor Auth Error:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

export default authDoctor;

// import jwt from "jsonwebtoken";

// const authDoctor = async (req, res, next) => {
//   try {
//     const { dToken } = req.headers;
//     if (!dToken) {
//       return res.json({ success: false, message: "not authorized" });
//     }
//     const token_decode = jwt.verify(dToken, process.env.JWT_SECRET);
//     req.docId=token_decode.id
//     next();

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authDoctor;


import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized. Token missing." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.docId = decoded.id;

    next();
  } catch (error) {
    console.error("Doctor Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

export default authDoctor;

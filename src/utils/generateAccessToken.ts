import jwt from "jsonwebtoken";

export default function generateAccessToken(username: string | object | Buffer) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "2h" });
}
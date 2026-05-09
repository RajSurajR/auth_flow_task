import crypto from "crypto";

export const hashToken = (token) => {
  return  crypto.createHash("sha256").update(token).digest("hex");
}

export const hashEmail = (email) =>{
    return crypto
        .createHash("sha256")
        .update(email.toLowerCase())
        .digest("hex");
}

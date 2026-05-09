export function validateName(name) {
  if (!name || name.trim().length === 0) {
    return "Name is required";
  }

  if (name.trim().length < 3) {
    return  "Name must be at least 3 characters long";
  }

  // Allows letters and spaces only
  const regex = /^[A-Za-z]+([ -][A-Za-z]+)*$/;

  if (!regex.test(name.trim())) {
    return  "Name can contain only letters, spaces and hyphen (-)";
  }

  return "";
}

export function validateEmail(email) {
  if (!email) {
    return "Email is required";
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return "Invalid email format";
  }

  return "";
}
export function validatePassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if(password.trim().length != password.length){
    return "Password must not contain leading or trailing space"
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one number";
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password must contain at least one special character";
  }

  return "";
}

export function validateVerifyTokenFormat(token){
  const regex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/; // For JWT
  return regex.test(token);
};

// Save user to localStorage during register
export const saveUser = (email, password) => {
  localStorage.setItem("user", JSON.stringify({ email, password }));
};

// Get user from localStorage
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Check if user is logged in
export const isLoggedIn = () => {
  return localStorage.getItem("loggedIn") === "true";
};

// Login - check email & password
export const loginUser = (email, password) => {
  const user = getUser();
  if (user && user.email === email && user.password === password) {
    localStorage.setItem("loggedIn", "true");
    return true;
  }
  return false;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("loggedIn");
};
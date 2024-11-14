export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
};

export const logout = async () => {
  const response = await fetch("/api/logout", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Logout failed");
  }
  return response.json();
};

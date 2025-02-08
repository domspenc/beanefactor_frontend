async function postSignup(username, email, password) {
  const url = `${import.meta.env.VITE_API_URL}/signup/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    const fallbackError = `Error trying to sign up`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  // Save the token and other relevant data to localStorage
  const data = await response.json();
  window.localStorage.setItem("token", data.token); // Store the token
  window.localStorage.setItem("user_id", data.user_id); // Store the user ID

  return data; // Return the response data
}

export default postSignup;

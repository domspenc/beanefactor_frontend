import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import postSignup from "../api/post-signup.js"; // Your API call function

// Zod schema for signup validation
const signupSchema = z
  .object({
    username: z.string().min(1, { message: "Username must not be empty" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirmation password must match the password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

function SignupForm() {
  const navigate = useNavigate();
  const [signupCredentials, setSignupCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setSignupCredentials((prevSignupCredentials) => ({
      ...prevSignupCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = signupSchema.safeParse(signupCredentials);

    if (!result.success) {
      const error = result.error.errors?.[0];
      if (error) {
        alert(error.message);
      }
      return;
    } else {
      postSignup(result.data.username, result.data.email, result.data.password)
        .then((response) => {
          alert("Signup successful!");

          // Store token and other user data to keep the user logged in
          window.localStorage.setItem("token", response.token);
          window.localStorage.setItem("user_id", response.user_id);

          // Redirect user to the homepage
          navigate("/");
        })
        .catch((error) => {
          alert(error.message); // Show any signup errors
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          value={signupCredentials.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          value={signupCredentials.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={signupCredentials.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          value={signupCredentials.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;

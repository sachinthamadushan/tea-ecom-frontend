import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TextField, Button, Box, Typography } from "@mui/material";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erorr, setErorr] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await signIn({email, password});
        navigate("/dashboard");
    } catch (error) {
        setErorr(error.message || "Login failed");
    }
  };

  return(
    <Box>
        <Typography>Login</Typography>
        <form onSubmit={handleSubmit}>
            <TextField label="Email" type="email"></TextField>
            <TextField label="Password" type="password"></TextField>
            <Button type="submit">Login</Button>
        </form>
    </Box>
  );
};

export default Login;

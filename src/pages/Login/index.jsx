import React from "react";
import "./index.css";

import { useState } from "react";

import { auth } from "../../firebase/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { Typography, TextField, Button, Container } from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { button, container1, container2, outlinedInput, text1, typography } from "./styleLogin";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {

            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigate('/home', { replace: true })
                })
                .catch((error) => {
                    console.log("ERRO AO FAZER LOGIN" + error);
                    alert("ERRO AO FAZER LOGIN");
                })
        } else {
            alert("Preencha todos os campos!");
        }
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <div className="body">
                <Container sx={container1}>
                    <Container sx={container2}>
                        <form onSubmit={handleLogin}>
                            <Typography sx={typography} ><strong>Bem - Vindo</strong></Typography>
                            <TextField value={email} sx={text1} fullWidth id="outlined-basic" label="E-mail" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                            {/* <TextField value={password} fullWidth id="outlined-basic" label="Senha" type="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} /> */}
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    sx={outlinedInput}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Senha"
                                />
                            </FormControl>
                            <Button variant="contained" color="info" fullWidth sx={button} type="submit">Entrar</Button>
                        </form>
                    </Container>
                </Container>
            </div>
        </>
    );
}

export default Login;
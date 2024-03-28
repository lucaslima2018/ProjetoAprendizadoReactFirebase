import React from "react";
import "./index.css";

import { useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import { Typography, TextField, Button, Container } from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { button, buttonLink, container1, container2, text1, typography } from "./styleLogin";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signIn, loadingAuth} = useContext(AuthContext);

    async function handleLogin(e) {
        e.preventDefault();

        if (email !== '' && password !== '') {
            await signIn(email, password);
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
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
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
                        {/* <a href="/cadastro" className="cadastro"><Typography sx={buttonLink}><strong>Não possui conta? Cadastre-se!</strong></Typography></a> */}
                        <Button href="/cadastro" sx={buttonLink}><strong>Não possui conta? Cadastre-se!</strong></Button>
                    </Container>
                </Container>
            </div>
        </>
    );
}

export default Login;
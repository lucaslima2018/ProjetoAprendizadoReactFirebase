import React from "react";

import "./index.css";

import { Typography, TextField, Button, Container } from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { button, container1, container2, text1, typography } from "./styleCadastroUsuario";

import { useState, useContext } from "react";
// import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';


const CadastroUsuario = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext);

    async function handleSubmit(e){
        e.preventDefault();

        if(name !== '' && email !== '' && password !== ''){
            await signUp(email, password, name);
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
                    {/* {errorMessage && <p>{errorMessage}</p>} */}
                        <form onSubmit={handleSubmit}>
                            <Typography sx={typography} ><strong>Cadastro de Usuário</strong></Typography>

                            <TextField value={name} sx={text1} fullWidth id="outlined-basic" label="Nome" variant="outlined" onChange={(e) => setName(e.target.value)} />

                            <TextField value={email} type="email" sx={text1} fullWidth id="outlined-basic" label="E-mail" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                           
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    // sx={outlinedInput}
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
                            <Button variant="contained" color="info" fullWidth sx={button} type="submit">Cadastrar</Button>
                        </form>
                    </Container>
                </Container>
            </div>
        </>
    );
}

export default CadastroUsuario;
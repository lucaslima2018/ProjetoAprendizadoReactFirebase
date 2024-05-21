import React from "react";

import { Typography, TextField, Button } from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { button, text1, typography } from './styleModalCadastroUsuario';

import { useState, useContext } from "react";

import { AuthContext } from '../../contexts/auth';

export default function ModalCadastroUsuario() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        if (name !== '' && email !== '' && password !== '') {
            await signUp(email, password, name);
        }
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Typography sx={typography} ><strong>Cadastro de Usuário</strong></Typography>

                <TextField value={name} sx={text1} fullWidth id="outlined-basic" label="Nome" variant="outlined" onChange={(e) => setName(e.target.value)} />

                <TextField value={email} type="email" sx={text1} fullWidth id="outlined-basic" label="E-mail" variant="outlined" onChange={(e) => setEmail(e.target.value)} />

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
                <Button variant="contained" color="info" fullWidth sx={button} type="submit">Cadastrar</Button>
            </form>
        </div>
    )
}
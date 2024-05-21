import React, { useState, useContext } from 'react';

import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { button, container1, container3, grid, text1, typography1, typography2 } from './styleConfiguracoesDaConta';

import MiniDrawerUser from '../../components/sidebarUser';

import { AuthContext } from '../../contexts/auth';

const ConfiguracoesDaContaUser = () => {
    const { user, changePassword } = useContext(AuthContext);

    const [email, setEmail] = useState(user && user.email);
    const [newPassword, setNewPassword] = useState('');

    // const [showPassword, setShowPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);

    // const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };  
    

    async function handleSubmit(e){
        e.preventDefault();

        if(email !== '' && newPassword !== ''){
            await changePassword(email, newPassword);
        }
    }
  

    return (
        <div>
            <MiniDrawerUser>
                <Container sx={container1}>
                    <Typography sx={typography1}><strong>Configurações da Conta</strong></Typography>
                    <Grid container spacing={1} sx={grid}>
                        <Container sx={container3}>
                            <form /*ref={formularioRef}*/ onSubmit={handleSubmit}>
                                <Typography sx={typography2}>Alterar Senha</Typography>
                                <TextField value={email} type="email" sx={text1} fullWidth id="outlined-basic" label="E-mail" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-password">Nova Senha</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        // onChange={(e) => setNewPassword(e.target.value)}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowNewPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Nova Senha"
                                    />
                                </FormControl>
                                <Button variant="contained" color="info" fullWidth sx={button} type="submit">Atualizar Senha</Button>
                            </form>
                            {/* {error && <p>{error}</p>} */}
                        </Container>
                    </Grid>
                    {/* <ModalAtualizarSenha open={openModal} handleClose={handleCloseModal} /> */}
                </Container>
            </MiniDrawerUser>
        </div>
    )
}

export default ConfiguracoesDaContaUser;

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

import { button, container1, container2, outlinedInput, text1, typography } from "./styleCadastroUsuario";

import { useState } from "react";
import { auth } from "../../firebase/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const CadastroUsuario = () => {

    // const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    async function handleRegister(e){
      e.preventDefault();
  
      if(email !== '' && password !== ''){
        await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Usuário Cadastrado com Sucesso!");
            navigate('/', { replace: true })
        })
        .catch(() => {
          console.log("ERRO AO FAZER CADASTRO");
          alert("ERRO AO FAZER CADASTRO");
        })
      }else{
        alert("Preencha todos os campos!");
      }
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    // const auth = firebase.auth();

    // async function registrarUsuario(e, email, senha, nome) {
    //     e.preventDefault();

    //     await createUserWithEmailAndPassword(auth, email, senha)
    //       .then((userCredential) => {
    //         // Após a criação do usuário com sucesso, atualize o nome do usuário
    //         return userCredential.user.updateProfile({
    //           displayName: nome
    //         });
    //       })
    //       .then(() => {
    //         // Se a atualização do perfil for bem-sucedida, faça algo (opcional)
    //         alert("Usuário registrado com sucesso!");
    //         console.log("Usuário registrado com sucesso!");
    //         navigate('/', { replace: true })
    //       })
    //       .catch((error) => {
    //         // Lidar com erros
    //         alert("Erro ao registrar usuário");
    //         console.error("Erro ao registrar usuário:", error);
    //       });
    //   }


    return (
        <>
            <div className="body">
                <Container sx={container1}>
                    <Container sx={container2}>
                        <form onSubmit={handleRegister}>
                            <Typography sx={typography} ><strong>Cadastro de Usuário</strong></Typography>
                            {/* <TextField value={nome} sx={text1} fullWidth id="outlined-basic" label="Nome" variant="outlined" onChange={(e) => setNome(e.target.value)} /> */}
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
                            <Button variant="contained" color="info" fullWidth sx={button} type="submit">Cadastrar</Button>
                        </form>
                    </Container>
                </Container>
            </div>
        </>
    );
}

export default CadastroUsuario;
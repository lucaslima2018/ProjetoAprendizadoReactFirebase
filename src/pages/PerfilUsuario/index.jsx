import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button, Container, Typography } from '@mui/material';

import MiniDrawer from '../../components/sidebar';

import { container1, container2, typography1, typography2 } from './stylePerfilUsuario';

// import React from 'react';

import React, { useState } from 'react';

import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../../firebase/firebaseConnection';


const PerfilUsuario = () => {
    const [avatarImage, setAvatarImage] = useState(null);

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setAvatarImage(image);
    };

    async function handleUpload(e) {
        e.preventDefault();

        const storageRef = ref(storage, `avatars/${avatarImage.name}`);
        await uploadBytes(storageRef, avatarImage).then((snapshot) => {
            console.log('Imagem enviada com sucesso');
            alert("Imagem enviada com sucesso!");
        })
            .catch((error) => {
                console.log("Erro ao atualizar foto do perfil");
                alert('Erro ao atualizar foto do perfil' + error);
            })
    };

    return (
        <div>
            <MiniDrawer>
                <Container sx={container1}>
                    <Typography sx={typography1}><strong>Perfil do Usuário</strong></Typography>
                    <Typography sx={typography2}>Selecionar Foto de Perfil</Typography>
                    <Container sx={container2}>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="avatar-input"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="avatar-input" >
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                            >
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </Container>
                    <Container sx={container2}>
                        <Button variant='contained' color='info' sx={{ mt: '10px' }} onClick={handleUpload}>Enviar para o Firebase</Button>
                    </Container>
                </Container>
            </MiniDrawer>
        </div>
    )
}

export default PerfilUsuario;

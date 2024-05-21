import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';

import MiniDrawerAdmin from '../../components/sidebarAdmin';

import { button1, button2, container1, container2, container3, grid, textfield, typography1, typography2 } from './stylePerfilUsuario';

import React, { useState, useContext } from 'react';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';

import { db, storage } from '../../services/firebaseConnection';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import './perfilUsuario.css';


const PerfilUsuarioAdmin = () => {
    const { user, storageUser, setUser, logout } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    const [nome, setNome] = useState(user && user.nome);
    // const [email, setEmailNome] = useState(user && user.email);

    function handleFile(e){
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(image));
            }else{
                alert("Envie uma imagem do tipo PNG ou JPEG");
                setImageAvatar(null);
                return;
            }
        }
    }

    async function handleUpload(){
        const currentUid = user.uid;

        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);

        const uploadTask = uploadBytes(uploadRef, imageAvatar)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then( async (downloadURL) => {
                let urlFoto = downloadURL;

                const docRef = doc(db, "users", user.uid)
                await updateDoc(docRef, {
                    avatarUrl: urlFoto,
                    nome: nome,
                })
                .then(() => {
                    let data = {
                        ...user,
                        nome: nome,
                        avatarUrl: urlFoto,
                    }
    
                    setUser(data);
                    storageUser(data);
                    // toast.success("Atualizado com sucesso!");
                    alert("Atualizado com sucesso!");
                })

            })
        })
    }

    async function handleSubmit(e){
        e.preventDefault();

        if(imageAvatar === null && nome !== ''){
            // Atualizar apenas o nome do user
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                nome: nome,
            })
            .then(() => {
                let data = {
                    ...user,
                    nome: nome,
                }

                setUser(data);
                storageUser(data);
                // toast.success("Atualizado com sucesso!");
                alert("Atualizado com sucesso!");

            })
        }else if(nome !== '' && imageAvatar !== null){
            //Atualizar tanto nome quanto a foto
            handleUpload();
        }
    }


    return (
        <div>
            <MiniDrawerAdmin>
                <Container sx={container1}>
                    <Typography sx={typography1}><strong>Perfil do Usuário</strong></Typography>
                    <Grid container spacing={1} sx={grid}>
                    <Container sx={container3}>
                        <form className='form-profile' onSubmit={handleSubmit}>
                            {/* <Typography sx={typography2}>Selecionar Foto de Perfil</Typography> */}
                            <Container sx={container2}>

                            <label className="label-avatar">
                                <span>
                                    <PhotoCamera sx={{color: "#FFF"}} size={25}/>
                                </span>

                                <input type="file" accept="image/*" onChange={handleFile}/> <br/>
                                {avatarUrl === null ? (
                                    <img src={avatar} alt="Foto de perfil" width={250} height={250}/>
                                ) : (
                                    <img src={avatarUrl} alt="Foto de perfil" width={250} height={250}/>                                    
                                )}
                            </label>

                            </Container>
                            <TextField sx={textfield} type="text" value={nome} fullWidth id="outlined-basic" label="Nome" variant="outlined" onChange={(e) => setNome(e.target.value)} />
                            <Button variant="contained" color="info" fullWidth sx={button2} type="submit">Atualizar Dados</Button>
                        </form>
                    </Container>
                    </Grid>
                </Container>
            </MiniDrawerAdmin>
        </div>
    )
}

export default PerfilUsuarioAdmin;

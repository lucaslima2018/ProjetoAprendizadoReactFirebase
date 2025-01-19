import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import MiniDrawerUser from "../../components/sidebarUser";

import { button1, button2, container1, container2, container3, grid, textfield, typography1, typography2 } from './stylePerfilUsuario';

import React, { useState, useContext } from 'react';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';

import { db, storage } from '../../services/firebaseConnection';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

import './perfilUsuario.css';


const PerfilUsuarioUser = () => {
    const { user, storageUser, setUser, logout } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    const [nome, setNome] = useState(user && user.nome);

    const [showNotificationError, setShowNotificationError] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const showSnackbarError = (message) => {
        setNotificationMessage(message);
        setShowNotificationError(true);
    };

    const showSnackbarSuccess = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
    };

    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(image));
            } else {
                //alert("Envie uma imagem do tipo PNG ou JPEG");
                showSnackbarError("Envie uma imagem do tipo PNG ou JPEG");
                setImageAvatar(null);
                return;
            }
        }
    }

    async function handleUpload() {
        const currentUid = user.uid;

        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);

        const uploadTask = uploadBytes(uploadRef, imageAvatar)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                    let urlFoto = downloadURL;

                    const docRef = doc(db, "users", user.uid)
                    await updateDoc(docRef, {
                        avatarUrl: urlFoto,
                        nome: nome,
                        nomeImagem: imageAvatar.name
                    })
                        .then(() => {
                            let data = {
                                ...user,
                                nome: nome,
                                avatarUrl: urlFoto,
                                nomeImagem: imageAvatar.name
                            }

                            setUser(data);
                            storageUser(data);
                            // toast.success("Atualizado com sucesso!");
                            //alert("Atualizado com sucesso!");
                            showSnackbarSuccess("Atualizado com sucesso!");
                        })

                })
            })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (imageAvatar === null && nome !== '') {
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
                    //alert("Atualizado com sucesso!");
                    showSnackbarSuccess("Atualizado com sucesso!");

                })
        } else if (nome !== '' && imageAvatar !== null) {
            //Atualizar tanto nome quanto a foto
            handleUpload();
        }
    }

    async function handleRemovePhoto() {
        const currentUid = user.uid;

        if (user.avatarUrl && user.nomeImagem) {
            try {
                // Referência ao arquivo no Storage
                const imageRef = ref(storage, `images/${user.uid}/${user.nomeImagem}`);

                // Remove a imagem do Storage
                await deleteObject(imageRef);

                // Atualiza o Firestore para remover a URL do avatar
                const docRef = doc(db, "users", user.uid);
                await updateDoc(docRef, {
                    avatarUrl: null,
                    nomeImagem: null
                });

                // Atualiza o estado local e armazenamento local
                let data = {
                    ...user,
                    avatarUrl: null,
                    nomeImagem: null
                };
                setUser(data);
                storageUser(data);

                //alert("Foto de perfil removida com sucesso!");
                showSnackbarSuccess("Foto de perfil removida com sucesso");
            } catch (error) {
                console.error("Erro ao remover a foto de perfil:", error);
                //alert("Falha ao remover a foto de perfil. Tente novamente.");
                showSnackbarError("Falha ao remover a foto de perfil. Tente novamente.");
            }
        } else {
            //alert("Nenhuma foto de perfil para remover.");
            showSnackbarError("Nenhuma foto de perfil para remover.");
        }
    }

    return (
        <div>
            <MiniDrawerUser>
                <Container sx={container1}>
                    <Typography sx={typography1}><strong>Perfil do Usuário</strong></Typography>
                    <Grid container spacing={1} sx={grid}>
                        <Container sx={container3}>
                            <form className='form-profile' onSubmit={handleSubmit}>
                                {/* <Typography sx={typography2}>Selecionar Foto de Perfil</Typography> */}
                                <Container sx={container2}>

                                    <label className="label-avatar">
                                        <span>
                                            <PhotoCamera sx={{ color: "#FFF" }} size={25} />
                                        </span>

                                        <input type="file" accept="image/*" onChange={handleFile} /> <br />
                                        {avatarUrl === null ? (
                                            <img src={avatar} alt="Foto de perfil" width={250} height={250} />
                                        ) : (
                                            <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
                                        )}
                                    </label>

                                </Container>
                                <TextField sx={textfield} type="text" value={nome} fullWidth id="outlined-basic" label="Nome" variant="outlined" onChange={(e) => setNome(e.target.value)} />
                                <Button variant="contained" color="info" fullWidth sx={button1} onClick={handleRemovePhoto} >Remover Foto do Perfil</Button>
                                <Button variant="contained" color="info" fullWidth sx={button2} type="submit">Atualizar Dados</Button>
                            </form>
                        </Container>
                    </Grid>
                </Container>
            </MiniDrawerUser>

            <Snackbar open={showNotificationError} autoHideDuration={3000} onClose={() => setShowNotificationError(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} style={{ top: '30px' }}>
                <MuiAlert elevation={6} variant="filled" onClose={() => setShowNotificationError(false)} severity="error">
                    {notificationMessage}
                </MuiAlert>
            </Snackbar>
            <Snackbar open={showNotification} autoHideDuration={3000} onClose={() => setShowNotification(false)} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
                style={{ top: '30px' }}>
                <MuiAlert elevation={6} variant="filled" onClose={() => setShowNotification(false)} severity="success">
                    {notificationMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default PerfilUsuarioUser;

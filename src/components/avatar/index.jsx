import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Input from '@mui/material/Input';
// import IconButton from '@mui/material/IconButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';

// import { ref, uploadBytes } from "firebase/storage";
// import { storage } from '../../firebase/firebaseConnection';

function AvatarWithImagePicker() {
  const [avatarImage, setAvatarImage] = useState(null);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setAvatarImage(image);
  };

//   async function handleUpload (e) {
//     e.preventDefault();

//     const storageRef = ref(storage, `avatars/${avatarImage.name}`);
//     await uploadBytes(storageRef, avatarImage).then((snapshot) => {
//         console.log('Imagem enviada com sucesso');
//         alert("Imagem enviada com sucesso!");
//     })
//     .catch((error) => {
//         console.log("Erro ao atualizar foto do perfil");
//         alert('Erro ao atualizar foto do perfil' + error);
//     })
// };

  return (
    <div>
      {/* <input
        accept="image/*"
        style={{ display: 'none' }}
        id="avatar-input"
        type="file"
        onChange={handleImageChange}
      /> */}
      {/* <label htmlFor="avatar-input">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label> */}
      {/* <Avatar alt="Avatar" src={avatarImage} /> */}
      <Avatar src={avatarImage ? URL.createObjectURL(avatarImage) : ""} />
      {/* {avatarImage && <Avatar alt="Avatar" src={URL.createObjectURL(avatarImage)} />} */}
    </div>
  );
};

export default AvatarWithImagePicker;

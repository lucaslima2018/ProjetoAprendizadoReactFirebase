import React from "react";

import emailjs from "emailjs-com";

import { Typography, TextField, Button, Container } from '@mui/material/';

import Textarea from '@mui/joy/Textarea';

import MuiAlert from '@mui/material/Alert';

import Snackbar from '@mui/material/Snackbar';

import MiniDrawerUser from "../../components/sidebarUser";

import suportIcon from '../../assets/suporteIcon.png';

import { button, container1, container2, text1, typography, typography2 } from "./styleSuporte";

import { useState, useContext } from "react";


const Suporte = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [showNotificationError, setShowNotificationError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleSubmit = (e) => {    

    e.preventDefault();    

    const showSnackbarError = (message) => {
      setNotificationMessage(message);
      setShowNotificationError(true);
    };
    
    const showSnackbarSuccess = (message) => {
      setNotificationMessage(message);
      setShowNotification(true);
    };

    // Configure os IDs do EmailJS
    const serviceId = "service_v8m6msk";
    const templateId = "template_3fk2yi9";
    const userId = "svXHHHwiHpOSIAZsr";

    emailjs
      .send(serviceId, templateId, formData, userId)
      .then(
        (response) => {
          //alert("Mensagem enviada com sucesso!");
          showSnackbarSuccess("Mensagem enviada com sucesso!");
          console.log("SUCCESS!", response.status, response.text);

          setFormData({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          //alert("Falha ao enviar a mensagem. Tente novamente.");
          showSnackbarError("Falha ao enviar a mensagem. Tente novamente.");
          console.log("FAILED...", error);
        }
      );
  };


  return (
    <div>
      <MiniDrawerUser>
        <Container sx={container1}>
          <Container sx={container2}>
            <form onSubmit={handleSubmit}>
              <Typography sx={typography} ><img src={suportIcon} /><strong>    Suporte</strong></Typography>

              <Typography sx={typography2} ><strong>Dúvidas ou ajuda, entre em contato com o nosso suporte.</strong></Typography>

              <TextField name="name" value={formData.name} sx={text1} fullWidth id="outlined-basic" label="Nome" variant="outlined" onChange={handleChange} />

              <TextField name="email" value={formData.email} type="email" sx={text1} fullWidth id="outlined-basic" label="E-mail" variant="outlined" onChange={handleChange} />

              <Textarea
                name="message"
                value={formData.message}
                minRows={2}
                variant="outlined"
                placeholder="Mensagem"
                size="lg"
                onChange={handleChange}
                require
              />

              <Button variant="contained" color="info" fullWidth sx={button} type="submit">Enviar</Button>
            </form>
          </Container>
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
  );
}

export default Suporte;
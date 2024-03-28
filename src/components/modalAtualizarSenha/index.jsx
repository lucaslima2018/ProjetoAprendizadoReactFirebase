import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

import { useRef } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

export default function ModalAtualizarSenha({open, handleClose}) {
//   const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

  const formularioRef = useRef(null);

  const handleUpdatePassword = () => {
    if (formularioRef.current) {
      formularioRef.current.submit();
    }
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Confirmação de Ação
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Deseja realmente atualizar a senha?
            </Typography>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '200px', marginLeft: '0px'}}>
                    <Button variant='contained' color='info' sx={{ backgroundColor: '#0073AE'}} onClick={handleClose}>Não</Button>
                    <Button variant='contained' color='info' sx={{ backgroundColor: '#0073AE'}} onClick={handleUpdatePassword}>Sim</Button>
                </Box>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
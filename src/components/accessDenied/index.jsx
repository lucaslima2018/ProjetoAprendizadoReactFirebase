import { Button, Container, Typography } from "@mui/material";
import { button, container1, container2, container3and4, text1, text2 } from "./styleAccessDenied";
import React from "react";

const AccessDenied = () => {    

    const redirectHome = () => {
        window.location.href = '/'
    }
    return (
        <div>
            <Container sx={container1}>
                <Container sx={container2}>
                    <Container sx={container3and4}>
                    </Container>
                    <Typography sx={text1} variant="h4">
                        404
                    </Typography>
                    <Typography sx={text2} variant="h6"><b>Acesso negado! Clique no botão abaixo e faça login novamente.</b></Typography>
                    <Container sx={container3and4}>
                        <Button variant="contained" color="info" fullWidth sx={button} onClick={() => redirectHome()} >Acessar</Button>
                    </Container>
                </Container>
            </Container>
        </div>
    );

}




export default AccessDenied;
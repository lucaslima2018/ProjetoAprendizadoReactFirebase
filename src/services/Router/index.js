import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../../pages/Login';
import Home from '../../pages/Home';
import CadastroUsuario from '../../pages/CadastroUsuario';
import PerfilUsuario from '../../pages/PerfilUsuario';

import AccessDenied from '../../components/accessDenied';

import Private from './Private';

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/home' element={<Private><Home/></Private>} />
                <Route path='/cadastro' element={<Private><CadastroUsuario/></Private>} />
                <Route path='/perfil' element={<Private><PerfilUsuario/></Private>} />

                <Route path='accessDenied' element={<AccessDenied/>} />                               
            </Routes>
        </BrowserRouter>
    );
}
export default Router;
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import HomeAdmin from '../pages/HomeAdmin';
import CadastroUsuario from '../pages/CadastroUsuario';
import PerfilUsuarioAdmin from '../pages/PerfilUsuarioAdmin';
import ConfiguracoesDaContaAdmin from '../pages/ConfiguracoesDaContaAdmin';

import HomeUser from '../pages/HomeUser';
import PerfilUsuarioUser from '../pages/PerfilUsuarioUser';
import ConfiguracoesDaContaUser from '../pages/ConfiguracoesDaContaUser';

import Suporte from '../pages/Suporte';

import AccessDenied from '../components/accessDenied';

import Private from './Private';

const RoutesApp = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/homeadmin' element={<Private><HomeAdmin /></Private>} />
            <Route path='/cadastro' element={<Private><CadastroUsuario /></Private>} />
            <Route path='/perfiladmin' element={<Private><PerfilUsuarioAdmin /></Private>} />
            <Route path='/configuracoesadmin' element={<Private><ConfiguracoesDaContaAdmin /></Private>} />

            <Route exact path='/homeuser' element={<Private><HomeUser /></Private>} />
            <Route path='/perfiluser' element={<Private><PerfilUsuarioUser /></Private>} />
            <Route path='/configuracoesuser' element={<Private><ConfiguracoesDaContaUser /></Private>} />
            <Route path='/suporte' element={<Private><Suporte /></Private>} />

            <Route path='accessDenied' element={<AccessDenied />} />
        </Routes>
    );
}
export default RoutesApp;
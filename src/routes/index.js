import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import CadastroUsuario from '../pages/CadastroUsuario';
import PerfilUsuario from '../pages/PerfilUsuario';
import ConfiguracoesDaConta from '../pages/ConfiguracoesDaConta';

import AccessDenied from '../components/accessDenied';

import Private from './Private';

const RoutesApp = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Private><Home /></Private>} />
            <Route path='/cadastro' element={<CadastroUsuario />} />
            <Route path='/perfil' element={<Private><PerfilUsuario /></Private>} />
            <Route path='/configuracoes' element={<Private><ConfiguracoesDaConta /></Private>} />

            <Route path='accessDenied' element={<AccessDenied />} />
        </Routes>
    );
}
export default RoutesApp;
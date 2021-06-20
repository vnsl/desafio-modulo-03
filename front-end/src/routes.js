import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";

import React from "react";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import Produtos from "./pages/Produtos";
import EditarPerfil from "./pages/EditarPerfil";
import AdcProduto from "./pages/AdcProduto";
import EditarProduto from "./pages/EditarProduto";

import { AuthProvider } from './context/AuthContext';
import useAuth from './hook/useAuth';

function RotasProtegidas(props) {
    const { token } = useAuth();

    return (
        <Route 
            render={() => (token ? props.children : <Redirect to='/' />)}
        />
    );
}

function Routes() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/cadastro" component={Cadastro}/>
                    <RotasProtegidas>
                        <Route path="/perfil" exact component={Perfil}/>
                        <Route path="/perfil/editar" component={EditarPerfil}/>
                        <Route path="/produtos" exact component={Produtos}/>
                        <Route path="/produtos/novo" component={AdcProduto}/>
                        <Route path="/produtos/editar" component={EditarProduto}/>
                    </RotasProtegidas>
                </Switch>
            </Router>
        </AuthProvider>
    );
}


export default Routes;
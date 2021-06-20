import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hook/useAuth';
import './index.css';

import { ReactComponent as SairIcon } from '../../assets/close.svg';
import { ReactComponent as StoreIcon } from '../../assets/store.svg';
import { ReactComponent as UserIcon } from '../../assets/user.svg';

function SideBar() {

    const { deslogar } = useAuth();

    function logout() {
        deslogar();
      };

    return (
        <div className='sidebar'>
                <NavLink to='/perfil' activeClassName='ativa'><StoreIcon/></NavLink>
                <NavLink to='/produtos' activeClassName='ativa'><UserIcon/></NavLink>
                <a><SairIcon className='pointer' onClick={logout}></SairIcon></a>
        </div>
    )
};

export default SideBar;
import React, { useEffect } from 'react';
import useAuth from '../../hook/useAuth';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import './index.css';

function Perfil() {
  const { token, userPersistido, setUserPersistido } = useAuth();

  const { handleSubmit } = useForm();
  const history = useHistory();

  async function infoPerfil() {
    const resposta = await fetch('http://localhost:3000/perfil', {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await resposta.json();
  
    setUserPersistido(data);
    
  };

  useEffect(() => {
    infoPerfil();
  }, []);

  function onSubmit() {
    history.push('/perfil/editar');
  };

  return (
    <div className='container'>
      <SideBar></SideBar>
      <div className='perfil'>
        <Typography variant="h2">{userPersistido.nome_loja}</Typography>
        <Typography variant="h3">Perfil</Typography>
          <div className='textfield'>
          <TextField disabled label="Seu nome" type='text' defaultValue={userPersistido.nome}/>
          <TextField disabled label="Nome da loja" type='text' defaultValue={userPersistido.nome_loja}/>
          <TextField disabled label="E-mail" type='text' defaultValue={userPersistido.email}/>
          </div>
          <div className='botoes'>
            {/* <Button className='botao' variant='contained' color='primary' type='submit' onClick={handleSubmit(onSubmit)}>Editar perfil</Button> */}
            <Button className='botao' variant='contained' color='primary' type='submit' onClick={handleSubmit(onSubmit)}>Editar perfil</Button>
          </div>
      </div>
    </div>
  );
}

export default Perfil;
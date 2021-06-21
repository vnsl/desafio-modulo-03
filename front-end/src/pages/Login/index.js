import React , { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';
import './index.css';

import useStyles from './styles';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import useAuth from '../../hook/useAuth';

function Login() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { logar } = useAuth();

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');

    try {
      const resposta = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
      })
    
      const dados = await resposta.json();

      setCarregando(false);
      
      if (!resposta.ok) {
        setErro(dados);
        return;
      }

      logar(dados.token, dados.usuario);

      history.push('/perfil');
    } catch (error) {
      setErro(error.message)
    }
    
  };

  return (
    <div className='container-login'>
      <form 
        className={classes.root} 
        noValidate 
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='login'>
          <Typography variant="h4">Login</Typography>
          {carregando && <Loading/>}
          <TextField className='textarea' label="E-mail" {...register('email')} type='text'/>
          <TextField className='textarea' label="Senha" {...register('senha')} type='password'/>
          <Button variant='contained' color='primary' type='submit'>Entrar</Button>
          {erro && <Alert severity="error">{erro}</Alert>}
          <Typography variant="body1">Primeira vez aqui? <Link to='/cadastro'>CRIE UMA CONTA</Link></Typography>

        </div>
      </form>
    </div>
  );
}

export default Login;
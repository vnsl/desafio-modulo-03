import React , { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

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

  const { setToken } = useAuth();

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

      setToken(dados.token);

      history.push('/produtos');
    } catch (error) {
      setErro(error.message)
    }
    
  };

  return (
    <form 
      className={classes.root} 
      noValidate 
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      
      <Typography variant="h4">Login</Typography>
      {carregando && <CircularProgress color="secondary" />}
      <TextField label="E-mail" {...register('email')} type='text'/>
      <TextField label="Senha" {...register('senha')} type='password'/>
      <Button variant='contained' color='primary' type='submit'>Entrar</Button>
      {erro && <Alert severity="error">{erro}</Alert>}
      <Typography variant="body1">Cadastre-se agora... <Link to='/cadastro'>Cadastro!</Link></Typography>
    </form>
  );
}

export default Login;
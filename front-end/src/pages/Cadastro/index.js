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

function Cadastro() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');

    if (data.senha !== data.senhaValidar) {
      setErro('Senhas não conferem');
      setCarregando(false);
      return;
    }

    try {
      const resposta = await fetch('http://localhost:3000/cadastro', {
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

      history.push('/');
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
      <Typography variant="h4">Criar uma conta</Typography>
      {carregando && <CircularProgress color="secondary" />}
      <TextField label="Nome" {...register('nome')} type='text'/>
      <TextField label="Nome da loja" {...register('nome_loja')} type='text'/>
      <TextField label="E-mail" {...register('email')} type='text'/>
      <TextField label="Senha" {...register('senha')} type='password'/>
      <TextField label="Repita a senha" {...register('senhaValidar')} type='password'/>
      <Button variant='contained' color='primary' type='submit'>CRIAR CONTA</Button>
      {erro && <Alert severity="error">{erro}</Alert>}
      <Typography variant="p">Acesse agora<Link to='/'>Acesse</Link></Typography>
    </form>
  );
}

export default Cadastro;
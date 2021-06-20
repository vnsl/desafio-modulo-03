import React , { useState } from 'react';
import useAuth from '../../hook/useAuth';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

import useStyles from './styles';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

function AdcProduto() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);
  const { token, userPersistido, setProdutos, produtos } = useAuth();

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');

    try {
      const resposta = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      const dados = await resposta.json();
      
      setCarregando(false);
      
      if (!resposta.ok) {
        setErro(dados);
        return;
      }

      if (resposta.ok) {
        const resposta2 = await fetch('http://localhost:3000/produtos', {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          const data2 = await resposta2.json();
        
          setProdutos(data2);
      }
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
      <Typography variant="h1">{userPersistido.nome_loja}</Typography>
      <Typography variant="h3">Adicionar produto</Typography>
      {carregando && <CircularProgress color="secondary" />}
      <TextField label="Nome do produto" {...register('nome')} type='text'/>
      <TextField label="Preco" {...register('preco')} type='text'/>
      <TextField label="Estoque" {...register('estoque')} type='text'/>
      <TextField label="Descrição" {...register('descricao')} type='text'/>
      <TextField label="Imagem" {...register('imagem')} type='text'/>
      <div>
        <Typography variant="p"><Link to='/produtos'>CANCELAR</Link></Typography>
        <Button variant='contained' color='primary' type='submit'>ADICIONAR PRODUTO</Button>
      </div>
      {erro && <Alert severity="error">{erro}</Alert>}
    </form>
  );
}

export default AdcProduto;
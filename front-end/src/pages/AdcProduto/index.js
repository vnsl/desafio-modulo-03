import React , { useState } from 'react';
import useAuth from '../../hook/useAuth';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Loading from '../../components/Loading';
import SideBar from '../../components/SideBar';
import { Link } from 'react-router-dom';

import './index.css';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

function AdcProduto() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);
  const { token, userPersistido, setProdutos } = useAuth();

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
    <div className='container'>
      <SideBar/>
      <form 
        className='perfil' 
        noValidate 
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='perfil-content'>
          <Typography variant="h2">{userPersistido.nome_loja}</Typography>
          <Typography variant="h3">Adicionar produto</Typography>
          {carregando && <Loading/>}
        </div>
        <div className='textfield'>
          <TextField label="Nome do produto" {...register('nome')} type='text'/>
          <div className='together'>
            <TextField label="Preco" {...register('preco')} type='text'/>
            <TextField label="Estoque" {...register('estoque')} type='text'/>
          </div>
          <TextField label="Descrição" {...register('descricao')} type='text'/>
          <TextField label="Imagem" {...register('imagem')} type='text'/>
        </div>
        <div className='botoes'>
          <Typography variant="p"><Link to='/produtos'>CANCELAR</Link></Typography>
          <Button variant='contained' color='primary' type='submit'>ADICIONAR PRODUTO</Button>
          {erro && <Alert severity="error">{erro}</Alert>}
        </div>
      </form>
    </div>
  );
}

export default AdcProduto;
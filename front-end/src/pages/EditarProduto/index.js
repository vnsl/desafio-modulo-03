import React , { useState, useEffect } from 'react';
import useAuth from '../../hook/useAuth';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Loading from '../../components/Loading';
import SideBar from '../../components/SideBar';
import { Link, useLocation, useHistory } from 'react-router-dom';

import './index.css';

import { useForm } from 'react-hook-form';

function EditarProduto() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [ erro, setErro ] = useState('');
  const [ carregando, setCarregando ] = useState(false);
  const { token, userPersistido, setProdutos, produto, setProduto } = useAuth();

  const caminho = useLocation().pathname.slice(0, -7);


  async function listarProduto() {
    setCarregando(true);
    
    const resposta2 = await fetch(`http://localhost:3000${caminho}`, {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data2 = await resposta2.json();

    console.log(data2[0]);
    setProduto(data2[0]);
    setCarregando(false);

    if (!resposta2.ok) {
      setErro(data2);
      return;
    }
  };

  useEffect(() => {
    listarProduto();
  }, []);

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');

    try {
      const resposta = await fetch(`http://localhost:3000${caminho}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      
      const dados = await resposta.json();
      
      if (!resposta.ok) {
        setErro(dados);
        return;
      }

      setProdutos(dados);

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
          <Typography variant="h3">Editar produto</Typography>
          {carregando && <Loading/>}
        </div>
        <div className='sided'>
            <div className='textfield'>
              <TextField label="Nome do produto" {...register('nome')} defaultValue={produto.nome} type='text'/>
              <div className='together'>
                <TextField label="Preco" {...register('preco')} defaultValue={produto.preco} type='text'/>
                <TextField label="Estoque" {...register('estoque')} defaultValue={produto.estoque} type='text'/>
              </div>
              <TextField label="Descrição do produto" {...register('descricao')} defaultValue={produto.descricao} type='text'/>
              <TextField disabled label="Dono do produto" {...register('usuario_id')} defaultValue={userPersistido.nome} type='text'/>
              <TextField label="Imagem" {...register('imagem')} defaultValue={produto.imagem} type='text'/>
            </div>
          <div>
            <img src={produto.imagem}></img>
          </div>

        </div>
        <div className='botoes'>
          <Typography variant="p"><Link to='/produtos'>CANCELAR</Link></Typography>
          <Button variant='contained' color='primary' type='submit'>EDITAR PRODUTO</Button>
          {erro && <Alert severity="error">{erro}</Alert>}
        </div>
      </form>
    </div>
  );
}

export default EditarProduto;
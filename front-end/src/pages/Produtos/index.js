import React, { useState, useEffect } from 'react';
import useAuth from '../../hook/useAuth';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading';
import Card from '../../components/Card';
import SideBar from '../../components/SideBar';

import './index.css';

function Produtos() {
  const { token, userPersistido, produtos, setProdutos } = useAuth();
  const [carregando, setCarregando] = useState(false);
  const [presente, setPresente] = useState(false);
  const history = useHistory();

  function clicado() {
    history.push('/produtos/novo')
  }
  
  async function listarProdutos() {
    setCarregando(true);
    
    const resposta = await fetch('http://localhost:3000/produtos', {
      method: 'GET',
      body: JSON.stringify(),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await resposta.json();
  
    setProdutos(data);
    setCarregando(false);
    if (resposta.ok) {
      setPresente(true);
    }
  };

  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <div className='container'>
      <SideBar/>
      <div className='perfil'>
        {carregando && <Loading/>}
        <div className='perfil2'>
          <Typography variant="h2">{userPersistido.nome_loja}</Typography>
          <Typography variant="h3">Seus Produtos</Typography>
          <div className='cards'>
            {presente ? produtos.map(produto => Card(produto)) : <Typography className='text' variant="h4">Cadastre um novo produto.</Typography>}
          </div>
        </div>
        <div className='botoes'>
          <Button variant='contained' color='primary' type='submit' onClick={clicado}>ADICIONAR PRODUTO</Button>
        </div>
      </div>
    </div>
  );
}

export default Produtos;
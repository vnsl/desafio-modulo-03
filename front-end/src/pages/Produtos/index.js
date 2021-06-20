import React, { useState, useEffect } from 'react';
import useAuth from '../../hook/useAuth';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Modal from '../../components/Modal';

import useStyles from './styles';

function Produtos() {
  const { token, userPersistido, produtos, setProdutos } = useAuth();
  const classes = useStyles();

  async function listarProdutos() {
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
    
  };

  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <div>
      <div>
        <h1>Claro</h1>
      </div>
      <div>
      <Typography variant="h1">{userPersistido.nome_loja}</Typography>
      <Typography variant="h3">Seus Produtos</Typography>
      <h1>{produtos.map(produto => 
        <Card className={classes.root}>
        <CardActionArea>
          {/* <Link underline='none' to='/produtos/editar'> */}
          <DeleteIcon>
            <Modal nome={produto.nome}/>
          </DeleteIcon>
          <CardMedia
            className={classes.media}
            image={produto.imagem}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {produto.nome}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {produto.descricao}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography>{produto.estoque}</Typography>
          <Typography>{produto.preco}</Typography>
          <Button type='submit'><Modal></Modal></Button>
        </CardActions>
      </Card>
      )}</h1>
    
      <TextField label="E-mail" type='text'/>
      <Button variant='contained' color='primary' type='submit'><Link to='/produtos/novo'>ADICIONAR PRODUTO</Link></Button>
      {/* <Button variant='contained' color='primary' type='submit'><Link to='/produtos/editar'>EDITAR PRODUTO</Link></Button> */}
      <Button variant='contained' color='primary' type='submit'><Modal></Modal></Button>
      </div>
    </div>
  );
}

export default Produtos;
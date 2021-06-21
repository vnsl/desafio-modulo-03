import React from 'react';
import Modal from '../Modal';

import './index.css';
import { Link } from 'react-router-dom';

export default function Card(produto) {

  const caminho = `/produtos/${produto.id}/editar`; 

  return (
    <div className='card'>
      <button className='cardDelete'><Modal id={produto.id}/></button>
      <Link to={caminho}>
        <img src={produto.imagem}/>
        <div className='cardInfo'>
          <h4 className='cardTitle'>{produto.nome}</h4>
          <p className='cardDesc'>{produto.descricao}</p>
          <div className='cardFooter'>
            <p className='cardQt'>{produto.estoque}</p>
            <p className='cardPreco'>{produto.preco}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import useAuth from '../../hook/useAuth';
import Alert from '@material-ui/lab/Alert';

import './index.css';

export default function Modal(info) {
  const [open, setOpen] = React.useState(false);
  const [ erro, setErro ] = useState('');
  const { token, setProdutos } = useAuth();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleExcluir() {
    const id = info.id.toString();
    setErro('');
    
    try {
      const resposta = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const dados = await resposta.json();
      
      if (!resposta.ok) {
        setErro(dados);
        return;
      }
      
      const resposta2 = await fetch('http://localhost:3000/produtos', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await resposta2.json();
      
      setProdutos(data);
      setOpen(false);
      
    } catch (error) {
      setErro(error.message)
    }
  };
  
  return (
    <div>
      <DeleteIcon onClick={handleClickOpen}></DeleteIcon>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Deseja excluir este produto?"}</DialogTitle>
          <div>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleExcluir} color="primary" autoFocus>
              Excluir
            </Button>
            {erro && <Alert severity="error">{erro}</Alert>}
          </div>
      </Dialog>
    </div>
  );
}

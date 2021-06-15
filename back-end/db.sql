create database market_cubos;

drop table usuarios if exists;

create table usuarios (
  id serial primary key,
  nome varchar(60) NOT NULL,
  nome_loja text,
  email integer NOT NULL,
  senha varchar(20) NOT NULL,
);

drop table produtos if exists;

create table produtos (
  id serial NOT NULL primary key,
  usuario_id serial NOT NULL references usuarios(id),
  nome varchar(60) NOT NULL,
  estoque integer NOT NULL,
  categoria varchar(20) NOT NULL,
  preco integer NOT NULL,
  descricao text,
  imagem text,
);

insert usuarios values (
    $1,
    $2,
    $3,
    $4
);

insert produtos values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
);
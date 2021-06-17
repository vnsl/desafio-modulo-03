create database market_cubos;

drop table usuarios if exists;

create table usuarios (
  id serial primary key,
  nome varchar(60) NOT NULL,
  nome_loja text,
  email text NOT NULL unique,
  senha text NOT NULL
);

drop table produtos if exists;

create table produtos (
  id serial primary key,
  usuario_id integer NOT NULL,
  nome varchar(60) NOT NULL,
  estoque integer NOT NULL,
  categoria varchar(20) NOT NULL,
  preco integer NOT NULL,
  descricao text,
  imagem text,
  foreign key (usuario_id) references usuarios (id)
);
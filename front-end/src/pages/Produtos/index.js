import useAuth from '../../hook/useAuth';

function Produtos() {
  const { token } = useAuth();

  return (
    <h1>{token}</h1>
  );
}

export default Produtos;
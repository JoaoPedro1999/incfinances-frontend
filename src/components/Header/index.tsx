import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const { signOut } = useAuth();

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <div>
          <nav>
            <Link to="/dashboard">Listagem</Link>
            <Link to="/transaction">Nova Transação</Link>
            <Link to="/profile">Perfil</Link>
          </nav>
          <button onClick={signOut} type="button">
            Sair
          </button>
        </div>
      </header>
    </Container>
  );
};

export default Header;

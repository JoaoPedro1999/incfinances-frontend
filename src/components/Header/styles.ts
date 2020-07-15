import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #020100;
  padding: 30px 0;

  header {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 250px;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      nav {
        a {
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          transition: opacity 0.2s;

          & + a {
            margin-left: 32px;
          }

          &:hover {
            opacity: 0.9;
            border-bottom: 2px solid #41287b;
            padding-bottom: 10px;
          }
        }
      }

      button {
        margin-left: 32px;
        padding: 16px;
        font-size: 16px;
        color: #fff;
        background: #41287b;
        border: none;
        border-radius: 8px;
      }
    }
  }
`;

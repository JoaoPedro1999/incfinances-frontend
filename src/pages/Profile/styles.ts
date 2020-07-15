import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: flex-start;
  margin: -35px auto 0;

  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 28px;
      text-align: center;
      color: #41287b;
    }

    input[name='oldPassword'] {
      margin-top: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

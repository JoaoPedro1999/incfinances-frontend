import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #41287b;
  color: #fdfffc;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background 0.2s;

  &:hover {
    background: ${shade(0.2, '#41287b')};
  }
`;

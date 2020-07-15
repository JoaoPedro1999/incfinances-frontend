import styled, { css } from 'styled-components';
import ReactSelect from 'react-select';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused?: boolean;
  isFilled?: boolean;
  isErrored?: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #020100;
  border-radius: 10px;
  border: 2px solid #020100;
  padding: 8px 16px 8px 16px;
  width: 100%;
  color: #666360;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      color: #c53030;
      border: 2px solid #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #41287b;
      border: 2px solid #41287b;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #41287b;
    `}

  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const RSelect = styled(ReactSelect)`
  flex: 1;
  background-color: #020100;

  &::placeholder {
    color: #666360;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

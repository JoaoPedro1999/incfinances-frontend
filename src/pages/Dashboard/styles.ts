import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 32px;
  margin-top: -150px;
`;

export const Card = styled.div`
  background: ${({ total }: CardProps): string =>
    total ? '#41287B' : '#020100'};
  padding: 22px 32px;
  border: 1px solid #41287b;
  border-radius: 5px;
  color: ${({ total }: CardProps): string => (total ? '#F1E9DA' : '#F1E9DA')};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`;

export const TableContainer = styled.section`
  margin-top: 64px;
  overflow-x: auto;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #f1e9da;
      font-weight: normal;
      padding: 20px 32px;
      text-align: center;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #020100;
      font-size: 16px;
      font-weight: normal;
      text-align: center;
      color: #f1e9da;

      &.title {
        color: #41287b;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }
    }
    td:first-child {
      border-radius: 8px 0 0 8px;
    }
    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;

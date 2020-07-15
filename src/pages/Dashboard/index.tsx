import React, { useEffect, useState } from 'react';
import {
  FiArrowUpCircle,
  FiArrowDownCircle,
  FiCheckCircle,
} from 'react-icons/fi';
import { parseISO, format } from 'date-fns';

import Header from '../../components/Header';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface FormattedBalance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<FormattedBalance>(
    {} as FormattedBalance
  );

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const { data } = await api.get<Transaction[]>('/transactions');

      const formattedTransactions = data.map((transaction) => {
        const parsedDate = parseISO(transaction.created_at);
        const formattedDate = format(parsedDate, 'dd/MM/YYY');

        const formattedValue = formatValue(transaction.value);

        return { ...transaction, formattedValue, formattedDate };
      });

      setTransactions(formattedTransactions);
    }

    loadTransactions();
  }, []);

  useEffect(() => {
    async function loadBalance(): Promise<void> {
      const { data } = await api.get<Balance>('/balance');

      const userBalance = data;

      const formattedBalance = {
        income: formatValue(userBalance.income),
        outcome: formatValue(userBalance.outcome),
        total: formatValue(userBalance.total),
      };

      setBalance(formattedBalance);
    }

    loadBalance();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <FiArrowUpCircle size={32} />
            </header>
            <h1>{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <FiArrowDownCircle size={32} />
            </header>
            <h1>{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <FiCheckCircle size={32} />
            </header>
            <h1>{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.type === 'outcome'
                      ? ` - ${transaction.formattedValue}`
                      : transaction.formattedValue}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{transaction.formattedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;

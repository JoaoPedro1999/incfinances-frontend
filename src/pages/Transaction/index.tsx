import React, { useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { MdCompareArrows } from 'react-icons/md';
import { FiDollarSign, FiEdit, FiList } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import getValidationsErros from '../../utils/getValidationErrors';

import InputSelect from '../../components/InputSelect';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';

import { Container } from './styles';
import api from '../../services/api';

const optionsTransactions = [
  { value: 'income', label: 'Entrada' },
  { value: 'outcome', label: 'Saida' },
];

interface TransactionFormData {
  title: string;
  category: string;
  type: 'income' | 'outcome';
  value: number;
}

const Transaction: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async ({ category, title, type, value }: TransactionFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          category: Yup.string().required(
            'A categoria da transação é obrigatória'
          ),
          title: Yup.string().required('O titulo da transação é obrigatório'),
          type: Yup.string().required('O tipo da transação é obrigatório'),
          value: Yup.number()
            .positive()
            .required('O valor da transação é obrigatório'),
        });

        await schema.validate(
          { category, title, type, value },
          {
            abortEarly: false,
          }
        );

        api.post('/transactions', { category, title, type, value });

        addToast({
          type: 'success',
          title: 'Transação incluida com sucesso!',
        });

        history.push('dashboard');
      } catch (err) {
        if (err instanceof Error) {
          addToast({
            type: 'error',
            title: 'Erro na transação',
            description: 'Confira seu saldo e tente novamente!',
          });
        }

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErros(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [addToast, history]
  );

  return (
    <>
      <Header size="small" />
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Nova Transação</h1>
          <Input
            icon={FiEdit}
            name="title"
            placeholder="Digite o nome da sua transação"
          />
          <Input
            icon={FiList}
            name="category"
            placeholder="Digite a categoria da sua transação"
          />
          <InputSelect
            icon={MdCompareArrows}
            name="type"
            placeholder="Qual o tipo da transação?"
            options={optionsTransactions}
          />
          <Input
            icon={FiDollarSign}
            name="value"
            placeholder="Digite o valor da sua transação"
            inputMode="numeric"
          />

          <Button type="submit">Adicionar Transação</Button>
        </Form>
      </Container>
    </>
  );
};

export default Transaction;

import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiUser, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import getValidationsErros from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import { Container } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';

interface ProfileFormData {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  password_confirmation?: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string()
              .min(6, 'No minimo 6 digitos')
              .required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Confirmação Incorreta')
            .when('password', {
              is: (val) => !!val.length,
              then: Yup.string()
                .required('Campo obrigatório')
                .min(6, 'No minimo 6 digitos'),
              otherwise: Yup.string(),
            }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          email,
          name,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          email,
          name,
          ...(data.old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizados com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErros(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização do perfil',
          description: 'Ocorreu um erro, cheque seus dados!',
        });
      }
    },
    [addToast, updateUser, history]
  );

  return (
    <>
      <Header size="small" />
      <Container>
        <Form ref={formRef} initialData={user} onSubmit={handleSubmit}>
          <h1>Meu Perfil</h1>
          <Input name="name" icon={FiUser} placeholder="Nome completo" />
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />
          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confrimar senha"
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Container>
    </>
  );
};

export default Profile;

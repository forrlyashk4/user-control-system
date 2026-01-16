import React from "react";
import { onSuccessLogin, useAuth } from "../model";
import { Button, Typography, Form, FormProps, Input, notification } from "antd";
import styled from "styled-components";

const { Title } = Typography;

type AuthFormProps = {
  onRedirect: () => void;
};

type FieldType = {
  username?: string;
  password?: string;
};

type AntdFormProps = React.ComponentProps<typeof Form>;

const StyledForm = styled(Form)<AntdFormProps>`
  width: 320px;

  h5,
  .ant-typography {
    font-weight: 400;
    margin-bottom: 15px;
  }

  .ant-form-item-control {
    min-width: 100%;
  }

  .ant-form-item:last-child {
    text-align: right;
  }
`;

export const AuthForm: React.FC<AuthFormProps> = ({ onRedirect }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (errorMsg: string) => {
    api.open({
      message: errorMsg,
      duration: 5,
    });
  };

  const { mutate, isPending } = useAuth();

  const onSubmit: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(
      { login: values.username || "", password: values.password || "" },
      {
        onSuccess: (response) => onSuccessLogin(response, onRedirect),
        onError: (error) => {
          openNotification(error.response.data.message);
        },
      }
    );
  };

  return (
    <>
      {contextHolder}
      <StyledForm
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(values) => onSubmit(values as FieldType)}
        autoComplete="off"
      >
        <Title level={5}>Авторизация </Title>
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: "Введите свой логин" }]}
        >
          <Input placeholder="Логин" />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Введите свой пароль" }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isPending}>
            Войти
          </Button>
        </Form.Item>
      </StyledForm>
    </>
  );
};

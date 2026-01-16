import React from "react";
import { Form, Input, Modal } from "antd";
import { styled } from "styled-components";
import { useCreateUser } from "@/entities";

type FieldType = {
  name?: string;
  avatar?: string;
};

type AntdFormProps = React.ComponentProps<typeof Form>;

const StyledForm = styled(Form)<AntdFormProps>`
  width: 100%;
  margin-top: 15px;

  h5,
  .ant-typography {
    font-weight: 400;
    margin-bottom: 15px;
  }

  .ant-form-item-control {
    min-width: 100%;
  }
`;

export default function AddUser({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [form] = Form.useForm();
  const [errors, setErrors] = React.useState<string[]>([]);
  const { mutate } = useCreateUser();

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        mutate(values, {
          onSuccess: () => {
            form.resetFields();
            setIsOpen(false);
          },
          onError: (err) => {
            setErrors([err.message]);
          },
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <Modal
      title="Создание пользователя"
      destroyOnHidden
      open={isOpen}
      onOk={handleOk}
      okText="Создать"
      onCancel={() => setIsOpen(false)}
      cancelText="Отмена"
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <OkBtn />
          <CancelBtn />
        </>
      )}
    >
      <StyledForm
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(values) => console.log(values)}
        autoComplete="off"
        form={form}
      >
        <Form.Item<FieldType>
          name="name"
          rules={[{ required: true, message: "Введите имя" }]}
          label="Имя"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          name="avatar"
          rules={[{ required: true, message: "Введите ссылку на аватар" }]}
          label="Ссылка на аватарку"
        >
          <Input />
        </Form.Item>
        <Form.ErrorList errors={errors}></Form.ErrorList>
      </StyledForm>
    </Modal>
  );
}

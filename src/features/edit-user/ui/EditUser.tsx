import React from "react";
import { Button, Form, Input, Modal } from "antd";
import { styled } from "styled-components";
import { useDeleteUser, useEditUser, User, DeleteUserDto } from "@/entities";

type FieldType = {
  id?: string;
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

export default function EditUser({
  user,
  isOpen,
  setIsOpen,
}: {
  user: User | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [form] = Form.useForm();
  const [errors, setErrors] = React.useState<string[]>([]);
  const { mutate: mutateEdit, isPending: isEditPending } = useEditUser();
  const { mutate: mutateDel, isPending: isDeletePending } = useDeleteUser();

  const isLoading = isEditPending || isDeletePending;

  React.useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  }, [user]);

  function handleOk() {
    form
      .validateFields()
      .then((values) => {
        mutateEdit(values, {
          onSuccess: () => {
            form.resetFields();
            setIsOpen(false);
          },
          onError: (err) => {
            setErrors([err.message]);
          },
        });
      })
      .catch((err) => err);
  }

  function handleDelete(user: DeleteUserDto) {
    if (!user.id) return;

    mutateDel(user, {
      onSuccess: () => {
        form.resetFields();
        setIsOpen(false);
      },
      onError: (err) => {
        setErrors([err.message]);
      },
    });
  }

  return (
    <Modal
      title="Редактирование пользователя"
      destroyOnHidden
      open={isOpen}
      footer={() => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="primary"
            disabled={isLoading}
            onClick={() => user?.id && handleDelete({ id: user.id })}
          >
            Удалить
          </Button>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button type="primary" disabled={isLoading} onClick={handleOk}>
              Сохранить
            </Button>
            <Button
              type="primary"
              disabled={isLoading}
              onClick={() => setIsOpen(false)}
            >
              Отмена
            </Button>
          </div>
        </div>
      )}
      closable={!isLoading}
      maskClosable={!isLoading}
      keyboard={!isLoading}
      confirmLoading={isEditPending}
    >
      <StyledForm
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
        disabled={isLoading}
      >
        <Form.Item<FieldType>
          name="id"
          rules={[{ required: true, message: "id" }]}
          label="id"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item<FieldType>
          name="name"
          rules={[{ required: true, message: "Введите имя" }]}
          label="Имя"
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          name="avatar"
          rules={[
            { required: true, message: "Введите ссылку на аватар" },
            { type: "url", message: "Введите корректную ссылку" },
          ]}
          label="Ссылка на аватарку"
        >
          <Input />
        </Form.Item>
        <Form.ErrorList errors={errors}></Form.ErrorList>
      </StyledForm>
    </Modal>
  );
}

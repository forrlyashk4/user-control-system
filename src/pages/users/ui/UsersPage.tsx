import React from "react";
import {
  Avatar,
  Button,
  Flex,
  List,
  type ListProps,
  type FlexProps,
} from "antd";
import dayjs from "dayjs";
import { useUsersQuery } from "@/entities";
import { styled } from "styled-components";
import { User } from "@/entities/user/model";
import { onLogout } from "@/features/auth";
import { useNavigate } from "react-router-dom";
import { AddUser } from "@/features/add-user";
import { EditUser } from "@/features/edit-user";

const StyledFlex = styled(Flex)<FlexProps>`
  width: 512px;
  margin: 0 auto;

  .logout-button {
    align-self: flex-end;
    margin: 15px 0;
  }

  .create-button {
    align-self: flex-start;
    margin: 15px 0;
  }
`;

const StyledList = styled(List)<ListProps<User>>`
  width: 512px;

  .user-item-name {
    cursor: pointer;
  }

  .ant-avatar {
    cursor: pointer;
  }
`;

export function UsersPage() {
  const nav = useNavigate();
  const { data, isLoading } = useUsersQuery();

  function logoutRedirect() {
    nav("/login", { replace: true });
  }

  const [isCreateModal, setCreateModal] = React.useState(false);

  const [isEditModal, setEditModal] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<User | undefined>();

  function openEditModal(user: User) {
    setCurrentUser(user);
    setEditModal(true);
  }

  function openCreateModal() {
    setCreateModal(true);
  }

  return (
    <>
      <AddUser isOpen={isCreateModal} setIsOpen={setCreateModal} />
      <EditUser
        user={currentUser}
        isOpen={isEditModal}
        setIsOpen={setEditModal}
      />
      <StyledFlex justify="center" align="center" vertical>
        <Button
          className="logout-button"
          type="primary"
          onClick={() => onLogout(logoutRedirect)}
        >
          Выход
        </Button>
        <StyledList
          itemLayout="horizontal"
          dataSource={data}
          loading={isLoading}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    onClick={() => openEditModal(item)}
                    src={item.avatar}
                  />
                }
                title={
                  <span
                    onClick={() => openEditModal(item)}
                    className="user-item-name"
                  >
                    {item.name}
                  </span>
                }
                description={dayjs(item.createdAt).format("DD.MM.YYYY")}
              />
            </List.Item>
          )}
        />
        <Button
          className="create-button"
          type="primary"
          onClick={openCreateModal}
        >
          Создать пользователя
        </Button>
      </StyledFlex>
    </>
  );
}

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
import { useUsersQuery } from "@/app/entities";
import { styled } from "styled-components";
import { User } from "@/app/entities/user/model";
import { onLogout } from "@/features/auth";
import { useNavigate } from "react-router-dom";

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

function openEditModal() {
  console.log("edit modal opened");
}

function openCreateModal() {
  console.log("create modal opened");
}

export function UsersPage() {
  const nav = useNavigate();
  const { data, isLoading } = useUsersQuery();

  function logoutRedirect() {
    nav("/login", { replace: true });
  }

  return (
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
              avatar={<Avatar onClick={openEditModal} src={item.avatar} />}
              title={
                <span onClick={openEditModal} className="user-item-name">
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
  );
}

export type User = {
  createdAt: string;
  name: string;
  avatar: string;
  id: string;
};

export type CreateUserDto = {
  name: string;
  avatar: string;
};

export type EditUserDto = {
  id: string;
  name: string;
  avatar: string;
};

export type DeleteUserDto = {
  id: string;
};

export type ApiError = {
  message: string;
};

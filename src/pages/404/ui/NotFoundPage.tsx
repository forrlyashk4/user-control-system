import React from "react";
import { Result } from "antd";

export const NotFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Страница, на которую вы попали не существует."
  />
);

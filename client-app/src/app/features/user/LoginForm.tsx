import { AxiosResponse } from "axios";
import React, { FormEvent, useContext, useState } from "react";
import { Button, Form, Header } from "semantic-ui-react";
import ErrorMessage from "../../common/forms/ErrorMessage";
import { IUserFormValues } from "../../models/User";
import { RootStoreContext } from "../../store/rootStore";

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  const [userForm, setUserForm] = useState<IUserFormValues>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<AxiosResponse>();

  const handleSubmit = () => {
    login(userForm).catch((error) => {
      setError(error);
    });
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setUserForm({ ...userForm, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit} error>
      <Header
        as="h2"
        content="Login to Reactivities"
        textAlign="center"
        color="teal"
      />
      <Form.Input
        name="email"
        onChange={handleInputChange}
        placeholder="Email"
      />
      <Form.Input
        name="password"
        type="password"
        onChange={handleInputChange}
        placeholder="Password"
      />
      {error && (
        <ErrorMessage error={error} text="Invalid username or password" />
      )}

      <Button
        fluid
        disabled={!userForm.email || !userForm.password}
        color="teal"
        content="Login"
      />
    </Form>
  );
};

export default LoginForm;

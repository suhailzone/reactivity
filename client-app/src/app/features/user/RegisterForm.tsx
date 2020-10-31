import { AxiosResponse } from "axios";
import React, { FormEvent, useContext, useState } from "react";
import { Button, Form, Header } from "semantic-ui-react";
import ErrorMessage from "../../common/forms/ErrorMessage";
import { IUserFormValues } from "../../models/User";
import { RootStoreContext } from "../../store/rootStore";

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;

  const [userForm, setUserForm] = useState<IUserFormValues>({
    email: "",
    displayName: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState<AxiosResponse>();

  const handleSubmit = () => {
    register(userForm).catch((error: AxiosResponse) => {
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
        content="Signup to Reactivities"
        textAlign="center"
        color="teal"
      />
      <Form.Input
        name="username"
        onChange={handleInputChange}
        placeholder="Username"
      />
      <Form.Input
        name="displayName"
        onChange={handleInputChange}
        placeholder="Display Name"
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
      {error && <ErrorMessage error={error} />}

      <Button
        fluid
        disabled={!userForm.email || !userForm.password}
        color="teal"
        content="Register"
      />
    </Form>
  );
};

export default RegisterForm;

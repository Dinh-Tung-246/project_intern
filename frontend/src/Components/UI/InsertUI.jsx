import React from "react";
import { Button, Form } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

const InsertUI = ({ handleSubmit, formData, setFormData }) => {
  return (
    <Form className="form-insert" onSubmit={handleSubmit}>
      <h1>Create new user</h1>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password Confirm</Form.Label>
        <Form.Control
          type="password"
          value={FormData.passwordConfirm}
          onChange={(e) =>
            setFormData({ ...formData, passwordConfirm: e.target.value })
          }
          placeholder="Password"
        />
      </Form.Group>
      <Form.Label>Role</Form.Label>
      <Form.Select
        aria-label="Default select example"
        onChange={(e) =>
          setFormData({ ...formData, role: { id: e.target.value } })
        }
      >
        <option hidden>Choose your role</option>
        <option value="1">Root</option>
        <option value="2">Admin</option>
        <option value="3">User</option>
        <option value="4">Quest</option>
      </Form.Select>
      <Button variant="primary" className="submit" type="submit">
        Submit
        <Toaster />
      </Button>
      <Button
        variant="secondary"
        className="clear"
        onClick={() => {
          setFormData({
            username: "",
            password: "",
            role: {
              id: "",
            },
          });
        }}
        type="reset"
      >
        Clear
      </Button>
      <Button variant="danger" className="back" href="/list">
        Back
      </Button>
    </Form>
  );
};

export default InsertUI;

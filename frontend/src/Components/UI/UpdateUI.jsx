import React from "react";
import { Button, Form } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

const UpdateUI = ({
  handleSubmitUpdate,
  username,
  setUsername,
  handleOptionChange,
  selectedOption,
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
}) => {
  return (
    <div onSubmit={handleSubmitUpdate}>
      <Form className="formUpdate">
        <h1>Update Users</h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>ID:</Form.Label>
          <Form.Control
            type="text"
            value={sessionStorage.getItem("userId")}
            readOnly
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="user name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="radiocheck">
          <Form.Check
            reverse
            name="group1"
            type="radio"
            value="option1"
            onChange={handleOptionChange}
            label="Don't change password"
            checked={selectedOption === "option1"}
          />
          <Form.Check
            reverse
            name="group1"
            value="option2"
            onChange={handleOptionChange}
            type="radio"
            label="Change password"
            checked={selectedOption === "option2"}
          />
        </Form.Group>
        {selectedOption === "option1" ? (
          ""
        ) : (
          <div>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>New password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="new password"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Confirm new password: </Form.Label>
              <Form.Control
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="password confirm"
              />
            </Form.Group>
          </div>
        )}
        <Button type="submit" variant="outline-danger">
          Update
          <Toaster />
        </Button>
        <Button className="back" variant="success" href="/list">
          Back to List
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUI;

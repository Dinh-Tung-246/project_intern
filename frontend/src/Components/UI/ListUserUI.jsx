import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { fetchCount } from "../ConstApi/ConstApi";
import { Toaster } from "react-hot-toast";

const arrayData = Array(10)
  .fill(0)
  .map((_, i) => i + 1);
export const ListUserUI = ({
  size,
  handleSubmit,
  username,
  setUsername,
  firstdate,
  setFirstDate,
  lastdate,
  setLastDate,
  users,
  handleHrefUpdate,
  handleClickDelete,
  tokenType,
  token,
  setCount,
  count,
  setTotalPage,
  HandleClickPrev,
  page,
  totalPage,
  HandleClickNext,
  setSize,
}) => {
  useEffect(() => {
    const fetch = async () => {
      setCount(await fetchCount(tokenType, token));
    };
    fetch();
    if (count % size === 0) {
      setTotalPage(count / size);
    } else {
      setTotalPage(Math.floor(count / size) + 1);
    }
  });

  return (
    <div className="list">
      <h1>List of Users</h1>
      <Form className="formSearch" onSubmit={handleSubmit}>
        <Form.Group
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>User name:</Form.Label>
          <Form.Control type="text" placeholder="user name" />
        </Form.Group>
        <Form.Group
          value={firstdate}
          onChange={(e) => setFirstDate(e.target.value)}
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>The first date: </Form.Label>
          <Form.Control type="date" placeholder="create date" />
        </Form.Group>
        <Form.Group
          value={lastdate}
          onChange={(e) => setLastDate(e.target.value)}
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>The last date:</Form.Label>
          <Form.Control type="date" placeholder="create date" />
        </Form.Group>
        <Button type="submit" variant="outline-success">
          Search
        </Button>
        <Button type="reset" variant="outline-info">
          Clear
        </Button>
      </Form>

      <Button className="btn-insert" variant="secondary" href="/insert">
        Insert User
      </Button>

      <Button className="btn-back" variant="warning" href="/menu">
        Back to Menu
      </Button>
      <Form.Select
        aria-label="Default select example"
        onChange={(e) => {
          setSize(e.target.value);
          page = 0;
        }}
      >
        <option hidden>Choose your page size</option>
        {arrayData.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </Form.Select>
      <br />
      <Table bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>User name</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>{user.createdate}</td>
                <td>
                  <Button
                    variant="info"
                    value={user.userName}
                    onClick={(e) => handleHrefUpdate(e, e.target.value)}
                  >
                    Update
                    <Toaster />
                  </Button>

                  <Button
                    variant="danger"
                    value={user.userName}
                    onClick={(e) => handleClickDelete(e, e.target.value)}
                  >
                    Delete
                    <Toaster />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Button
        className="prev"
        variant="success"
        onClick={HandleClickPrev}
        disabled={page === 0}
      >
        prev
      </Button>
      <Button disabled variant="dark" className="page">
        <strong>
          page: {page + 1}/{totalPage}
        </strong>
      </Button>
      <Button disabled variant="dark" className="count">
        <strong>Users : {count} </strong>
      </Button>
      <Button
        className="next"
        variant="success"
        onClick={HandleClickNext}
        disabled={page + 1 === totalPage}
      >
        next
      </Button>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import "../Css/List.css";
import {
  fetchDataSearch,
  fetchDataAll,
  fetchDataDelete,
} from "../ConstApi/ConstApi";
import { ListUserUI } from "../UI/ListUserUI";
import Swal from "sweetalert2";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [firstdate, setFirstDate] = useState("");
  const [lastdate, setLastDate] = useState("");
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("tokenType");
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [size, setSize] = useState(100);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchDataAll(tokenType, token, page, size);
        setUsers(data);
      } catch (error) {
        console.error("error fetching data all: ", error);
      }
    };

    fetchUsers();
  }, [page, size, token, tokenType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data2 = await fetchDataSearch(
        tokenType,
        token,
        username,
        firstdate,
        lastdate,
        page,
        size
      );
      setUsers(data2);
    } catch (error) {
      console.error("error fetching data search: ", error);
    }
  };

  const HandleClickPrev = () => {
    setPage(page - 1);
  };

  const HandleClickNext = () => {
    setPage(page + 1);
  };

  const handleClickDelete = async (e, username) => {
    e.preventDefault();
    Swal.fire({
      title: "Delete User",
      text: "Do you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "The user has been deleted.", "success");
        const data2 = fetchDataDelete(tokenType, token, username);
        const message = data2.error_message;
        if (message === null || message === "" || message === undefined) {
          setTimeout(() => {
            window.location.href = "/list";
          }, 1000);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Deletion canceled :)", "error");
      }
    });
  };

  const handleHrefUpdate = async (e, username) => {
    e.preventDefault();
    console.log(1111);
    try {
      const data3 = await fetchDataSearch(
        tokenType,
        token,
        username,
        firstdate,
        lastdate,
        page
      );
      console.log(data3[0].id);
      sessionStorage.setItem("userId", data3[0].id);
      sessionStorage.setItem("userName", data3[0].userName);
      window.location.href = "/update";
    } catch (error) {
      console.error("Error fetching show detail data: ", error);
    }
  };

  return (
    <div>
      <ListUserUI
        size={size}
        handleSubmit={handleSubmit}
        username={username}
        setUsername={setUsername}
        firstdate={firstdate}
        setFirstDate={setFirstDate}
        lastdate={lastdate}
        setLastDate={setLastDate}
        users={users}
        handleHrefUpdate={handleHrefUpdate}
        handleClickDelete={handleClickDelete}
        tokenType={tokenType}
        token={token}
        setCount={setCount}
        count={count}
        setTotalPage={setTotalPage}
        HandleClickPrev={HandleClickPrev}
        page={page}
        totalPage={totalPage}
        HandleClickNext={HandleClickNext}
        setSize={setSize}
        setPage={setPage}
      />
    </div>
  );
};

export default ListUser;

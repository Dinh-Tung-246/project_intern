// SEARCH
export const fetchDataSearch = async (
  tokenType,
  token,
  username,
  firstdate,
  lastdate,
  page,
  size
) => {
  const response = await fetch("http://localhost:8080/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${tokenType} ${token}`,
    },
    body: JSON.stringify({ username, firstdate, lastdate, page, size }),
  });
  return await response.json();
};

//LIST
export const fetchDataAll = async (tokenType, token, page, size) => {
  const response = await fetch("http://localhost:8080/api/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${tokenType} ${token}`,
    },
    body: JSON.stringify({ page, size }),
  });
  return await response.json();
};

//DELETE
export const fetchDataDelete = async (tokenType, token, username) => {
  const response = await fetch("http://localhost:8080/api/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${tokenType} ${token}`,
    },
    body: JSON.stringify({ username }),
  });
  return await response.json();
};

// LOGIN
export const fetchDataLogin = async (username, password) => {
  const response = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return await response.json();
};

//INSERT
export const fetchDataInsert = async (tokenType, token, formData) => {
  const response = await fetch("http://localhost:8080/api/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${tokenType} ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
};

//UPDATE
export const fetchDataUpdate = async (
  tokenType,
  token,
  id,
  username,
  password
) => {
  const response = await fetch("http://localhost:8080/api/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${tokenType} ${token}`,
    },
    body: JSON.stringify({ id, username, password }),
  });
  return response.json();
};

export const fetchLogout = async (tokenType, token) => {
  const response = await fetch("http://localhost:8080/api/logout", {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
};

export const fetchCount = async (tokenType, token) => {
  const response = await fetch("http://localhost:8080/api/count", {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.text();
};

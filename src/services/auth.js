import Cookies from "universal-cookie/es6";
const cookie = new Cookies();

const url = "http://127.0.0.1:5000";

export const login = (cred) => {
  return fetch(url + "/python/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cred),
  }).then((res) => {
    if (res.status === 401 || res.status === "401") {
      return res.json().then((res) => {
        return [false, res.msg];
      });
    }
    return res.json().then((res) => [true, res]);
  });
};

export const protectedAuth = (access_token) => {
  return fetch(url + "/python/protected", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => {
    return res.json();
  });
};

export const signup = (cred) => {
  return fetch(url + "/python/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cred),
  }).then((res) => {
    if (res.status === 409 || res.status === "409") {
      return res.json().then((res) => {
        return [false, res.msg];
      });
    }
    return res.json().then((res) => [true, res]);
  });
};

export const search = ({ filter, value }) => {
  return fetch(
    `${url}/python/search/${filter}?${filter}=${value}`
  ).then((res) => res.json());
};

export const getLink = ({ item }) => {
  return fetch(url + "/python/getlink", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((res) => res.json());
};

export const addBook = ({ item, userName }) => {
  return fetch(url + "/python/addBook", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item, userName }),
  }).then((res) => res.json());
};

export const removeBook = ({ item, userName }) => {
  return fetch(url + "/python/removeBook", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item, userName }),
  }).then((res) => res.json());
};

export const getUserBooks = ({ userName }) => {
  return fetch(url + "/python/getUserBooks", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userName),
  }).then((res) => res.json());
};

export const getAllLikedBooks = () => {
  return fetch(url + "/python/getAllLikedBooks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const postBlog = ({ data }) => {
  return fetch(url + "/python/postBlog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const getBlog = () => {
  return fetch(url + "/python/getBlog", {
    method: "GET",
  }).then((res) => res.json());
};

export const deleteBlog = (data) => {
  return fetch(url + "/python/deleteBlog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

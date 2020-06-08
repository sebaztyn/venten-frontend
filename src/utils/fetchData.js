const fetchData = ({ url, method, signal, body }) => {
  return fetch(url, {
    method,
    signal,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      ...(localStorage.getItem("token") && {
        access_token: `Bearer ${localStorage.getItem("token")}`,
      }),
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => res.json());
};

export default fetchData;

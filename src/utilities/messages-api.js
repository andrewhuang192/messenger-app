import { getToken } from "./users-service";

const BASE_URL = "/api/messages";

export function getAllMessages() {
  return sendRequest(BASE_URL);

  // return fetch(BASE_URL).then(res => res.json());
}

export function create(newMessage) {
  // console.log(newMessage)
  return sendRequest(BASE_URL, "POST", newMessage);
  // return fetch('/api/messages', {

  // 	method: "POST",
  // 	headers: { "content-type": "application/json" },
  // 	body: JSON.stringify(newMessage),

  // }).then(res => res.json());
}

export function deleteOne(id) {
	return sendRequest(`${BASE_URL}/${id}`, 'DELETE');

//   return fetch(`/api/messages/${id}`, {
//     method: "DELETE",
//   }).then((res) => res.json());
}

/*--- Helper Functions ---*/
async function sendRequest(url, method = "GET", payload = null) {
  // Fetch takes an optional options object as it's second arg
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    // Ensure the headers object exists
    options.headers = options.headers || {};
    // Add token to Authorization header
    // Prefacing with 'Bearer' is recommended for HTTP specificaion
    options.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, options);
  // res.ok will be false if the status code is set to 4xx in the controller aciton
  if (res.ok) return res.json();
  throw new Error("Bad Request");
}

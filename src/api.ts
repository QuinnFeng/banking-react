import { account, transaction } from "./types";
//const baseUrl = "https://db-json-seven-lime.vercel.app";
const baseUrl = "http://localhost:3000";
const headers = {
  "Content-Type": "application/json",
  credentials: "include", // Include credentials in the request
  mode: "cors", // Enable CORS mode
};

const getAllTransactions = () => {
  return fetch(`${baseUrl}/transactions`, {
    method: "GET",
    headers,
  }).then((data) => data.json());
};

const getTransactionById = (id: number): Promise<transaction> => {
  return fetch(`${baseUrl}/transactions/${id}`, {
    method: "GET",
    headers,
  }).then((data) => data.json());
};

const postTransaction = ({
  date,
  description,
  isDeposit,
  amount,
  balance,
}: Partial<transaction>) => {
  return fetch(`${baseUrl}/transactions`, {
    method: "POST",
    headers,
    body: JSON.stringify({ date, description, isDeposit, amount, balance }),
  }).then((data) => data.json());
};

const deleteTransactionRequest = (id: number) => {
  return fetch(`${baseUrl}/transactions/${id}`, {
    method: "DELETE",
    headers,
  })
    .then((response) => response)
    .catch((error) => {
      console.error(error);
    });
};

const getAccountBalance = (id: number): Promise<number> => {
  return fetch(`${baseUrl}/accounts/${id}`, {
    method: "GET",
    headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data.balance)
    .catch((error) => {
      console.error("Error fetching account balance:", error);
      throw error; // Rethrow the error for further handling
    });
};

const updateAccountBalance = (id: number, updatedAccount: Partial<account>) => {
  return fetch(`${baseUrl}/accounts/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(updatedAccount),
  });
};

export const transactionRequests = {
  getAllTransactions,
  deleteTransactionRequest,
  postTransaction,
  getAccountBalance,
  updateAccountBalance,
  getTransactionById,
};

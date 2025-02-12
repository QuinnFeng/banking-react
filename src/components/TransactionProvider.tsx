import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { transaction } from "../types";
import { transactionRequests } from "../api";
import toast from "react-hot-toast";

type TransactionContextType = {
  transactions: transaction[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  balance: number;
  setBalance: (balance: number) => void;
  createTransaction: (
    date: string,
    description: string,
    isDeposit: boolean,
    amount: number,
    type: string
  ) => void;
  deleteTransaction: (id: number) => void;
};

const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Array<transaction>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchTransactions();
    fetchAccountBalance();
  }, []);

  const fetchTransactions = () => {
    transactionRequests
      .getAllTransactions()
      .then((transactions: Array<transaction>) => setTransactions(transactions.reverse()))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchAccountBalance = () => {
    transactionRequests
      .getAccountBalance(0)
      .then((b) => {
        setBalance(b);
      })
      .catch((error) => console.error("Error fetching balance:", error));
  };

  const createTransaction = (
    date: string,
    description: string,
    isDeposit: boolean,
    amount: number,
    type:string
  ) => {
    const nextBalance = isDeposit ? balance + amount : balance - amount;
    const nextTransaction: Partial<transaction> = {
      date,
      description,
      isDeposit,
      amount,
      balance: nextBalance,
      type
    };
    setIsLoading(true);
    transactionRequests
      .postTransaction(nextTransaction)
      .then(() =>
        transactionRequests.updateAccountBalance(0, { balance: nextBalance })
      )
      .then(() => toast.success(`created transaction ${description}`))
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
        fetchTransactions();
        fetchAccountBalance();
      });
  };

  const deleteTransaction = async (id: number) => {
    const trans = await transactionRequests.getTransactionById(id);
    const { amount, isDeposit } = trans;
    const nextBalance = isDeposit ? balance - amount : balance + amount;
    transactionRequests
      .deleteTransactionRequest(id)
      .then(() =>
        transactionRequests.updateAccountBalance(0, { balance: nextBalance })
      )
      .then(() => () => toast.success(`deleted transaction #${id}`))
      .catch((error) => console.log(error))
      .finally(() => {
        fetchTransactions();
        fetchAccountBalance();
      });
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions: transactions,
        isLoading,
        setIsLoading,
        balance,
        setBalance,
        createTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);

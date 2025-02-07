import { TransactionProvider } from "../components/TransactionProvider";
import { Account } from "./account";

export const AccountData = () => {
  return (
    <TransactionProvider>
      <Account />
    </TransactionProvider>
  );
};

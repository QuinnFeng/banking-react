import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import "./cadence/cadence.css";
import { Header } from "./components/header";
import { Navigations } from "./components/navigation";
import { Transactions } from "./components/transactions";
import { Balance } from "./components/balance";
import { TransactionProvider } from "./components/TransactionProvider";
import { AddTransaction } from "./components/addTransaction";
import { descriptions } from "./util/const";
import { transactionRequests } from "./api";
import { LandingPage } from "./cadence/landing";
import { Account } from "./cadence/account";

function App() {
  const [page, setPage] = useState("My Accounts");
  const [category, setCategory] = useState("My Accounts");
  const [type, setType] = useState("Summary");
  const [isCreate, setIsCreate] = useState(false);

  return (
    <>
      {/* <Header
        page={page}
        setPage={setPage}
      />
      <Navigations
        category={category}
        setCategory={setCategory}
        type={type}
        setType={setType}
      />
      <button
        className="btn"
        onClick={() => setIsCreate(!isCreate)}
        // style={{ display: "none" }}
      >
        {isCreate ? "Home" : "Post Transaction"}
      </button>
      <TransactionProvider>
        {isCreate ? (
          <section>
            <AddTransaction />
          </section>
        ) : (
          <section className="activities container">
            <Balance />
            <Transactions />
          </section>
        )}
      </TransactionProvider> */}
      <datalist id="descriptions">
        {descriptions.map((description) => (
          <option key={description}>{description}</option>
        ))}
      </datalist>
      <TransactionProvider>
        <LandingPage />
        <Account />
      </TransactionProvider>
      {/* <LandingPage /> */}
    </>
  );
}

export default App;

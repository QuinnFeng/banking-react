import { ChangeEvent, FormEvent, useState } from "react";
import { useTransactions } from "./TransactionProvider";
import { descriptions, types } from "../util/const";

export const AddTransaction = () => {
  const [isDeposit, setIsDeposit] = useState(false);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [description, setDescription] = useState("");
  const { isLoading, createTransaction } = useTransactions();
  const [type, setType] = useState("");

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTransaction(formattedDate, description, isDeposit, amount, type);
    resetValues();
  };

  const resetValues = () => {
    setIsDeposit(false);
    setAmount(0);
    setDescription("");
    setType("");
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const [year, month, day] = selectedDate.split("-");
    const formatted = `${month}/${day}/${year}`;
    setDate(selectedDate);
    setFormattedDate(formatted);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value as (typeof types)[number]);
  };

  return (
    <>
      <section className="">
        <form
          action=""
          id="add-transaction"
          onSubmit={(e) => formSubmitHandler(e)}
        >
          <div>
            <label htmlFor="amount">Amount: </label>
            <input
              id="amount"
              type="number"
              value={amount || ""}
              onChange={(e) => {
                setAmount(+e.target.value);
              }}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              list={"descriptions"}
            />
          </div>
          <div>
            <label htmlFor="datePicker">Select a Date: </label>
            <input
              type="date"
              id="datePicker"
              value={date}
              onChange={handleDateChange}
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="typePicker">type: </label>
            <input
              type="text"
              id="type"
              value={type}
              onChange={handleTypeChange}
              disabled={isLoading}
              list={"types"}
            />
          </div>
          <div>
            <label>
              <input
                id="deposit"
                type="checkbox"
                checked={isDeposit}
                onChange={() => setIsDeposit(!isDeposit)}
                disabled={isLoading}
              />
              &emsp;Is Deposit?
            </label>
          </div>
          <input
            type="submit"
            value="submit"
          />
        </form>
        <datalist id="descriptions">
          {descriptions.map((description) => (
            <option key={description}>{description}</option>
          ))}
        </datalist>

        <datalist id="types">
          {types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </datalist>
      </section>
    </>
  );
};

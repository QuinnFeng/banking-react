import { MdKeyboardArrowDown } from "react-icons/md";
import "./account.css";
import { SetStateAction, useEffect, useState } from "react";
import { PiHouseLineBold } from "react-icons/pi";
import FDIC from "../assets/FDIC.svg";
import { RiChat3Line } from "react-icons/ri";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { IoDocumentTextSharp } from "react-icons/io5";
import { HiBellAlert } from "react-icons/hi2";
import { BsFillTicketDetailedFill } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { transaction } from "../types";
import { useTransactions } from "../components/TransactionProvider";
import { formatNumber } from "../util/util";
import ReactPaginate from "react-paginate";

const categories = [
  "Accounts",
  "Transfers",
  "Bill Pay",
  "Deposit",
  "Zelle@",
  "My Finances",
];

export const Account = () => {
  const [category, setCategory] =
    useState<(typeof categories)[number]>("Accounts");
  const [toTransactions, setToTransactions] = useState(false);
  const [tid, setTid] = useState(0);
  const { transactions} = useTransactions();
  const pageCount = 20;
  const [pageOffset, setPageOffset] = useState(0);
  const [repositories, setRepositories] = useState<transaction[]>([]);

  useEffect(() => {
    setRepositories(slicedTransaction);
  }, [pageOffset, transactions]);

  function slicedTransaction() {
    return transactions.slice(
      pageOffset * pageCount,
      (pageOffset + 1) * pageCount
    );
  }
  // useEffect(() => {
  //   console.log(transactions);
  // }, [transactions]);

  const handlePageChange = (event: { selected: SetStateAction<number> }) => {
    setPageOffset(event.selected);
  };

  return (
    <>
      <section className="main">
        <span className="cadence-top"></span>
        <div className="cadence-header">
          <div className="top">
            <img
              src="https://mma.prnewswire.com/media/1732600/Cadence_Bank.jpg?p=twitter"
              alt="logo"
              className="logo"
            />
            <span className="initials">ZF</span>
            <div className="service">
              <span>
                Zhiheng Feng
                <MdKeyboardArrowDown />
              </span>
              <hr />
              <span>Help</span>
              <hr />
              <span>FAQs</span>
              <hr />
              <span>Contact Us</span>
              <hr />
              <span>Schedule a Visit</span>
              <hr />
              <span>Branch Locator</span>
              <hr />
              <span>Log Out</span>
            </div>
          </div>
          <ul className="navs-main">
            {categories.map((c, index) => (
              <li
                key={c}
                className={c == category ? "active category" : "category"}
                onClick={() => setCategory(c)}
              >
                <span>{c}</span>
                {index == 0 || index == 1 || index == 3 ? (
                  <MdKeyboardArrowDown className="arrow-icon" />
                ) : (
                  <></>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="account-main">
          <div className="dashboard">
            {toTransactions ? (
              <>
                <div className="checking">
                  <div className="checking-header">
                    <div className="balances">
                      <h3>First Checking</h3>
                      <p>****3433</p>
                      <div className="flex consistent">
                        <div className="balance-details">
                          <hr />
                          <div>
                            <p>${"100.00"}</p>
                            <p>Available Balance</p>
                          </div>
                        </div>
                        <div className="balance-details">
                          <hr />
                          <div>
                            <p>${"100.00"}</p>
                            <p>Current Balance</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="operations">
                      <span>
                        <BsCreditCard2FrontFill className="operation" />
                        Order Checks
                      </span>
                      <span>
                        <BsFillTicketDetailedFill className="operation backpack" />
                        Details
                      </span>
                      <span></span>
                      <span>
                        <IoDocumentTextSharp className="operation" />
                        Statements
                      </span>
                      <span></span>
                      <span>
                        <HiBellAlert className="operation" />
                        Alerts
                      </span>
                    </div>
                  </div>

                  <div className="history">
                    <h2>History</h2>
                    <div>
                      <span>
                        <i className="fa-solid fa-magnifying-glass"></i>Search
                      </span>
                      <span>
                        <IoMdDownload />
                        Download
                      </span>
                    </div>
                  </div>

                  <div className="displaying">
                    <p>
                      <b>Displaying:</b>Transaction Type:All Transaction
                      Type;Date range: Last 90 Days
                    </p>
                  </div>

                  <div className="cadence-transactions">
                    <div className="transaction-header">
                      <span></span>
                      <span>Date</span>
                      <span> Description</span>
                      <span>Type</span>
                      <span>Amount</span>
                      <span>Balance</span>
                    </div>
                    <div className="posted">Posted</div>
                    <div className="transactions-history">
                      {transactions.map((t: transaction) => (
                        <div className="cadence-transaction">
                          <span>
                            <MdOutlineKeyboardArrowRight className="left-arrow" />
                          </span>
                          <span>{t.date}</span>
                          <span>{t.description}</span>
                          <span>{t.isDeposit ? "Deposit" : "Withdraw"}</span>
                          <span>
                            {t.isDeposit ? "" : formatNumber(t.amount)}
                          </span>
                          <span>{formatNumber(t.balance)}</span>
                        </div>
                      ))}
                      <ReactPaginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={Math.ceil(transactions.length / pageCount)}
                        marginPagesDisplayed={16}
                        pageRangeDisplayed={pageCount}
                        onPageChange={handlePageChange}
                        containerClassName="pagination"
                        activeClassName="active"
                        forcePage={pageOffset}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="summary">
                <div className="resolution">
                  <p>
                    As of January 18, the vendor outage has been resolved. If
                    you continue to have account issues, visit
                    cadencebank.com/resolution <b>cadencebank.com/resolution</b>{" "}
                    or call our Contact Center at 888-797-7711.
                  </p>
                </div>
                <div className="balance">
                  <p className="section-header">Account Summary</p>
                  <hr />
                  <p className="edit-text">Edit Accounts View</p>
                  <hr />
                  <div className="account-balance">
                    <div className="account-info">
                      <h3 onClick={() => setToTransactions(true)}>
                        First Checking
                      </h3>
                      <p>***3433</p>
                    </div>
                    <div className="available-balance">
                      <h3>${"100.00"}</h3>
                      <p>Available Balance</p>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            )}
            <div className="links">
              <div
                className="pay-online"
                style={{ display: !toTransactions ? "flex" : "none" }}
              >
                <p>Easily track and pay your bills online.</p>
                <button>Enroll in payment</button>
              </div>
              <div className="quick-links">
                <h3>Quick Links</h3>
                <hr />
                <p>Make a Transfer</p>
                <p>View Statements</p>
                <p>Stop a Payment</p>
                <p>Set up Alerts</p>
                <p>Authorized Financial Apps</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <img
            src="https://mma.prnewswire.com/media/1732600/Cadence_Bank.jpg?p=twitter"
            alt="logo"
            className="logo"
          />
          <div className="bank-info">
            <p>Routing Number:084201278</p>
            <p>
              Customer Service:1-888-797-7711 M-F 7:00 a.m. - 8:00 p.m.{" "}
              {"(CST) Saturday 7:00 a.m. - 5:00 p.m. (CST)"}
            </p>
            <p>@2025 Cadence Bank. All Rights reserved.</p>
          </div>
          <div className="fdic">
            <p>
              Equal Housing Lender
              <PiHouseLineBold className="house-icon" />
            </p>
            <p>NLMS#410279</p>
            <p>
              Federally Insured{" "}
              <img
                src={FDIC}
                alt="FDIC"
                className="fdic-image"
              />
            </p>
          </div>
        </div>
        <div className="chat">
          <RiChat3Line className="chat-icon" />
          <p>Chat now</p>
        </div>
      </section>
    </>
  );
};

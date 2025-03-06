import { MdKeyboardArrowDown } from "react-icons/md";
import "./account.css";
import { SetStateAction, useEffect, useState } from "react";
import { PiHouseLineBold } from "react-icons/pi";
import FDIC from "../assets/FDIC.svg";
import { RiChat3Line } from "react-icons/ri";
import check from "../assets/check.svg";
import statement from "../assets/statement.svg";
import account from "../assets/account.svg";
import alert from "../assets/alert.svg";
import { IoMdDownload } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { transaction } from "../types";
import { useTransactions } from "../components/TransactionProvider";
import { formatNumber } from "../util/util";
import ReactPaginate from "react-paginate";
import { AddTransaction } from "../components/addTransaction";
import { Loading } from "../util/Loading";

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
  const { transactions, balance } = useTransactions();
  const pageCount = 35;
  const [pageOffset, setPageOffset] = useState(0);
  const [repositories, setRepositories] = useState<transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (transactions && balance) {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [transactions, balance]);

  useEffect(() => {
    setRepositories(slicedTransaction);
  }, [pageOffset, transactions]);

  function slicedTransaction() {
    return transactions.slice(
      pageOffset * pageCount,
      (pageOffset + 1) * pageCount
    );
  }

  const handlePageChange = (event: { selected: SetStateAction<number> }) => {
    setPageOffset(event.selected);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="main">
          <span className="cadence-top"></span>
          <div className="cadence-header">
            <div className="top">
              <img
                src="https://mma.prnewswire.com/media/1732600/Cadence_Bank.jpg?p=twitter"
                alt="logo"
                className="logo"
              />
              <div className="service">
                <span className="initials">ZF</span>
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
                  <span className="under"></span>
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
                              <p>{formatNumber(balance)}</p>
                              <p>Available Balance</p>
                            </div>
                          </div>
                          <div className="balance-details">
                            <hr />
                            <div>
                              <p>{formatNumber(balance)}</p>
                              <p>Current Balance</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="operations">
                        <span>
                          <i>
                            <img
                              src={check}
                              alt="check"
                              width="24"
                              height="24"
                              className="operation"
                            />
                          </i>
                          Order Checks
                        </span>
                        <span>
                          <i>
                            <img
                              src={account}
                              alt="account"
                              width="24"
                              height="24"
                              className="operation"
                            />
                          </i>
                          Details
                        </span>
                        <span></span>
                        <span>
                          <i>
                            <img
                              src={statement}
                              alt="statement"
                              width="24"
                              height="24"
                              className="operation"
                            />
                          </i>
                          Statements
                        </span>
                        <span></span>
                        <span>
                          <i>
                            <img
                              src={alert}
                              alt="alert"
                              width="24"
                              height="24"
                              className="operation"
                            />
                          </i>
                          Alerts
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "none" }}>
                      <AddTransaction />
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
                        <b>Displaying: </b>
                        <span>
                          Transaction Type:All Transaction Type;Date range: Last
                          90 Days
                        </span>
                      </p>
                    </div>

                    <div className="cadence-transactions">
                      <div className="transaction-header">
                        <span></span>
                        <span>Date</span>
                        <span>Description</span>
                        <span>Type</span>
                        <span>Amount</span>
                        <span>Balance</span>
                      </div>
                      <div className="posted">Posted</div>
                      <div className="transactions-history">
                        {repositories.map((t: transaction) => (
                          <div
                            className="cadence-transaction"
                            key={t.id}
                          >
                            <span>
                              <MdOutlineKeyboardArrowRight className="left-arrow" />
                            </span>
                            <span>{t.date}</span>
                            <span>{t.description}</span>
                            <span>{t.type}</span>
                            <span
                              style={{
                                color: t.isDeposit ? "#1d871e" : "#333",
                              }}
                            >
                              {(t.isDeposit ? "+" : "") +
                                formatNumber(t.amount)}
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
                          className="pagination"
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
                      cadencebank.com/resolution{" "}
                      <b>cadencebank.com/resolution</b> or call our Contact
                      Center at 888-797-7711.
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
                        <h3>${balance.toFixed(2)}</h3>
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
      )}
    </>
  );
};

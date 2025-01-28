import footer from "../assets/cad_footer.png";
import header from "../assets/cad_header.png";
import main from "../assets/cad_main.png";
import adv from "../assets/cd_adv.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <section className="">
        <img
          src={header}
          alt="header"
        />
        <section className="cb-header container">
          <ul className="inquiry">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
            <li>Fraud&Security</li>
            <li>Locations</li>
          </ul>
          <nav className="cb-nav">
            <img
              src="https://mma.prnewswire.com/media/1732600/Cadence_Bank.jpg?p=twitter"
              alt="Cadence Bank logo"
              className="cb-logo"
            />
            <ul className="navs">
              <li>
                <span>Personal</span>
                <MdKeyboardArrowDown className="arrow-icon" />
              </li>
              <li>
                <span>Business</span>
                <MdKeyboardArrowDown className="arrow-icon" />
              </li>
              <li>
                <span>Commercial</span>
                <MdKeyboardArrowDown className="arrow-icon" />
              </li>
              <li>
                <span>Wealth</span>
                <MdKeyboardArrowDown className="arrow-icon" />
              </li>
              <li>
                <span>Insurance</span>
                <MdKeyboardArrowDown className="arrow-icon" />
              </li>
              <li>
                <span>Resources</span>
                <MdKeyboardArrowDown className="arrow-icon" />
              </li>
            </ul>
            <div className="buttons">
              <button className="search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <button
                className="login"
                onClick={() => setIsLogin(true)}
              >
                <i className="fa-solid fa-circle-user"></i>
                Login
              </button>
            </div>
          </nav>
        </section>
        <div className="login-container">
          <img
            src={main}
            alt="main"
          />
          {isLogin ? (
            <>
              <div className="login-main">
                <button
                  className="login-toggle"
                  onClick={() => setIsLogin(false)}
                >
                  <i className="fa-solid fa-times"></i>
                </button>
                <div className="login-box">
                  <div className="left">
                    <h2>Online Banking Log in</h2>
                    <div className="auth">
                      <p>User ID</p>
                      <input
                        type="text"
                        defaultValue={"ZhF1997."}
                      />
                    </div>
                    <div
                      className="auth"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div className="password">
                        <p>Password</p>
                        <input
                          type="text"
                          defaultValue={"........"}
                        />
                      </div>
                      <FiEye className="eye" />
                    </div>
                    <div className="resets">
                      <span>Forgot Password?</span>
                      <span>Forgot User ID?</span>
                    </div>
                    <button
                      className="login-button"
                      onClick={() => navigate("/account")}
                    >
                      Log In
                    </button>
                    <p className="register">
                      Don't have an account?<span>Register Now</span>
                    </p>
                    <p className="security">
                      <IoShieldCheckmarkSharp className="shield" />
                      <span>Fraud and Security Center</span>
                    </p>
                  </div>
                  <hr />
                  <div className="right">
                    <h2>Other accounts logins</h2>
                    <ul className="accounts">
                      <li>Merchant Services Account</li>
                      <li>Express Deposit Account</li>
                      <li>Prepaid Card Account</li>
                      <li>Payroll Card Account</li>
                      <li>Gift Card Account</li>
                      <li>Business Credit Card Access</li>
                      <li>Retirement Plan Access</li>
                      <li>Asset Management & Trust</li>
                      <li>Commercial Center Access</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <img
                src={adv}
                alt="adv"
              />
              <img
                src={footer}
                alt="footer"
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

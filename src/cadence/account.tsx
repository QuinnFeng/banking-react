import { MdKeyboardArrowDown } from "react-icons/md";
import "./account.css";

export const Account = () => {
  return (
    <>
      <section className="main">
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
                <MdKeyboardArrowDown className="arrow-icon" />
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
        </div>
      </section>
    </>
  );
};

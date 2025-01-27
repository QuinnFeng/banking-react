import footer from "../assets/cad_footer.png";
import header from "../assets/cad_header.png";
import main from "../assets/cad_main.png";
import adv from "../assets/cd_adv.png";
import { MdKeyboardArrowDown } from "react-icons/md";

export const LandingPage = () => {
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
                Personal
                <MdKeyboardArrowDown className="arrow-icon" />
              </li>
              <li>
                Business
                <MdKeyboardArrowDown className="arrow-icon" />
              </li>
              <li>
                Commercial
                <MdKeyboardArrowDown className="arrow-icon" />
              </li>
              <li>
                Wealth
                <MdKeyboardArrowDown className="arrow-icon" />
              </li>
              <li>
                Insurance
                <MdKeyboardArrowDown className="arrow-icon" />
              </li>
              <li>
                Resources
                <MdKeyboardArrowDown className="arrow-icon" />
              </li>
            </ul>
            <div className="buttons">
              <button className="search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <button className="login">
                <i className="fa-solid fa-circle-user"></i>
                Login
              </button>
            </div>
          </nav>
        </section>
        <img
          src={main}
          alt="main"
        />
        <img
          src={adv}
          alt="adv"
        />
        <img
          src={footer}
          alt="footer"
        />
      </section>
    </>
  );
};

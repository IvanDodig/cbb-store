import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const Header = () => {
   const { t, i18n } = useTranslation();
   const handleLanguage = (lang) => {
      i18n.changeLanguage(lang);
   };

   const { isDark, darkTheme, lightTheme, changeTheme } = useContext(
      ThemeContext
   );
   return (
      <>
         <Navbar
            style={
               isDark
                  ? { background: darkTheme.bgPrimary }
                  : { background: lightTheme.bgPrimary }
            }
            variant="dark"
            expand="lg"
         >
            <Navbar.Brand className="ml-5 home">
               <Link to="/">CBB Store</Link>
            </Navbar.Brand>
            <button
               onClick={() => {
                  handleLanguage("hr");
               }}
            >
               Hrvatski
            </button>
            <button
               onClick={() => {
                  handleLanguage("en");
               }}
            >
               English
            </button>
            <button onClick={changeTheme}>Change Theme</button>

            <Nav className="ml-auto header-nav">
               <Link to="/about">
                  <div>About</div>
               </Link>
               <Link to="/contact">
                  <div>Contact</div>
               </Link>
            </Nav>
         </Navbar>
      </>
   );
};

export default Header;

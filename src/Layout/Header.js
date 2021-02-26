import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
   const { t, i18n } = useTranslation();
   const handleLanguage = (lang) => {
      i18n.changeLanguage(lang);
   };
   return (
      <>
         <Navbar bg="dark" variant="dark" expand="lg">
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

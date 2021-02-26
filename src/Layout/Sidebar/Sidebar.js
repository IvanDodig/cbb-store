import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
   FaBars,
   FaTimes,
   FaUserAlt,
   FaBorderAll,
   FaBoxOpen,
   FaTags,
} from "react-icons/fa";
import { Col } from "react-bootstrap";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

const Sidebar = () => {
   const [show, setShow] = useState(true);
   const { isDark, darkTheme, lightTheme } = useContext(ThemeContext);

   return (
      <>
         <div
            className={show ? "toggle-button-active" : "toggle-button"}
            onClick={() => setShow(!show)}
         >
            {show ? <FaTimes /> : <FaBars />}
         </div>
         <Col
            xs={7}
            sm={5}
            md={2}
            id="sidebar"
            className={show ? "" : "hidden"}
            style={
               isDark
                  ? { background: darkTheme.bgSecondary }
                  : { background: lightTheme.bgSecondary }
            }
         >
            <Nav className="col-12 d-md-block  sidebar">
               <Nav.Item style={{ color: "white" }}>
                  <Link to="/">
                     <div>
                        <FaUserAlt
                           style={{
                              marginRight: "10px",
                              paddingBottom: "2px",
                           }}
                        />
                        Customers
                     </div>
                  </Link>
                  <Link to="/categories">
                     <div>
                        <FaBorderAll style={{ marginRight: "10px" }} />
                        Categories
                     </div>
                  </Link>
                  <Link to="/products">
                     <div>
                        <FaBoxOpen style={{ marginRight: "10px" }} />
                        Products
                     </div>
                  </Link>
                  <Link to="/brands">
                     <div>
                        <FaTags style={{ marginRight: "10px" }} />
                        Brands
                     </div>
                  </Link>
               </Nav.Item>
            </Nav>
         </Col>
      </>
   );
};

export default Sidebar;

import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import RoutesComponent from "./Routes/RoutesComponent";
import { ThemeContext } from "./contexts/ThemeContext";
import { useContext } from "react";

function App() {
   const { isDark, changeTheme, darkTheme, lightTheme } = useContext(
      ThemeContext
   );
   return (
      <Router>
         <div className="App">
            <Header />
            <Container fluid>
               <Row>
                  <Sidebar
                     style={{
                        backgroundColor: "black",
                     }}
                  />

                  <Col className="main-content">
                     <div
                        className="content"
                        style={
                           isDark
                              ? { background: darkTheme.bgTernary }
                              : { background: lightTheme.bgTernary }
                        }
                     >
                        <RoutesComponent />
                     </div>
                  </Col>
               </Row>
            </Container>
         </div>
      </Router>
   );
}

export default App;

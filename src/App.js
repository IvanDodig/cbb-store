import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import RoutesComponent from "./Routes/RoutesComponent";

function App() {
   return (
      <Router>
         <div className="App">
            <Header />
            <Container fluid>
               <Row>
                  <Sidebar />

                  <Col className="main-content">
                     <div className="content">
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


import Routers from "../src/Route/Route";
import  { Toaster } from "react-hot-toast";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
function App() {
  return (
    <>
      <Router>
          <Toaster position="top-right" />
         <Routers />
      </Router>
    </>
  );
}

export default App;

import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <div className="body">
      <BrowserRouter>
        <Header />
        <div className="wrapper">
          <Content />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}
export default App;
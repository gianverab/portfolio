import { Navbar } from "./components";
import { About, Contact, Header, Skills, Testimonial, Work } from "./container";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Contact />
    </div>
  );
};

export default App;

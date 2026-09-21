import ContactForm from "./components/ContactForm/ContactForm.jsx";
import ContactList from "./components/ContactList/ContactList.jsx";

import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <h1 className="header-app">Contact List</h1>
        <div className="main">
          <ContactList />
          <ContactForm />
        </div>
      </div>
    </>
  );
}
export default App;

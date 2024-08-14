import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ContactsPage from "./pages/ContactsPage";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/Layout";
import ContactDetails from "./pages/ContactDetails";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ContactsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/contact-details/:id" element={<ContactDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

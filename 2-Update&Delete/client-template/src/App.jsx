import { useDataContext } from "./context/DataProvider";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./components/Navbar";
import "./styles/App.scss";
import { Admin } from "./pages/Admin";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const { user, setUser } = useDataContext();

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <h2>My Weebpage Template</h2>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={ 
              <ProtectedRoute admin>
                <Admin /> 
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>Page does not exist</div>} />
        </Routes>
      </main>
      <footer>&copy; Tralalas Studios Inc.</footer>
    </div>
  );
}

export default App;

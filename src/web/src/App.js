import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createStore } from "redux";
import { Provider } from 'react-redux';

import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import ProtectedRoute from "./components/helpers/ProtectedRoute";
import './App.css';
import reducer from "./store";

const store = createStore(reducer);

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
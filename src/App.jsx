import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Spinner from "./components/Spinner";

function App() {
  return (
    <>
      <Spinner />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

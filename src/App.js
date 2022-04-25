import AppRouter from "./appRouter/AppRouter";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authFunction } from "./redux/actions/userActions";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authFunction());
  }, []);
  return (
    <BrowserRouter>
      <div className="wrapper">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;

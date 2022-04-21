import AppRouter from "./appRouter/AppRouter";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import TaskColumn from "components/TaskColumn/animate";

function App() {
  return (
    <div className="no-scrollbar">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path=":boardId" element={<TaskColumn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

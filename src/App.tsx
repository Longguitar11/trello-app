import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import EmptyBoard from "./pages/EmptyBoard";
import TaskColumn from "components/TaskColumn";

function App() {

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path=":boardId" element={<TaskColumn />} />
            {/* <Route index element={<EmptyBoard />} />
            <Route path="hide-sidebar" element={<EmptyBoard />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

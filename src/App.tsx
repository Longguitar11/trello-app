import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout'
import EmptyBoard from './pages/EmptyBoard'

function App() {

  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<EmptyBoard />} />
            <Route path='/hide-sidebar' element={<EmptyBoard />} />

            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

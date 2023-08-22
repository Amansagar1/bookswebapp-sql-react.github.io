
import './App.css';
import { Routes, Route, BrowserRouter} from "react-router-dom";
import Add from './Pages/Add';
import Books from './Pages/Books';
import Update from './Pages/Update';


function App() {
  return (
    <div className="App">
<BrowserRouter>
<Routes>
  
  <Route path='/add' element={<Add/>} />
  <Route path='/' element={<Books/>} />
  <Route path='/update/:id' element={<Update/>} />
</Routes>

</BrowserRouter>
    </div>
  );
}

export default App;

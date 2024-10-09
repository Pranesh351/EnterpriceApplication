import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';

import useProductContext from './Hooks/UseProductContext';
import NavBar from './components/NavBar';
import { useEffect } from 'react';

const App = () => {
  const {state, dispatch}= useProductContext();
  console.log(state.products);
  return (
    <BrowserRouter>
      <NavBar/>
      <div className='page'>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
        <Routes>
         <Route path='/details/:id' element={<Details/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

 

export default App;
import { useLocation, useNavigate } from 'react-router-dom';
import useProductContext from '../Hooks/UseProductContext';
import { useState } from 'react';

const Search = () => {
  const { state, dispatch } = useProductContext();
  const navigate= useNavigate();
  const location= useLocation()
  const isInHomePage= location.pathname==="/";

  const handleSearchChange = async(e) => {
    dispatch({type: 'SET_SEARCH_TERM', payload: e.target.value});
  };

  const handleSearchSubmit = async() => {

    const response = await fetch(`https://dummyjson.com/products`)
    const JSON= await response.json();

    await dispatch({ type: 'SET_SEARCH', 
      payload: JSON.products.filter((item)=>item.title.toLowerCase().includes(state.searchTerm.toLowerCase()) || 
      item.tags.includes(state.searchTerm.toLowerCase()))});
    if(!isInHomePage){
      navigate('/');
    }
  };

  return (<div className='search'>
      <input type="text" placeholder="Search products" value={state.searchTerm} onChange={handleSearchChange}/>
      <button onClick={handleSearchSubmit}>Search</button>
    </div>
  );
};

export default Search;
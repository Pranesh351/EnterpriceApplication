import { useEffect} from 'react';
import useProductContext from '../Hooks/UseProductContext';
import { useLocation, useNavigate } from 'react-router-dom';

 

const Categories = () => {
  const { state, dispatch } = useProductContext();
  const navigate= useNavigate();
  const isInHomePage= useLocation().pathname==="/";

  const handleCategoryChange = async(category) => {
    await dispatch({type:"SET_SELECTED_CATEGORY", payload:category})
    await dispatch({type:"SET_SEARCH_TERM", payload:''})

    if(category.name !== "all"){
      const response= await fetch(category.url+"?limit=11")
      const JSON= await response.json()
      const actualArray= await JSON.products.length===11 ? JSON.products.slice(0,10) : JSON.products;

      await dispatch({ type: 'SET_NEW_PRODUCTS', payload: actualArray})
      await dispatch({type:'SET_HAS_NEXT', payload: JSON.products.length===11})

      if(!isInHomePage){
        navigate('/');
      }
    }
  };

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'SET_CATEGORIES', payload: data }));
  }, []);

  return (
    <select value={state.selectedCategory.name}>
      <option key="all" value="all" onClick={()=> 
        dispatch({type:"SET_SELECTED_CATEGORY", payload:{"name":"all", "url":""}})}>All Categories</option>
      {state.categories.length>0 && state.categories.map((category) => {
        return <option key={category.name} value={category.name} onClick={()=> handleCategoryChange({"name":category.name, "url":category.url})}>
          {category.name}
        </option>})}
    </select>
  );
};

 

export default Categories;
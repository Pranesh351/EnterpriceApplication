import { useEffect } from 'react';
import useProductContext from '../Hooks/UseProductContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const { state, dispatch } = useProductContext();
  const navigate= useNavigate();

  useEffect(() => {
    const newArray=async()=>{
      if(state.selectedCategory.name=== 'all'&& !state.searchTerm){
        const response= await fetch(`https://dummyjson.com/products?limit=11`)
        const JSON= await response.json()
        const actualArray= JSON.products.length===11 ? JSON.products.slice(0,10) : JSON.products;

        dispatch({ type: 'SET_NEW_PRODUCTS', payload: actualArray})
        dispatch({type:'SET_HAS_NEXT', payload: JSON.products.length===11})
      }
    }
    newArray();
  }, []);

    useEffect(() => {
      const newArray=async()=>{
        if(state.selectedCategory.name=== 'all'&& !state.searchTerm){
          const response= await fetch(`https://dummyjson.com/products?limit=11`)
          const JSON= await response.json()
          const actualArray= JSON.products.length===11 ? JSON.products.slice(0,10) : JSON.products;
  
          dispatch({ type: 'SET_NEW_PRODUCTS', payload: actualArray})
          dispatch({type:'SET_HAS_NEXT', payload: JSON.products.length===11})
        }
      }
      newArray();
    }, [state.selectedCategory]);

  const handleLoadMore=async () => {
    const response= await fetch(`${state.selectedCategory.name==="all" ? "https://dummyjson.com/products" : state.selectedCategory.url}?limit=11&skip=${(state.page+1) * 10}`)
    const JSON= await response.json();
    const actualArray= await JSON.products.length===11 ? JSON.products.slice(0,10) : JSON.products;

    dispatch({ type: 'ADD_TO_EXISTING_PRODUCTS', payload: actualArray});
    dispatch({type:'SET_HAS_NEXT', payload: JSON.products.length===11})
  };

  return (
    <div className='product'>

      <h2 className='into'>Happy browsing! 🛒 May your finds be fabulous and your deals delightful!</h2>
      <div className='thumbnails'>
          {state.products.map((product) => ( <div key={product.id} className='thumbnail' onClick={()=> navigate(`/details/${product.id}`)}>
          <img src={product.thumbnail}></img>
          <div className='subThumbnail'>
            <h3>{product.title}</h3>
            <h5 className='brand'>{product.brand}</h5>
            <p className='discount'>Discount: {product.discountPercentage} %</p>
            <p> 
                Price: <span className="orginalPrice"> {product.price}$</span> 
                <span className="price"> {Number(product.price*(1-(product.discountPercentage/100))).toFixed(2)}$</span>
            </p>
            <p className='rating'>Rating: {product.rating.toString().substring(0,3)}/5</p>
          </div>
        </div> ))}
      </div>

      {state.hasNext && !state.searchTerm && state.products && state.products.length>0 && state.products.length % 10 === 0 && 
        <button onClick={()=>handleLoadMore()}>Load More</button>
      }

      {!state.products || (state.products && state.products.length===0) && <p><h1>Sorry </h1>{state.searchTerm} product is not available in our store.</p>}

    </div>
  );
};

 

export default Products;
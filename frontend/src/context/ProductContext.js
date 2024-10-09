import React, { createContext, useReducer} from 'react';
import Search from '../components/Search';

export const ProductContext = createContext();

const initialState = {
  products: [],
  categories: [],
  productDetails:null,
  searchTerm: '',
  selectedCategory: {name:"all", url:""},
  page: 0,
  hasNext: false
};

const productReducer = (state, action) => {
    
    switch (action.type) {

        case 'SET_NEW_PRODUCTS':
            return { ...state, products: [...action.payload], page: 0 };
        case 'ADD_TO_EXISTING_PRODUCTS':
            return { ...state, products: [...state.products, ...action.payload], page: state.page+1 };
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload };
        case 'SET_SELECTED_CATEGORY':
            return { ...state, selectedCategory: action.payload};
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload};
        case 'SET_SEARCH':
            return { ...state, selectedCategory: {name:"all", url:""}, products: action.payload};
        case 'SET_PRODUCT_DETAILS':
            return { ...state, productDetails: action.payload}
        case 'SET_HAS_NEXT':
            return {...state, hasNext: action.payload}
        default:
            return state;

    }
};

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState); 

  return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

 

export default ProductProvider;
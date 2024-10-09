import React, { createContext, useReducer} from 'react';

export const testContext = createContext();

const initialState = {
  products: [],
  categories: [],
  selectedCategory: '',
  searchTerm: '',
  page: 0,
};

const testReducer = (state, action) => {
    
    switch (action.type) {

        case 'SET_NEW_PRODUCTS':
            return { ...state, products: [...action.payload], page: 0 };
        case 'ADD_TO_EXISTING_PRODUCTS':
            return { ...state, products: [...state.products, ...action.payload], page: state.page+1 };
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload };
        case 'SET_SELECTED_CATEGORY':
            return { ...state, selectedCategory: action.payload, products: [], page: 0 };
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload};
        case 'SET_SEARCH':
            return { ...state, products: action.payload.filter((item)=>item.title.toLowerCase().includes(state.searchTerm.toLowerCase()) || item.tags.includes(state.searchTerm.toLowerCase()))};
        default:
            return state;

    }
};

const testProvider = ({ children }) => {
    const [state, dispatch] = useReducer(testReducer, initialState); 

  return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

 

export default testProvider;
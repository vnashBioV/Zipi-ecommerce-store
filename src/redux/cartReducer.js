const initialstate = {
    cartItems: [],
};

export const cartReducer = (state = initialstate, action) =>{
    switch (action.type){
        //ACTION
        case 'ADD_TO_CART' : {
            return{
                ...state,
                cartItems : [...state.cartItems , action.payload]
            }
        }
        case 'DELETE_FROM_CART' : {
            return{
                ...state ,
                cartItems : state.cartItems.filter(item => item !== action.payload)
            }
        }
        default : return state;
    }
}
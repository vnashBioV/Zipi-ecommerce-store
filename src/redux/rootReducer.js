import { combinedReducers } from 'redux';
import { cartReducer } from './cartReducer';

const rootReducer = combinedReducers({
    cartReducer : cartReducer
})

export default rootReducer
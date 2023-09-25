import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import categoryReducer from '../features/category/categorySlice';
import brandReducer from '../features/brand/brandSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        navigation: navigationReducer,
        category: categoryReducer,
        brand: brandReducer,
    },
});

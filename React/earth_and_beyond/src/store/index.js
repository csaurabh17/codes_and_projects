import { createStore, combineReducers } from 'redux'
import  categories_data  from './reducers/gallery_categories'
export function initStore() {

    const reducers = combineReducers({

        categories_data,
        data1: (state = [], action) => {
            return ['1', '2', '3']
        }
    });
const store = createStore(reducers);
return store;
}

// export default store;
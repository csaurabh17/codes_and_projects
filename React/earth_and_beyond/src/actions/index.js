import { categories_data } from '../store/data'


export const category_action = () => {
    return {
        type: "FETCH_GALLERY",
        categories :  categories_data
    }
}



const categories_reducer = (state = [], action) => {
    debugger
    if (action.type === 'FETCH_GALLERY') { return action.categories; } else {
        return state;
    }

}

export default categories_reducer;
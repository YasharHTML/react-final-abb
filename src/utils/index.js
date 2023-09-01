export const getStateFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const getStateFromLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key)!);
};

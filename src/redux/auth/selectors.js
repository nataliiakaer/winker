/* Для того щоб в компоненті отримати дані зі стору, у бібліотеці React Redux є хук useSelector(selector). 
Аргументом він приймає функцію (селектор), яка оголошує один параметр state - весь об'єкт стану Redux, який буде автоматично переданий функції хуком useSelector. 
Ця функція називається селектором і повинна повернути тільки ту частину стану, яка необхідна компоненту.*/

// Якщо виникне помилка, користувач побачить її в інтерфейсі.

export const selectorAuthUser = (state) => state.auth.user;
export const selectorAuthToken = (state) => state.auth.token;
export const selectorAuthIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectorAuthIsRefreshing = (state) => state.auth.isRefreshing;
export const selectorAuthError = (state) => state.auth.error;

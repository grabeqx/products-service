const ACTION = {
    LOGIN: Symbol('LOGIN'),
    REGISTER: Symbol('REGISTER'),
    LOGIN_ERROR: Symbol('LOGIN_ERROR'),
    CLEAR_LOGIN_ERROR: Symbol('CLEAR_LOGIN_ERROR'),
    SET_USER_ID: Symbol('SET_USER_ID'),
    GET_PRODUCTS: Symbol('GET_PRODUCTS'),
    GET_USER_PRODUCTS: Symbol('GET_USER_PRODUCTS'),
    HIDE_LOADER: Symbol('HIDE_LOADER'),
    SHOW_LOADER: Symbol('SHOW_LOADER')
};

export default ACTION;
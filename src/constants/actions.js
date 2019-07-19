const ACTION = {
    LOGIN: Symbol('LOGIN'),
    REGISTER: Symbol('REGISTER'),
    LOGIN_ERROR: Symbol('LOGIN_ERROR'),
    CLEAR_LOGIN_ERROR: Symbol('CLEAR_LOGIN_ERROR'),
    SET_USER_ID: Symbol('SET_USER_ID'),
    GET_PRODUCTS: Symbol('GET_PRODUCTS'),
    GET_USER_PRODUCTS: Symbol('GET_USER_PRODUCTS'),
    HIDE_LOADER: Symbol('HIDE_LOADER'),
    SHOW_LOADER: Symbol('SHOW_LOADER'),
    FILTER_USER_PRODUCTS: Symbol('FILTER_USER_PRODUCTS'),
    SET_STATUS_SERVICE: Symbol('SET_STATUS_SERVICE'),
    SHOW_MESSAGE: Symbol('SHOW_MESSAGE'),
    HIDE_MESSAGE: Symbol('HIDE_MESSAGE'),
    SET_PROFILE: Symbol('SET_PROFILE'),
    CHANGE_SERVICE_STATUS: Symbol('CHANGE_SERVICE_STATUS'),
    CHANGE_REPORT_STATUS: Symbol('CHANGE_REPORT_STATUS')
};

export default ACTION;
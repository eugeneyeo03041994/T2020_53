import {combineReducers, createStore} from 'redux';

const getInitialUser = () => {
    if (window && window.localStorage) {
        return window.localStorage.getItem("user");
    } else {
        return null;
    }
};

const INITIAL_STATE = {
    user: getInitialUser()
};

const appReducer = (state = INITIAL_STATE, action) => {
    const reducerMap = {
        setUser(){
            if (window && window.localStorage) {
                window.localStorage.setItem("user", action.user);
            }
            return {
                ...state,
                user: action.user
            };
        },
        signOut() {
            if (window && window.localStorage) {
                window.localStorage.clear();
            }
            return {user: null};
        }
    };
    if (!!action.type && !!reducerMap[action.type]) {
        return reducerMap[action.type]();
    } else {
        return state;
    }
};

const rootReducer = combineReducers({
    appState: appReducer
});
const AppRedux = createStore(rootReducer);
export default AppRedux;

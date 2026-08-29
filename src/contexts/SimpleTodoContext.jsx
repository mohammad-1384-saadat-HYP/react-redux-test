import {createContext, useContext, useEffect, useState} from "react";

const SimpleTodoContext = createContext();

export const SimpleTodoProvider = ({store, children}) => {
    return (
        <SimpleTodoContext.Provider value={{store}}>
            {children}
        </SimpleTodoContext.Provider>
    );
};

export const useDispatch = () => {
    const {dispatch} = useContext(SimpleTodoContext);

    if (!dispatch) {
        throw new Error("use Provider before invoked useDispatch");
    }

    return dispatch;
}

export const useSelector = (selector) => {
    const [, setForceUpdate] = useState(0);
    const {getState,subscribe} = useContext(SimpleTodoContext);

    useEffect(() => {
        const unSubscribe = subscribe(() => setForceUpdate(state => state + 1));

        return () => unSubscribe()
    }, []);

    if (!getState) {
        throw new Error("use Provider before invoked useSelector");
    }

    return getState(getState());
}
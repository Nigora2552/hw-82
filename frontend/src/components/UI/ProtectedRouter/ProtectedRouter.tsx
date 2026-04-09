import React from 'react';
import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";

interface Props  extends React.PropsWithChildren{
    isAllowed: boolean | null;
}

const ProtectedRouter: React.FC<Props> = ({isAllowed, children}) => {
    if(!isAllowed){
        toast.warning('Your are not allowed to access this page');
        return  <Navigate to='/login'/>
    }

    return children;
};

export default ProtectedRouter;
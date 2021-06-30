
import React, {useEffect} from "react";
import { useSelector } from "react-redux";

const ErrorsPanel = () => {
    const error = useSelector((state: any) => state.common.error);


    useEffect(() => {
        //reset error
    }, []);

    return (
        <div className="my-5">
            {error && (
                <h5>{error}</h5>
            )}
        </div>
    );
    };

export default ErrorsPanel;
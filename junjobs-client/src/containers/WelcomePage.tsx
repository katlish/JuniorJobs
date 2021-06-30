
import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";

const WelcomePage = ({isConfirmed, verifyEmail}: any) => {
    let { confirmationCode } = useParams<{ confirmationCode: string }>();

    useEffect(() => {
        verifyEmail(confirmationCode);
    }, [isConfirmed]);

    return (
        <div className="container">
        <header className="jumbotron">
            <h3>
                {isConfirmed ? <strong>Account confirmed!</strong> : <strong>Confirmation failed!</strong>}
            </h3>
        </header>
        <Link to={"/login"} className="nav-link">
            Please Login
        </Link>
        </div>
    );
    };

export default WelcomePage;
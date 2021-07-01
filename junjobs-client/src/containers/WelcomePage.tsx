
import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorsPanel from "../components/ErrorsPanel/ErrorsPanel";
import { IWelcomePage } from "../types";


const WelcomePage = ({verifyEmail, resendEmail}: IWelcomePage) => {
    let { confirmationCode } = useParams<{ confirmationCode: string }>();
    const isEmailConfirmed = useSelector((state: any) => state.user.isEmailConfirmed);

    const [inputVal, setInput] = useState("");

    useEffect(() => {
        verifyEmail(confirmationCode);
    }, [isEmailConfirmed]);

    const onSend = (e: any) => {
        e.preventDefault();
        resendEmail(inputVal);
    }

    return (
        <div className="container text-center">
            {isEmailConfirmed ? 
            <>
                <strong>Account confirmed!</strong> 
                <Link to={"/login"} className="nav-link">
                    Please Login
                </Link>
            </>
            : 
            <div className="d-flex flex-column bg-dark text-white p-3">
                <h3 className="my-3">Confirmation failed!</h3>
                <form className="d-flex justify-content-center">
                    <input placeholder="email" value={inputVal} onChange={(e)=> setInput(e.target.value)} type="email" className="form-control w-auto" id="exampleInputEmail1"/>
                    <button type="submit" className="btn btn-primary" onClick={onSend}>Resend</button>
                </form>
                <ErrorsPanel/>
            </div>
            }
        </div>
    );
    };

export default WelcomePage;
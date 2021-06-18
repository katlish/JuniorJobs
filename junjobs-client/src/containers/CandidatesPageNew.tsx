import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCandidates, setCountry, toggleIsRemote } from "../store/actions/candidates";
import { filterCandidates } from '../store/selectors/candidates';
import { ItemCard, Candidate } from "../types";
import GenericPageWithCards from "./GenericPageWithCards";


const formatCandidateItemsToItemCard = (candidates: Candidate[]): ItemCard[] => {
    return candidates.map((candidate: Candidate) => ({
        externalId: candidate._id,
        logo: "https://www.flaticon.com/svg/static/icons/svg/1484/1484861.svg",
        title: candidate.name,
        subtitle: candidate.yearsOfExperience.toString(),
        location: candidate.location,
        createdAt: candidate.createdAt,
        description: candidate.description,
        url: candidate.url
    }))
}

const CandidatesPageNew = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCandidates());
    }, []);

    const visibleItems = useSelector(filterCandidates);
    const formattedVisibleItems = formatCandidateItemsToItemCard(visibleItems);
    const isCandidatesLoading = useSelector((state: any) => state.candidates.isLoading);
    const isRemote = useSelector((state: any) => state.candidates.isRemote);
    // const isFavourite = useSelector((state: any) => state.jobs.isFavourite);
    const country = useSelector((state: any) => state.candidates.country);
    const candidatesError = useSelector((state: any) => state.candidates.error);
    // const userFavourites = useSelector((state: any) => state.user.data?.jobs);
    const role = useSelector((state: any) => state.user.data?.role);

    return (
        <GenericPageWithCards 
                visibleItems={formattedVisibleItems} 
                isLoading={isCandidatesLoading}  
                isRemote={isRemote}  
                isFavourite={false}  
                country={country} 
                error={candidatesError} 
                userFavourites={[]} 
                role={role} 
                toggleIsRemoteAction={toggleIsRemote} 
                //TODO: toggles and updates actions
                toggleIsFavouriteAction={()=>{}} 
                updateFavouritesAction={()=>{}} 
                addToFavouritesAction={()=>{}} 
                removeFromFavouritesAction={()=>{}} 
                setCountryAction={setCountry}
                remoteLabel="Remote Users"
                resultsText="Candidates Found"
                resultsTextForFavourites="Your Selected Candidates Jobs Found"
            />
    );
};

export default CandidatesPageNew;

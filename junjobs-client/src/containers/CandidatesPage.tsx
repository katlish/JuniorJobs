import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRole } from "src/store/constants/constants";
import { fetchCandidates } from "../store/actions/candidates";
import { setUserCandidate, removeUserCandidate} from "../store/actions/user";
import { toggleIsRemote, toggleIsFavourite, toggleIsBackend, toggleIsFrontend, toggleIsFullstack, setCountry } from "../store/actions/common";
import { filterCandidates } from '../store/selectors/candidates';
import { ItemCard, Candidate } from "../types";
import GenericPageWithCards from "./GenericPageWithCards";

const defaultLogo = "https://www.flaticon.com/svg/static/icons/svg/1484/1484861.svg";

const formatCandidateItemsToItemCard = (candidates: Candidate[]): ItemCard[] => {
    
    return candidates.map((candidate: Candidate) => {
        const tags: String[] = [];
        if(candidate.isremote){
            tags.push("remote");
        }
        if(candidate.jobs.length){
            candidate.jobs.map((tag: String) => {
                tags.push(tag);
            })
        }
        return {
            externalId: candidate._id,
            logo: defaultLogo,
            title: candidate.name,
            subtitle: `Work Experience: ${candidate.yearsOfExperience.toString()}`,
            location: candidate.location,
            createdAt: candidate.createdAt,
            description: candidate.description,
            url: candidate.url,
            tags: tags
        }
    })
}

const CandidatesPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCandidates());
    }, []);

    const visibleItems = useSelector(filterCandidates);
    const formattedVisibleItems = formatCandidateItemsToItemCard(visibleItems);
    const isCandidatesLoading = useSelector((state: any) => state.candidates.isLoading);
    const isRemote = useSelector((state: any) => state.common.isRemote);
    const isFavourite = useSelector((state: any) => state.common.isFavourite);
    const country = useSelector((state: any) => state.common.country);
    const candidatesError = useSelector((state: any) => state.common.error);
    const userFavourites = useSelector((state: any) => state.user.data?.candidates);
    const role = useSelector((state: any) => state.user.data?.role);

    return (
        <GenericPageWithCards 
                visibleItems={formattedVisibleItems} 
                isLoading={isCandidatesLoading}  
                isRemote={isRemote}  
                isFavourite={isFavourite}  
                country={country} 
                error={candidatesError} 
                userFavourites={userFavourites} 
                role={role} 
                toggleIsRemoteAction={toggleIsRemote} 
                toggleIsBackendAction={toggleIsBackend}
                toggleIsFrontendAction={toggleIsFrontend}
                toggleIsFullstackAction={toggleIsFullstack}
                toggleIsFavouriteAction={toggleIsFavourite} 
                addToFavouritesAction={setUserCandidate} 
                removeFromFavouritesAction={removeUserCandidate} 
                setCountryAction={setCountry}
                remoteLabel="Remote Candidates"
                selectedItemsLabel="My Selected Candidates"
                isFilterHidden={role === userRole.CANDIDATE}
                resultsText="Candidates Found"
                resultsTextForFavourites="Your Selected Candidates Found"
                cardsWithAddCheckbox={role === userRole.HR}
            />
    );
};

export default CandidatesPage;

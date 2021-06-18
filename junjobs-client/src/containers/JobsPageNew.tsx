import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserJob, removeUserJob, updateUserJobs } from "../store/actions/user";
import { fetchJobs, toggleIsRemote, toggleIsFavourite, setCountry } from "../store/actions/jobs";
import { filterJobs } from '../store/selectors/jobs';
import GenericPageWithCards from "./GenericPageWithCards";
import { Job, ItemCard } from "../types";


const formatJobItemsToItemCard = (jobItems: Job[]): ItemCard[] => {
    return jobItems.map((job: Job) => ({
        externalId: job.externalId,
        logo: job.company_logo,
        title: job.title,
        subtitle: job.company,
        location: job.location,
        createdAt: job.createdAt,
        description: job.description,
        url: job.url
    }))
}

const JobsPageNew = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchJobs());
    }, []);

    const visibleItems = useSelector(filterJobs);
    const formattedVisibleItems = formatJobItemsToItemCard(visibleItems);
    const isJobsLoading = useSelector((state: any) => state.jobs.isLoading);
    const isRemote = useSelector((state: any) => state.jobs.isRemote);
    const isFavourite = useSelector((state: any) => state.jobs.isFavourite);
    const country = useSelector((state: any) => state.jobs.country);
    const jobsError = useSelector((state: any) => state.jobs.error);
    const userFavourites = useSelector((state: any) => state.user.data?.jobs);
    const role = useSelector((state: any) => state.user.data?.role);

    return (
        <GenericPageWithCards 
            visibleItems={formattedVisibleItems} 
            isLoading={isJobsLoading}  
            isRemote={isRemote}  
            isFavourite={isFavourite}  
            country={country} 
            error={jobsError} 
            userFavourites={userFavourites} 
            role={role} 
            toggleIsRemoteAction={toggleIsRemote} 
            toggleIsFavouriteAction={toggleIsFavourite} 
            updateFavouritesAction={updateUserJobs} 
            addToFavouritesAction={setUserJob} 
            removeFromFavouritesAction={removeUserJob} 
            setCountryAction={setCountry}
            remoteLabel="Remote Jobs"
            resultsText="Software Jobs Found"
            resultsTextForFavourites="Your Selected Software Jobs Found" 
        />
    );
};

export default JobsPageNew;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserJob, removeUserJob } from "../store/actions/user";
import { fetchJobs } from "../store/actions/jobs";
import { toggleIsRemote, toggleIsFavourite, toggleIsBackend, toggleIsFrontend, toggleIsFullstack, setCountry } from "../store/actions/common";
import { filterJobs } from '../store/selectors/jobs';
import GenericPageWithCards from "./GenericPageWithCards";
import { Job, ItemCard } from "../types";
import { userRole } from "src/store/constants/constants";


const formatJobItemsToItemCard = (jobItems: Job[]): ItemCard[] => {
    return jobItems.map((job: Job) => {
        const tags: String[] = [];
        if(job.isremote){
            tags.push("remote");
        }
        if(job.jobs.length){
            job.jobs.map((tag: String) => {
                tags.push(tag);
            })
        }
        return {
            externalId: job.externalId,
            logo: job.company_logo,
            title: job.title,
            subtitle: job.company,
            location: job.location,
            createdAt: job.createdAt,
            description: job.description,
            url: job.url,
            tags: tags
        }
    })
}

const JobsPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchJobs());
    }, []);

    const visibleItems = useSelector(filterJobs);
    const formattedVisibleItems = formatJobItemsToItemCard(visibleItems);
    const isJobsLoading = useSelector((state: any) => state.jobs.isLoading);
    const isRemote = useSelector((state: any) => state.common.isRemote);
    const isFavourite = useSelector((state: any) => state.common.isFavourite);
    const country = useSelector((state: any) => state.common.country);
    const jobsError = useSelector((state: any) => state.common.error);
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
            toggleIsBackendAction={toggleIsBackend}
            toggleIsFrontendAction={toggleIsFrontend}
            toggleIsFullstackAction={toggleIsFullstack}
            toggleIsFavouriteAction={toggleIsFavourite} 
            addToFavouritesAction={setUserJob} 
            removeFromFavouritesAction={removeUserJob} 
            setCountryAction={setCountry}
            remoteLabel="Remote Jobs"
            selectedItemsLabel="My Selected Jobs"
            isFilterHidden={role === userRole.HR}
            resultsText="Software Jobs Found"
            resultsTextForFavourites="Your Selected Software Jobs Found" 
            cardsWithAddCheckbox={role === userRole.CANDIDATE}
        />
    );
};

export default JobsPage;

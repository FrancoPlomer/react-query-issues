import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { githubApi } from '../../api/githubApi';
import { Issue } from '../interfaces';

const getIssueInfo = async ( issueNumber: number ) : Promise<Issue> => {

    const { data } = await githubApi.get<Issue>(`/issues/${ issueNumber }`);

    return data;
}

const getIssueComments = async ( issueNumber: number ) : Promise<Issue[]> => {

    const { data } = await githubApi.get<Issue[]>(`/issues/${ issueNumber }/comments`);

    return data;
}

export const useIssue = ( issueNumber: number ) => {
    
    const issueQuery = useQuery({
        queryKey: [ 'issue', issueNumber ],
        queryFn: () => getIssueInfo( issueNumber )
    });

    const issueComentQuery = useQuery({
        queryKey: [ 'issue', issueNumber, 'comments' ],
        queryFn: () => getIssueComments( issueQuery.data!.number ),
        //De la sig manera le indicamos a useQuery que no dispare la peticion hasta que este lista la de issueQuery
        enabled: Boolean( issueQuery.data )
    });
    
    return {
        issueQuery, issueComentQuery
    }
}

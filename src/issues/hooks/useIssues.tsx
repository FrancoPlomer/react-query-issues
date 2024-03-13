import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue, State } from '../interfaces';
import { useEffect, useState } from 'react';

interface Props {
    state?: State;
    labels: string[];
    page?: number;
}

const getIssues = async ({ labels, state, page = 1 }: Props): Promise<Issue[]> => {

    const params = new URLSearchParams();

    if( state ) params.append( 'state', state );

    if( labels.length > 0 ) {
        
        const labelString = labels.join( ',' );

        params.append( 'labels', labelString );
    }

    params.append( 'page', page.toString() );
    params.append( 'per_page', '5' );

    const { data } = await githubApi.get<Issue[]>('/issues', { params });

    return data;
}

export const useIssues = ( { state, labels } : Props ) => {

    const [ page, setPage ] = useState( 1 );

    const issuesQuery = useQuery({
        //Si tenemos caches que pueden llegar o no, para que no actualice el cache a cada rato los ponemos entre llaves como a continuación
        queryKey: [ 'issues', { state, labels, page } ],
        queryFn: () => getIssues({ labels, state, page })
    });

    const handlePage = ( e: any ) => {

        if( Boolean( !issuesQuery.data?.length ) ) return

        const acc = e.target.name === 'page-next' ? 
        0 + 1 : 
        page !== 1 ? 
        0 - 1 : 
        0;

        setPage( page + acc );
    }

    useEffect(() => {
        setPage( 1 );
    }, [state, labels])

    return {
        issuesQuery, page: issuesQuery.isFetching ? 'Loading' : page, handlePage
    }
}

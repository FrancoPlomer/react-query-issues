import { useInfiniteQuery } from '@tanstack/react-query'
import { Issue, State } from '../interfaces';
import { githubApi } from '../../api/githubApi';

interface Props {
    state?: State;
    labels: string[];
    page?: number;
}

interface QueryProps {
    pageParam?: number;
    queryKey: ( string | Props )[];

}

const getIssues = async ( { pageParam = 1, queryKey }: QueryProps ): Promise<Issue[]> => {

    //De la queryKey solo necesito los argumentos
    
    const [ ,, args ] = queryKey;

    const { state, labels } = args as Props;

    const params = new URLSearchParams();

    if( state ) params.append( 'state', state );

    if( labels.length > 0 ) {
        
        const labelString = labels.join( ',' );

        params.append( 'labels', labelString );
    }

    params.append( 'page', pageParam.toString() );
    params.append( 'per_page', '5' );

    const { data } = await githubApi.get<Issue[]>('/issues', { params });

    return data;
}

export const useIssuesInfinite = ({ state, labels }: Props) => {
    
    const issuesQuery = useInfiniteQuery({
        queryKey: [ 'issues', 'infinite', { state, labels } ],
        //el parametro queryKey es la informacion que tenemos arriba
        queryFn: ( data ) => getIssues( data ),
        initialPageParam: 1,
        getNextPageParam: ( lastPage, pages ) => (
            lastPage.length !== 0 ? 
            pages.length + 1 : 
            pages.length
        )
    })
    
    return {
        issuesQuery
    }
}

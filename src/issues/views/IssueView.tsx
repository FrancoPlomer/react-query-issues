import { Link, Navigate, useParams  } from 'react-router-dom';
import { IssueComment     } from '../components/IssueComment';
import { useIssue } from '../hooks/useIssue';
import { LoadingIcon } from '../../shared/components/LoadingIcon';

export const IssueView = () => {
  
  const { id = '0' } = useParams();

  const { issueQuery, issueComentQuery } = useIssue( +id );


  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to='./issues/list'>Go Back</Link>
      </div>
      {
        issueQuery.isLoading
        ?
          <LoadingIcon />
        :
        issueQuery.data
        ?
        <>
          <IssueComment issue={ issueQuery.data } />
          {
            issueComentQuery.data?.map( issue => (
              <IssueComment key={ issue.id } issue={ issue } />
            ))
          }
        </>
        :
          <Navigate to='./issues/list' />
      }
    </div>
  )
}

import { FC             } from 'react';
import { Issue, State   } from '../interfaces';
import { useNavigate    } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { 
    getIssueInfo, getIssueComments   
} from '../hooks/useIssue';
import { 
    FiCheckCircle, FiInfo, FiMessageSquare 
} from 'react-icons/fi';


interface Props {
    issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {

    const navigate      = useNavigate();
    const queryClient   = useQueryClient();

    //Solicita la informacion sobre el issue y sus coments de manera rapida ante un evento
   
    // const prefetchData = () => {

    //     queryClient.prefetchQuery({
    //         queryKey: [ 'issue', issue.number ],
    //         queryFn: () => getIssueInfo( issue.number ),
    //     })
    //     queryClient.prefetchQuery({
    //         queryKey: [ 'issue', issue.number, 'comments' ],
    //         queryFn: () => getIssueComments( issue.number ),
    //     })
    // }

    const preSetData = () => {
        queryClient.setQueryData(
            [ 'issue', issue.number ], 
            issue,
            {
                updatedAt: new Date().getTime() + 10000,
            }
        )        
    }

    return (
        <div 
        className="card mb-2 issue"
        onClick={ () => navigate( `/issues/issue/${ issue.number }` ) }
        onMouseEnter={ preSetData }
        >
            <div className="card-body d-flex align-items-center">
                {
                    issue.state === State.Open ?
                    <FiInfo size={30} color="red" /> :
                    <FiCheckCircle size={30} color="green" />
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{ issue.title }</span>
                        <span className="issue-subinfo">
                            { 
                                `#${ issue.number } opened 2 days ago by `
                            }
                        <span className='fw-bold'>
                            { 
                                issue.user.login
                            }
                        </span>
                    </span>
                </div> 

                <div className='d-flex align-items-center'>
                    <img src={ issue.user.avatar_url } alt="User Avatar" className="avatar" />
                    <span className='px-2'>{ issue.comments }</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}

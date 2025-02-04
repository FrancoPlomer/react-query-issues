import { useState     } from 'react';
import { State        } from '../interfaces';
import { useIssues    } from '../hooks/useIssues';
import { IssueList    } from '../components/IssueList';
import { LabelPicker  } from '../components/LabelPicker';
import { LoadingIcon  } from '../../shared/components/LoadingIcon';


export const ListView = () => {

  const [ state, SetState                   ] = useState<State>();
  const [ selectedLabels, setSelectedLabels ] = useState<string[]>( [] );
  
  const { issuesQuery, page, handlePage } = useIssues({ state, labels: selectedLabels });
  const onLabelChange = ( label: string ) => selectedLabels.includes( label )
  ? setSelectedLabels( selectedLabels.filter( labelName => labelName !== label ) )
  : setSelectedLabels([ ...selectedLabels, label ])
  
  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading ?
          <LoadingIcon /> :
          <IssueList 
            issues={ issuesQuery.data || [] } 
            state={ state }
            onStateChanged={ newState => SetState( newState ) }
          />
        }
        <div className='d-flex mt-2 justify-content-between align-items-center'>
          <button 
            name='page-prev' 
            onClick={ handlePage } 
            disabled={ issuesQuery.isFetching }
            className='btn btn-outline-primary'
          >
            prev
          </button>
          <span>{ page }</span>
          <button 
            name='page-next' 
            onClick={ handlePage } 
            disabled={ issuesQuery.isFetching }
            className='btn btn-outline-primary'
          >
            next
          </button>
        </div>
      </div>
      <div className="col-4">
        <LabelPicker 
            selectedLabel={ selectedLabels }
            onChange={ ( labelName:string ) => onLabelChange( labelName ) }
        />
      </div>
    </div>
  )
}

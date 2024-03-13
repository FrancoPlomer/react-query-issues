import { useState           } from 'react';
import { State              } from '../interfaces';
import { IssueList          } from '../components/IssueList';
import { LabelPicker        } from '../components/LabelPicker';
import { useIssuesInfinite  } from '../hooks/useIssuesInfinite';
import { LoadingIcon        } from '../../shared/components/LoadingIcon';


export const ListViewInfinite = () => {

  const [ state, SetState                   ] = useState<State>();
  const [ selectedLabels, setSelectedLabels ] = useState<string[]>( [] );
  
  const { issuesQuery } = useIssuesInfinite({ state, labels: selectedLabels });
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
            //Como es un arreglo de arreglos usamos el flat para que pase a ser un unico arreglo
            issues={ issuesQuery.data?.pages.flat() || [] } 
            state={ state }
            onStateChanged={ newState => SetState( newState ) }
          />
        }
        <button 
          disabled={ !issuesQuery.hasNextPage }
          className='btn btn-outline-primary mt-2'
          onClick={ () => issuesQuery.fetchNextPage() }
        >
          Load more...
        </button>
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

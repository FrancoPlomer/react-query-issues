import { useState     } from 'react';
import { useIssues    } from '../hooks/useIssues';
import { IssueList    } from '../components/IssueList';
import { LabelPicker  } from '../components/LabelPicker';
import { LoadingIcon } from '../../shared/components/LoadingIcon';


export const ListView = () => {

  const [ selectedLabels, setSelectedLabels ] = useState<string[]>( [] );

  const { issuesQuery } = useIssues();
  const onLabelChange = ( label: string ) => selectedLabels.includes( label )
  ? setSelectedLabels( selectedLabels.filter( labelName => labelName === label ) )
  : setSelectedLabels([ ...selectedLabels, label ])

  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading ?
          <LoadingIcon /> :
          <IssueList issues={ issuesQuery.data || [] } />
        }
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

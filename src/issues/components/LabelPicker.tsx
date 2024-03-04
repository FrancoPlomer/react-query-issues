import { FC } from "react";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { useLabels   } from "../hooks/useLabels"

interface Props {
  selectedLabel: string[];
  onChange: ( labelName: string ) => void;
}
export const LabelPicker: FC<Props> = ({ selectedLabel, onChange }) => {

  const labelsQuery = useLabels();

  return (
    <>
      {
        labelsQuery.isLoading
        ?
        <LoadingIcon />
        :
        <>
          {
            labelsQuery?.data && 
            labelsQuery.data.map( label => (
              <span 
                key={ label.id }
                className={`badge rounded-pill m-1 label-picker ${ selectedLabel.includes( label.name ) && 'label-active' }`}
                style={{ border: `1px solid #${ label.color }`, color: `#${ label.color }` }}
                onClick={ _ => onChange( label.name ) }
              >
                { label.name }
              </span>
            ))
          }
        </>
      }
    </>
  )
}
import * as React from 'react';
import { ClipLoader } from 'react-spinners';
import "./Spinner.css";

interface ISpinnerProps {
    isLoading?: boolean
}

export const Spinner: React.FC<ISpinnerProps> = ({isLoading = true}) => {
    return (
      <>
        <div id='loading-spinner'>
            <ClipLoader 
            color='#36d7b7'
            loading={isLoading}
            size={35}
            aria-label='Loading Spinner'
            data-tested="loader"
            />
        </div>
      </>
    );
};

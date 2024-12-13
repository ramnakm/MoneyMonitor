import * as React from 'react';
import { useOutletContext } from 'react-router';
import { CompanyTenK } from '../../company';
import { getTenk } from '../../api';
import { TenKFinderItem } from './TenKFinderItem/TenKFinderItem';
import { Spinner } from '../Spinner/Spinner';

interface ITenKFinderProps {
    ticker: string;
}

export const TenKFinder: React.FC<ITenKFinderProps> = ({ticker}) => {
    const[companyData,setCompanyData]=React.useState<CompanyTenK[]>();
    React.useEffect(() => {
        const getTenKData = async() => {
            const result = await getTenk(ticker);
            setCompanyData(result?.data)
        }
        getTenKData();
    },[ticker])
    return (
      <div className='inline-flex rounded-md shadow-sm m-4'>
        {
            companyData ? (
                companyData.slice(0,5).map((tenk) => {
                    return <TenKFinderItem tenK={tenk}/>
                })
            ) : (
                <Spinner />
            )
        }
      </div>
    );
};

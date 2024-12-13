import * as React from 'react';
import { CompanyBalanceSheet } from '../../company';
import { useOutletContext } from 'react-router';
import { getBalanceSheet } from '../../api';
import { Table } from '../Table/Table';
import { RatioList } from '../RatioList/RatioList';
import { Spinner } from '../Spinner/Spinner';
import { formatLargeMonetaryNumber } from '../Helpers/NumberFormatting';

interface IBalanceSheetProps {
    
}

const config = [
  {
    label: <div className="font-bold">Total Assets</div>,
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalAssets),
  },
  {
    label: "Current Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalCurrentAssets),
  },
  {
    label: "Total Cash",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.cashAndCashEquivalents),
  },
  {
    label: "Property & equipment",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.propertyPlantEquipmentNet),
  },
  {
    label: "Intangible Assets",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.intangibleAssets),
  },
  {
    label: "Long Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.longTermDebt),
  },
  {
    label: "Total Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.otherCurrentLiabilities),
  },
  {
    label: <div className="font-bold">Total Liabilites</div>,
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalLiabilities),
  },
  {
    label: "Current Liabilities",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalCurrentLiabilities),
  },
  {
    label: "Long-Term Debt",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.longTermDebt),
  },
  {
    label: "Long-Term Income Taxes",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.otherLiabilities),
  },
  {
    label: "Stakeholder's Equity",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.totalStockholdersEquity),
  },
  {
    label: "Retained Earnings",
    render: (company: CompanyBalanceSheet) =>
      formatLargeMonetaryNumber(company.retainedEarnings),
  },
  ];

export const BalanceSheet: React.FC<IBalanceSheetProps> = (props) => {
    const ticker=useOutletContext<string>();
    const[balanceSheet,setBalanceSheet]=React.useState<CompanyBalanceSheet>();
    React.useEffect(() => {
        const balanceSheetFetch = async () => {
            const result = await getBalanceSheet(ticker);
            setBalanceSheet(result!.data[0]);
            console.log(result);
        }
        balanceSheetFetch();
    },[])
    return (
        balanceSheet ? (
      <>
      <RatioList config={config} data={balanceSheet}/>
      </>
      ) : (
        <Spinner />
      )
    );
};

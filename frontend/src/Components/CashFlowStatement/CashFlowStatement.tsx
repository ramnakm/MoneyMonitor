import * as React from 'react';
import { CompanyCashFlow } from '../../company';
import { useOutletContext } from 'react-router';
import { getCashFlowStatement } from '../../api';
import { Table } from '../Table/Table';
import { Spinner } from '../Spinner/Spinner';
import { formatLargeMonetaryNumber } from '../Helpers/NumberFormatting';

interface ICashFlowStatementProps {
}

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow),
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(
        company.netCashUsedProvidedByFinancingActivities
      ),
  },
  {
    label: "Cash At End of Period",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
  },
  {
    label: "CapEX",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.capitalExpenditure),
  },
  {
    label: "Issuance Of Stock",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.commonStockIssued),
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow),
  },
  ];

export const CashFlowStatement: React.FC<ICashFlowStatementProps> = (props) => {
    const ticker=useOutletContext<string>();
    const[cashFlowStatement,setCashFlowStatement]=React.useState<CompanyCashFlow[]>();

    React.useEffect(() => {
        const getCashFlow = async () => {
            const result = await getCashFlowStatement(ticker!);
            setCashFlowStatement(result?.data)
        };
        getCashFlow();
    },[])
    return (
        cashFlowStatement ? (
      <>
        <Table config={config} data={cashFlowStatement}/>
      </>
        ) : (
            <Spinner/>
        )
    );
};

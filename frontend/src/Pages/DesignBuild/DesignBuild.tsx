import * as React from 'react';
import { Table } from '../../Components/Table/Table';
import { RatioList } from '../../Components/RatioList/RatioList';
import { CompanyKeyMetrics } from '../../company';
import { testIncomeStatementData } from '../../Components/Table/testData';

interface IDesignPageProps {
}

const tableConfig = [
    {
      label: "Market Cap",
      render: (company: any) => company.marketCapTTM,
      subTitle: "Total value of all a company's shares of stock",
    }
]
export const DesignBuild: React.FC<IDesignPageProps> = (props) => {
    return (
      <div>
        <h1>Design Build</h1>
        <h2> This page will house various design aspects of the App</h2>
        <RatioList data={testIncomeStatementData} config={tableConfig}/>
        <Table config={tableConfig} data={testIncomeStatementData}/>
      </div>
    );
};

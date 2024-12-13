import * as React from 'react';
import { useState } from 'react';
import { CompanySearch } from '../../company';
import { searchCompanies } from '../../api';
import { Navbar } from '../../Components/Navbar/Navbar';
import { Search } from '../../Components/Search/Search';
import { ListPortfolio } from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';
import { PortfolioGet } from '../../Models/Portfolio';
import { porfolioAddAPI, porfolioDeleteAPI, portfolioGetAPI } from '../../Services/PortfolioService';
import { toast } from 'react-toastify';
import { error } from 'console';

interface ISearchPageProps {
}

export const SearchPage: React.FC<ISearchPageProps> = (props) => {
  
  const [search,setSearch]=React.useState<string>("");
  const [portfolioValues,setPortfolioValues]=useState<PortfolioGet[] | null>([]);
  const [searchResult,setSearchResult]=useState<CompanySearch[]>([]);
  const [serverError,setServerError]=useState<string>("");

    const handleSearchChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
      setSearch(e.target.value)
      //console.log(e);
    };

    React.useEffect(() => {
      getPorfolio();
    },[])

    const getPorfolio = () => {
      portfolioGetAPI().then((res) => {
        if(res?.data){
          setPortfolioValues(res?.data);
        }
      }).catch((e) => {
        toast.warning("Could not get porfolio values"); 
      })
    }

    const onPortfolioCreate = (e:any) => {
      e.preventDefault();
      porfolioAddAPI(e.target[0].value).then((res) => {
        if(res?.status == 204){
          getPorfolio();
          toast.success("Stock added to Portfolio!");
        }
      }).catch((e) => {
        toast.warning("Unable to Add Portfolio")
      })
    }
    const onPortfolioDelete=(e:any)=>{
      e.preventDefault();
      porfolioDeleteAPI(e.target[0].value).then((res) => {
        if(res?.status == 200){
          toast.success("Stock deleted from Portfolio");
          getPorfolio();
        }
      }).catch((e) => {
        toast.warning("Unable to delete stock from Portfolio");
      })
    }
    const onSearchSubmit = async (e:React.SyntheticEvent) => {
      e.preventDefault();
      const result=await searchCompanies(search);
      if(typeof(result)==="string"){
        setServerError(result);
      }
      else if(Array.isArray(result.data))
      {
        setSearchResult(result.data)
      } 
      console.log(searchResult);       
    }
    return (
      <>
      <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange}/>
      <ListPortfolio portfolioValues={portfolioValues!} onPortfolioDelete={onPortfolioDelete}/>
      {serverError ?? <h1>{serverError}</h1>}
      <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate}/>
      </>
    );
};

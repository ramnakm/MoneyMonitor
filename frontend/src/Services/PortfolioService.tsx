import axios from "axios";
import { handleError } from "../Components/Helpers/ErrorHandler";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";

const api = "http://localhost:5056/api/portfolio/"

export const porfolioAddAPI = async (symbol: string) => {
    try{
        const data = await axios.post<PortfolioPost>(api + `?Symbol=${symbol}`);
        return data;
    } catch (error){
        handleError(error);
    }    
}

export const porfolioDeleteAPI = async (symbol: string) => {
    try{
        const data = await axios.delete<PortfolioPost>(api + `?Symbol=${symbol}`);
        return data;
    } catch (error){
        handleError(error);
    }    
}

export const portfolioGetAPI = async () => {
    try{
        const data = await axios.get<PortfolioGet[]>(api);
        return data;
    } catch (error){
        handleError(error);
    }
}


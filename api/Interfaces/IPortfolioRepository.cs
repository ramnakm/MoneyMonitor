using System;
using api.Models;

namespace api.Interfaces;

public interface IPortfolioRepository
{
    Task<List<Stock>> GetUserPortfolio(AppUser user);
    Task<Portfolio> CreateAsync(Portfolio portfolio);
    Task<Portfolio> DeletePortfolioAsync(string appUserId, string symbol);
}

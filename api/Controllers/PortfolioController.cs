using System;
using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/portfolio")]
[ApiController]
public class PortfolioController : ControllerBase
{
    private readonly IPortfolioRepository _portfolioRepo;
    private readonly UserManager<AppUser> _userManager;
    private readonly IStockRepository _stockRepo;
    private readonly IFMPService _fMPService;
    public PortfolioController(UserManager<AppUser> userManager, IStockRepository stockRepo, IPortfolioRepository portfolioRepo, IFMPService fMPService)
    {
        _userManager=userManager;
        _stockRepo=stockRepo;
        _portfolioRepo = portfolioRepo; 
        _fMPService=fMPService;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult> GetUserPortfolio()
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);
        var portfolio = await _portfolioRepo.GetUserPortfolio(appUser);
        return Ok(portfolio);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult> CreatePortfolio(string symbol)
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);
        var stock = await _stockRepo.GetBySymbolAsync(symbol);  

        if(stock==null)
        {
            stock = await _fMPService.FindStockBySymbolAsync(symbol);
            if(stock==null)
            {
                return BadRequest("Stock does not exist");
            }
            else
            {
                await _stockRepo.CreateAsync(stock);
            }
            
        }

        var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);

        if(userPortfolio.Any(s=>s.Symbol.ToLower()==symbol.ToLower()))
            return BadRequest("Cannot Add stock to portfolio");

        var portfolioModel = new Portfolio
        {
            AppUserId = appUser.Id,
            StockId = stock.Id
        };
        
        await _portfolioRepo.CreateAsync(portfolioModel);

        if(portfolioModel==null)
        {
            return StatusCode(500, "Could not create");
        }
        else
        {
            return Created();
        }
    }

    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> DeletePortfolio(string symbol)
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);

        var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);

        var filteredStock = userPortfolio.Where(x=>x.Symbol.ToLower()==symbol.ToLower()).ToList();

        if(filteredStock.Count == 1)
        {
            await _portfolioRepo.DeletePortfolioAsync(appUser.Id,symbol);
        }
        else
        {
            return BadRequest("Stock not available in your portfolio");
        }
        
        return Ok();
    }
}

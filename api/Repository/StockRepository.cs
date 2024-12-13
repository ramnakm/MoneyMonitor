using System;
using api.Data;
using api.Dtos.Comment;
using api.Dtos.Stock;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repository;

public class StockRepository : IStockRepository
{
    private readonly ApplicationDBContext _context;
    public StockRepository(ApplicationDBContext context)
    {
        _context=context;
    }

    public async Task<Stock> CreateAsync(Stock stockModel)
    {
        await _context.Stocks.AddAsync(stockModel);
        await _context.SaveChangesAsync();
        return stockModel;
    }

    public async Task<Stock?> DeleteAsync(int id)
    {
        var stock = await _context.Stocks.FirstOrDefaultAsync(s=>s.Id==id);
        if(stock==null)
        {
            return null;
        }

        _context.Remove(stock);
        await _context.SaveChangesAsync();

        return stock;
    }

    public async Task<List<Stock>> GetAllAsync(QueryObject query)
    {
        //var stockModel = new List<Stock>();
        //foreach(Stock objStock in await _context.Stocks.ToListAsync())
        //{
            //objStock.Comments = await _context.Comments.Where(c => c.StockId ==objStock.Id).Select(s => s).ToListAsync();
            //stockModel.Add(objStock);
        //}

        var stockModel = _context.Stocks.AsQueryable();

        if(!string.IsNullOrWhiteSpace(query.CompanyName))
        {
            stockModel = stockModel.Where(s=>s.CompanyName==query.CompanyName);
        }
        if(!string.IsNullOrWhiteSpace(query.Symbol))
        {
            stockModel = stockModel.Where(s=>s.Symbol.Equals(query.Symbol, StringComparison.OrdinalIgnoreCase));
        }
        if(!string.IsNullOrWhiteSpace(query.SortBy))
        {
            stockModel = query.IsDescending ? stockModel.OrderByDescending(s=>s.Symbol) : stockModel.OrderBy(s=>s.Symbol);
        }
        var skipNumber= (query.PageNumber-1) * query.PageSize;

        var stocks = await stockModel.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        var stock = new List<Stock>();
        foreach(Stock objStock in stocks)
        {
            objStock.Comments = await _context.Comments.Where(c => c.StockId ==objStock.Id).Include(a => a.AppUser).Select(s => s).ToListAsync();
            
            stock.Add(objStock);
        }

        return stock;
    }

    public async Task<Stock?> GetByIdAsync(int id)
    {
        var stockModel= await _context.Stocks.FirstOrDefaultAsync(s=>s.Id==id);
        stockModel.Comments = await _context.Comments.Where(c => c.Id == id).Select(s => s).ToListAsync();
        return stockModel;
    }

    public async Task<Stock?> GetBySymbolAsync(string symbol)
    {
        var stockModel = await _context.Stocks.FirstOrDefaultAsync(s => s.Symbol == symbol);
        if(stockModel==null) return null;
        stockModel.Comments = await _context.Comments.Where(c => c.StockId == stockModel.Id).ToListAsync();
        return stockModel;
    }

    public Task<bool> StockExists(int id)
    {
        return _context.Stocks.AnyAsync(s=>s.Id==id);

    }

    public async Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto updateDto)
    {
        var stockModel = await _context.Stocks.FirstOrDefaultAsync(s=>s.Id==id);
        if(stockModel==null)
        {
            return null;
        }
        stockModel.Symbol=updateDto.Symbol;
        stockModel.CompanyName=updateDto.CompanyName;
        stockModel.Purchase=updateDto.Purchase;
        stockModel.LastDiv=updateDto.LastDiv;
        stockModel.Industry=updateDto.Industry;
        stockModel.MarketCap=updateDto.MarketCap;

        await _context.SaveChangesAsync();

        return stockModel;
    }
}

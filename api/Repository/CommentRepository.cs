using System;
using api.Data;
using api.Dtos.Comment;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repository;

public class CommentRepository : ICommentRepository
{
    private readonly ApplicationDBContext _context;
    public CommentRepository(ApplicationDBContext context)
    {
        _context=context;
    }

    public async Task<Comment> CreateAsync(int stockId, Comment commentModel)
    {
        await _context.Comments.AddAsync(commentModel);
        await _context.SaveChangesAsync();
        return commentModel;
    }

    public async Task<Comment> DeleteAsync(int id)
    {
        var commentModel= await _context.Comments.FirstOrDefaultAsync(c=>c.Id==id);
        if(commentModel==null)
        {
            return null;
        }
        _context.Remove(commentModel);
        await _context.SaveChangesAsync();
        return commentModel;
    }

    public async Task<List<Comment>> GetAllAsync(CommentQueryObject queryObject)
    {
        var comments = _context.Comments.Include(a => a.AppUser).AsQueryable();
        if(!string.IsNullOrWhiteSpace(queryObject.Symbol))
        {
            comments = comments.Where(s => s.Stock.Symbol==queryObject.Symbol);
        }
        if(queryObject.IsDescending)
        {
            comments = comments.OrderByDescending(c => c.DateCreated);
        }

        return await comments.ToListAsync();
    }

    public async Task<Comment?> GetByIdAsync(int id)
    {
        var commentModel=await _context.Comments.Include(a => a.AppUser).FirstOrDefaultAsync(c=>c.Id==id);
        if(commentModel==null)
        {
            return null;
        }
        return commentModel;
    }
}

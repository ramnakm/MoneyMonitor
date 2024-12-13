using System;
using api.Dtos.Comment;
using api.Helpers;
using api.Models;

namespace api.Interfaces;

public interface ICommentRepository
{
    Task<List<Comment>> GetAllAsync(CommentQueryObject queryObject);

    Task<Comment?> GetByIdAsync(int id);
    
    Task<Comment> CreateAsync(int stockId, Comment commentModel);

    Task<Comment> DeleteAsync(int id);
}

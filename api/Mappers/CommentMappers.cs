using System;
using api.Dtos.Comment;
using api.Models;

namespace api.Mappers;

public static class CommentMappers
{
    public static CommentDto ToCommentDto(this Comment commentDto)
    {
        return new CommentDto
        {
            Id=commentDto.Id,
            Title=commentDto.Title,
            Content=commentDto.Content,
            DateCreated=commentDto.DateCreated,
            StockId=commentDto.StockId,
            CreatedBy=commentDto.AppUser.UserName
        };  
    }

    public static Comment ToCreateCommentDto(this CreateCommentDto commentDto, int stockid)
    {
        return new Comment
        {
            Title=commentDto.Title,
            Content=commentDto.Content,
            StockId=stockid
        };  
    }
}

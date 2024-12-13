using System;
using api.Dtos.Comment;
using api.Dtos.Stock;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/comment")]
[ApiController]
public class CommentController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ICommentRepository _commentRepo;
    private readonly IStockRepository _stockRepo;
    private readonly IFMPService _fMPService;
    public CommentController(ICommentRepository commentRepo,IStockRepository stockRepo, UserManager<AppUser> userManager, IFMPService fMPService)
    {
        _commentRepo=commentRepo;
        _stockRepo=stockRepo;
        _userManager = userManager;
        _fMPService = fMPService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll([FromQuery] CommentQueryObject queryObject)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);
            
        var comments=await _commentRepo.GetAllAsync(queryObject);
        var commentDto=comments.Select(c=>c.ToCommentDto());

        return Ok(commentDto);
    }

    [HttpGet("{id:int}")]
    [Authorize]
    public async Task<ActionResult> GetById([FromRoute] int id)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);

        var comment = await _commentRepo.GetByIdAsync(id);
        if(comment==null)
        {
            return NotFound();
        }
        return Ok(comment.ToCommentDto());
    }

    [HttpPost("{symbol:alpha}")]
    
    public async Task<ActionResult> Create([FromRoute] string symbol, CreateCommentDto commentDto)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);

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
        
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);
        
        var commentModel= commentDto.ToCreateCommentDto(stock.Id);
        commentModel.AppUserId = appUser.Id;
        await _commentRepo.CreateAsync(stock.Id, commentModel);
        return CreatedAtAction(nameof(GetById), new{Id=commentModel.Id}, commentModel.ToCommentDto());
        
    }

    [HttpDelete]
    [Authorize]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        if(!ModelState.IsValid)
            return BadRequest(ModelState);

        var commentModel = await _commentRepo.DeleteAsync(id);
        if(commentModel==null)
        {
            return NotFound("Comment does not exist");
        }
        return Ok(commentModel);
    }
}

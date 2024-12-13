import React, { useEffect, useState } from 'react'
import StockCommentForm from './StockCommentForm/StockCommentForm';
import { commentGetAPI, commentPostAPI } from '../../Services/CommentService';
import { toast } from 'react-toastify';
import StockCommentList from '../StockCommentList/StockCommentList';
import { CommentGet } from '../../Models/Comment';
import { boolean } from 'yup';
import { Spinner } from '../Spinner/Spinner';

type Props = {
    stockSymbol: string;
}

type CommentFormInputs = {
    title: string;
    content: string;
}

const StockComment = ({ stockSymbol }: Props) => {
const [comments, setComments] = useState<CommentGet[] | null>(null);
const [loading, setLoading] = useState<boolean>();

useEffect(() => {
    getComments(); 
},[]);

    const handleComment = (e: CommentFormInputs) => {
        commentPostAPI(e.title,e.content,stockSymbol)
        .then((res)=>{
            if(res) {
                toast.success("Comment created succesfully")
            }
        }).catch((e) => {
            toast.warning(e);
        }) 
    }

    const getComments = () => {
        setLoading(true);
        commentGetAPI(stockSymbol).then((res) => {
            setComments(res?.data!);
            setLoading(false);
        })
    }
  return (
    <>
    <div className='flex flex-col'>
        {loading ? <Spinner /> : <StockCommentList comments={comments!}/>}
        <StockCommentForm symbol={stockSymbol} handleComment={handleComment}/>
    </div>
    </>
  )
}

export default StockComment
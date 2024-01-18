import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'

export default function News() {

    const [news, setNews] = useState([])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const pageSize = 6
    const constTotalres = 60

    const GetNews= async()=>{
        let url = await fetch(`https://newsapi.org/v2/everything?q=${search}&sortBy=popularity&apiKey=50f46624105d42288e5a0a4920316b2b&pageSize=${pageSize}&page=${currentPage}`)
        let x = await url.json()
        setNews(x.articles)
        if(x.articles){
            setTotalPage(Math.ceil(constTotalres/ pageSize))
        }
    }

    const searchMe=(e)=>{
        setSearch(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        setCurrentPage(1)
        setSearch(e.target.value)
    }

    useEffect(()=>{
        GetNews()
    },[search, currentPage])

    const handlePrevPage=()=>{
        if(currentPage > 1){
            setCurrentPage((prevPage)=> prevPage -1)
        }
    }
    const handleNextPage=()=>{
        if(currentPage < totalPage){
            setCurrentPage((prevPage)=> prevPage + 1)
        }
    }

    const handlePageChange=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    const renderPaginationButtons = ()=>{
        const paginationButton = [];

        if(totalPage){
            for(let page=  1; page <= totalPage; page++){
                paginationButton.push(
                    <button key={page} className={`pagination-button${currentPage === page ? '-active' : ''}`} onClick={()=>handlePageChange(page)}>
                    {page}</button>
                )
            }
            console.log(paginationButton)
        }
        return paginationButton
    }
        
    
  return (
    <div>

        <center><form className='search' onSubmit={handleSubmit}>
            <h3>Search News </h3>
            <input className='search_input' value={search} type='text' onChange={searchMe}></input><br/>
            <button className='btn-search' type='submit'>Submit</button>
        </form>
        </center>

        {news && <div className='card-wrap'>
        {console.log(news)}
        {news.map((element, index)=>{
            return <div key={index} className='card-item'>
                <Newsitem text = {element.content} title = {element.title} image = {element.urlToImage ? element.urlToImage : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" } urlpage = {element.url}/>
            </div>
        })}
    </div> }
    <center>
        
    <div className='pagination'>
        <button className='pagination-button' onClick={handlePrevPage}>Prev</button>
        {renderPaginationButtons()}
        <button className='pagination-button' onClick={handleNextPage}>Next</button>
    </div>
    </center>
    </div>
  )
}

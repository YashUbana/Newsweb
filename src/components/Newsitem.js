import React from 'react'

export default function Newsitem(props) {
  return (
    <div>
        <a href={props.urlpage} target="_blank">
        <div className='card'>
            <center><img src={props.image} alt='AA' style={{width:"200px", height:"200px", }}/></center>
            <div className='texts'>
                {console.log(props.title)}
                <h4><b>{props.title}</b></h4>
            </div>
            <h5>{props.text}</h5>
        </div>
        </a>
    </div>
  )
}

import React from 'react';
export default function Item({value,img_url,onItemclick}) {
    return (
        <li className='Item' onClick={onItemclick}> 
            <a href="#">
                <img src={img_url} width={50} height={50}></img>
                <span className="item_name">{value}</span>
            </a>
        </li>
    )
  }

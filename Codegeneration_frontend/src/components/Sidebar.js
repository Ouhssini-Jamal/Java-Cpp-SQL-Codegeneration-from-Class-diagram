import React from 'react';
import Item from './Item';
export default function Sidebar({}) {
    return (
        <ul className='Sidebar'>
             <Item value = "Class" img_url="./logo192.png" onItemclick />
            <Item value = "Association" img_url="./logo192.png" onItemclick />
            <Item value = "Agrégation" img_url="./logo192.png" onItemclick/>
            <Item value = "Composition" img_url="./logo192.png" onItemclick />
            <Item value = "Héritage" img_url="./logo192.png" onItemclick/>
        </ul>
    )
  }

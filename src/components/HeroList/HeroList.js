import React, { Component } from 'react';
import './HeroList.css';
import { nanoid } from 'nanoid';

class HeroList extends Component {
   render() {
      return (
         <ul className="list">
            {this.props.heros.map(hero => {
               return (
                  <li key={nanoid(5)} className="item">
                     <div>
                        <h2>Nickname: {hero.name}</h2>
                        <p>real_name: {hero.biography.fullName}</p>
                     </div>
                     <img src={hero.images.sm} alt={hero.slug} />
                  </li>
               );
            })}
         </ul>
      );
   }
}

export default HeroList;

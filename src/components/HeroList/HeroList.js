import React, { Component } from 'react';
import './HeroList.css';
import { nanoid } from 'nanoid';

class HeroList extends Component {
   openCard(e) {
      const idCard = e.currentTarget.id;
      this.props.openModal(idCard);
   }
   render() {
      return (
         <ul className="list">
            {this.props.heros.map(({ id, name, biography, images, slug }) => {
               return (
                  <li
                     key={nanoid(5)}
                     id={id}
                     className="item"
                     onClick={this.openCard.bind(this)}
                  >
                     <h2 className="title-hero">{name}</h2>
                     <img src={images.sm} alt={slug} />
                  </li>
               );
            })}
         </ul>
      );
   }
}

export default HeroList;

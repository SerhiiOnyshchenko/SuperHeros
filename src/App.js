import './App.css';
import HeroList from './components/HeroList/HeroList';
import React, { Component } from 'react';
// import { heros } from './components/herosApi/heros';
import Filter from './components/Filter/Filter';
import { fetchCountries as API } from './components/api/fetchCountries';

class App extends Component {
   state = {
      filter: '',
      heroslist: [],
      countPage: 1,
      limit: 5,
   };

   componentDidMount() {
      this.apiAndRender();
   }
   apiAndRender() {
      API(this.state.countPage, this.state.limit)
         .then(heros => {
            this.setState(prevState => ({
               heroslist: [...prevState.heroslist, ...heros],
            }));
         })
         .catch(error => console.log(error));
   }
   async loadeMore() {
      await this.setState(prevState => ({
         countPage: prevState.countPage + 1,
      }));
      this.apiAndRender();
   }
   changeFilter = e => {
      this.setState({ filter: e.target.value });
   };
   render() {
      const { heroslist, filter } = this.state;
      const filterName = filter.toLocaleLowerCase();
      const visiblHeros = heroslist.filter(hero =>
         hero.name.toLocaleLowerCase().includes(filterName)
      );
      return (
         <div>
            <h1>Super Heros</h1>
            <Filter value={filter} onChange={this.changeFilter} />
            <HeroList heros={visiblHeros} />
            <button
               type="button"
               className="load-more is-hidden"
               onClick={this.loadeMore.bind(this)}
            >
               <span className="lable">Show more</span>
            </button>
         </div>
      );
   }
}

export default App;

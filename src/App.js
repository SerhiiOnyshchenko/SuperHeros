import './App.css';
import HeroList from './components/HeroList/HeroList';
import React, { Component } from 'react';
import Filter from './components/Filter/Filter';
import { fetchCountries as API } from './components/api/fetchCountries';
import Search from './components/Search/Search';
import Modal from './components/Modal/Modal';

class App extends Component {
   state = {
      showModal: false,
      filter: '',
      heroslist: [],
      name: '',
      countPage: 1,
      limit: 5,
      openModalCard: [],
   };

   componentDidMount() {
      this.apiAndRender();
   }
   apiAndRender() {
      API(this.state.name, this.state.countPage, this.state.limit)
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
   async submitSearchForm(name) {
      await this.setState({
         name,
      });
      console.log(this.state.name);
      API(this.state.name, this.state.countPage, this.state.limit)
         .then(heros => {
            console.log(heros);
            return this.setState({
               heroslist: heros,
            });
         })
         .catch(error => console.log(error));
   }
   openModal = async idCard => {
      const card = this.state.heroslist.filter(
         hero => hero.id === Number(idCard)
      );
      await this.setState({ openModalCard: card[0] });
      console.log(this.state.openModalCard);
      this.setState(({ showModal }) => ({ showModal: !showModal }));
   };
   closeModal = () => {
      this.setState(({ showModal }) => ({ showModal: !showModal }));
   };
   render() {
      const { heroslist, filter, showModal, openModalCard } = this.state;
      const filterName = filter.toLocaleLowerCase();
      const visiblHeros = heroslist.filter(hero =>
         hero.name.toLocaleLowerCase().includes(filterName)
      );
      const { name, biography, appearance, images, slug } = openModalCard;
      return (
         <div className='main'>
            <Search submitSearchForm={this.submitSearchForm.bind(this)} />
            <Filter value={filter} onChange={this.changeFilter} />
            <HeroList heros={visiblHeros} openModal={this.openModal} />
            {showModal && (
               <Modal onClose={this.closeModal}>
                  <div>
                     <h2>Nickname: {name}</h2>
                     <p>real_name: {biography.fullName}</p>
                     <p>race: {appearance.race}</p>
                     <p>height: {appearance.height[0]}</p>
                     <p>weight: {appearance.weight[0]}</p>
                  </div>
                  <img src={images.md} alt={slug} />
                  <button
                     className="Close-modal"
                     type="button"
                     onClick={this.closeModal}
                  >
                     X
                  </button>
               </Modal>
            )}
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

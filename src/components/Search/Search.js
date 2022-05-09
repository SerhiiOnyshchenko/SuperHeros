import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
   state = { inputValue: '' };
   changeInput(e) {
      const text = e.target.value;
      this.setState({ inputValue: text });
   }
   submitForm(e) {
      e.preventDefault();
      this.props.submitSearchForm(this.state.inputValue);
      console.log(this.state);
   }
   render() {
      const { inputValue } = this.state;
      return (
         <div className="header">
            <h1>Super Heros</h1>
            <form
               className="search-form"
               id="search-form"
               onSubmit={this.submitForm.bind(this)}
            >
               <div className="box-form">
                  <input
                     type="text"
                     name="searchQuery"
                     value={inputValue}
                     autoComplete="off"
                     placeholder="Search images..."
                     onChange={this.changeInput.bind(this)}
                  />
                  <button type="submit"></button>
               </div>
            </form>
         </div>
      );
   }
}

export default Search;

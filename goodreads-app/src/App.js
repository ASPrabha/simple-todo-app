import React, { Component } from 'react';
import './App.css';
import { Pagination, Card, CardTitle, Input, Row, Button, Navbar, Icon, NavItem } from 'react-materialize'

import axios from 'axios';

var convert = require('xml-js');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIndex: 0,
      searchText: '',
      activePage: 1
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({searchText: e.target.value})
  };

  handleChangePage = (pageNumber) => {
    const { booksData } = this.state;
    this.setState({activePage: pageNumber, currentPageBooks: booksData.results.work[pageNumber-1]})
  }

  onSearch = (e) => {
    e.preventDefault();

    const { searchText } =  this.state;

    axios.get(`http://cors-anywhere.herokuapp.com/https://goodreads.com/search/index.xml?key=ibNoqYil0IdzLSN3x6H2dA&q=${searchText}`)
    .then(res => {
      const data = convert.xml2js(res.data, {compact: true}).GoodreadsResponse.search;
      console.log(data);
      
      this.setState({booksData: data, activePage: 1, currentPageBooks: data.results.work ? data.results.work[0] : {}});
    });
  }

  render() {
    const { searchText, booksData, activePage, currentPageBooks } = this.state;
    return (
      <div className="App">
        <Navbar brand='goodreads' right>
          <Row>
            <form onSubmit={this.onSearch}>
              <Input placeholder="search here" value={searchText} s={6} onChange={this.handleChange} />
              <NavItem onClick={this.onSearch}><Icon>search</Icon></NavItem>
            </form>
          </Row>
        </Navbar>

        {booksData ? currentPageBooks.best_book ?
        <div>
          <Card header={<CardTitle image={currentPageBooks.best_book.image_url._text} waves='light'/>}
              title={currentPageBooks.best_book.title._text}>
              <p>{currentPageBooks.best_book.author.name._text}</p>
          </Card>

          <Pagination items={booksData && booksData['results-end']._text} activePage={activePage} maxButtons={8} onSelect={this.handleChangePage}/>
        </div>
        :
          <div className="messages">Book not found :(</div>
        :
          <div className="messages">Please search to find a book</div>
        }
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import '../stylesheets/StockMarket.css';
import $ from 'jquery';

class StockMarket extends Component {

  constructor() {
    super();
    this.getStockData = this.getStockData.bind(this);
    this.showData = this.showData.bind(this);
    this.state = {
      market: null,
      currentPrice: null,
      tickerSymbol: null,
      lastUpdate: null
    }
  }

  // making cross origin browser request using jquery: crossDomain: true
  getStockData() {
    $.ajax({
      type: 'GET',
      dataType: 'JSONP',
      crossDomain: true,
      url: `https://finance.google.com/finance/info?client=ig&q=${this.stockSymbol.value}`,
    })
    .done((response) => {
      const jsonData = response[0];
      this.setState({
        market: jsonData.e,
        currentPrice: jsonData.l_fix,
        tickerSymbol: jsonData.t,
        lastUpdate: jsonData.lt,
        lastChange: jsonData.c
      })
      this.stockSymbol.value = null;
    })
  }

  showData() {
    if (this.state.tickerSymbol !== null) {
      return (
        <ul>
          <li className="stockDesc">{this.state.market}: {this.state.tickerSymbol}</li>
          <li className="stockPrice">$ {this.state.currentPrice}</li>
          <li>Change: {this.state.lastChange}</li>
          <li>Last Updated: {this.state.lastUpdate}</li>
        </ul>
      )
    }
  }

  render() {
    return (
      <div className="main_StockMarket text-center">
        <h2>Stock Market</h2>
        <hr />
        <input
          className="inputClass"
          type="text"
          placeholder="Enter a Ticker Symbol"
          ref={(input) => { this.stockSymbol = input; }}
        />
        &nbsp;
        <input
          className="input_button"
          type="button"
          value="Quote"
          onClick={this.getStockData}
        />

        {this.showData()}
      </div>
    );
  }
}

export default StockMarket;

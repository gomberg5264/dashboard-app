import React, { Component } from 'react';
import '../stylesheets/StockMarket.css';

class StockMarket extends Component {
  render() {
    return (
      <div className="main_StockMarket">
        <h1>Market Data</h1>
        <div>S&P 500</div>
        <div>Dow</div>
        <div>Nasdaq</div>
      </div>
    );
  }
}

export default StockMarket;

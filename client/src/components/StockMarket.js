import React, { Component } from 'react';
import '../stylesheets/StockMarket.css';
import $ from 'jquery';
import {Popover, OverlayTrigger} from 'react-bootstrap';

class StockMarket extends Component {

  constructor() {
    super();
    this.state = {
      market: null,
      currentPrice: null,
      tickerSymbol: null,
      lastUpdate: null
    }
    this.getStockData = this.getStockData.bind(this);
    this.showData = this.showData.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      dataType: 'JSONP',
      crossDomain: true,
      url: `http://finance.google.com/finance/info?client=ig&q=.INX`,
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

  // making cross origin browser request using jquery: crossDomain: true
  getStockData(e) {
    if (e.key === 'Enter') {
      $.ajax({
        type: 'GET',
        dataType: 'JSONP',
        crossDomain: true,
        url: `http://finance.google.com/finance/info?client=ig&q=${this.stockSymbol.value}`,
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

  moreInfo() {
    return (
      <Popover className="aboutNewsWidget" title="About 'Calendar'">
        <p>
          This widget lets you add/delete events to each day.
        </p>
        <ul>
          <li>Add Event: Click on a date, enter event on top ('Enter Your Events'), and press 'Enter'.</li><br/>
          <li>Delete Event: Click the 'x' to the left of the event.</li>
        </ul>
      </Popover>
    );
  }

  render() {
    return (
      <div className="main_StockMarket text-center">
         <h2 className="pull-left">
            &nbsp;
            <i className="fa fa-university" aria-hidden="true"></i>
            &nbsp;
            StockMarket
          </h2>
          <span className="pull-right">
            <OverlayTrigger trigger="hover" placement="bottom" overlay={this.moreInfo()}>
              <i className="fa fa-info-circle moreInfoBtn" aria-hidden="true"></i>
            </OverlayTrigger>
          </span>
            <input
              className="stock-market-input text-center"
              type="text"
              placeholder="Enter Stock Symbol"
              ref={(input) => { this.stockSymbol = input; }}
              onKeyPress={this.getStockData}
            />
        {this.showData()}
      </div>
    );
  }
}

export default StockMarket;

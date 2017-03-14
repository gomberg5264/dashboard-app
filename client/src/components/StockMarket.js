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
      lastUpdate: null,
      stocks: []
    }
    this.getStockData = this.getStockData.bind(this);
    this.showData = this.showData.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
    this.lastUpdate = this.lastUpdate.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.deleteIcon = this.deleteIcon.bind(this);
  }

  componentDidMount() {
    // stock index: s&p 500, dow, nasdaq
    var indices = ['.INX', '.DJI', '.IXIC'];

    // grab the stock symbols from localStorage if exists
    var tickerSymbol = localStorage.getItem('list-of-stock-ticker-symbols');
    if (tickerSymbol) {
      var indices = tickerSymbol.split(',');
    }

    indices.map((stockIndex, idx) => {
      $.ajax({
        type: 'GET',
        dataType: 'JSONP',
        crossDomain: true,
        url: `http://finance.google.com/finance/info?client=ig&q=${stockIndex}`,
      })
      .done((response) => {
        const jsonData = response[0];
        var title = jsonData.t;
        // add custom name for the 3 default indices
        if (stockIndex === '.INX') {
          title = 'S&P 500';
        }
        if (stockIndex === '.DJI') {
          title = 'DOW';
        }
        if (stockIndex === '.IXIC') {
          title = 'NASDAQ';
        }
        var stockData = {
          'index': idx,
          'market': jsonData.e,
          'currentPrice': jsonData.l_fix,
          'tickerSymbol': jsonData.t,
          'lastUpdate': jsonData.lt,
          'lastChange': jsonData.c,
          'title': title
        };
        // add stock class depending on last change positive or negative
        // className used for change background to red/green
        if (jsonData.c.charAt(0) === '+') {
          stockData['stockClassName'] = 'stockGreen';
        }
        if (jsonData.c.charAt(0) === '-') {
          stockData['stockClassName'] = 'stockRed';
        }
        var stocks = this.state.stocks;
        stocks[idx] = stockData;
        this.setState({
          stocks
        })
      })
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
        var title = jsonData.t;
        var stockData = {
          'market': jsonData.e,
          'currentPrice': jsonData.l_fix,
          'tickerSymbol': jsonData.t,
          'lastUpdate': jsonData.lt,
          'lastChange': jsonData.c,
          'title': title
        };
        // className used for change background to red/green
        if (jsonData.c.charAt(0) === '+') {
          stockData['stockClassName'] = 'stockGreen';
        }
        if (jsonData.c.charAt(0) === '-') {
          stockData['stockClassName'] = 'stockRed';
        }

        // update the state with new stock
        var stocks = this.state.stocks;
        stocks.push(stockData);
        this.setState({
          stocks
        });

        // store the stocks in localStorage
        var tickerSymbolArray = [];
        this.state.stocks.map(stock => {
          tickerSymbolArray.push(stock.tickerSymbol);
        })
        localStorage.setItem('list-of-stock-ticker-symbols', tickerSymbolArray.join());

        this.stockSymbol.value = null;
      })
    }
  }

  deleteEvent() {

  }

  // delete icon for user added stocks: not the s&p, dow, nasdaq index
  deleteIcon(tickerSymbol) {
    if (tickerSymbol !== '.INX' && tickerSymbol !== '.DJI' && tickerSymbol !== '.IXIC') {
      return (
        <span className="deleteIconStock">
          <i className="fa fa-times-circle-o pull-left"
             aria-hidden="true"
             onClick={() => {this.deleteEvent()}}
             />
        </span>
      )
    }
  }

  showData() {
    if (this.state.stocks) {
      return (
        this.state.stocks.map(stock => (
          <li className={"one-stock pull-left " + stock.stockClassName} >
            {this.deleteIcon(stock.tickerSymbol)}
            <a href={"https://www.google.com/finance?q="+stock.tickerSymbol} target="_blank">
              <div className="stockDesc">{stock.title}</div>
              <div className="stockPrice">$ {stock.currentPrice}</div>
              <div>Change: {stock.lastChange}</div>
            </a>
          </li>
        ))
      )
    }
  }

  // update the time when the stocks are last updated
  lastUpdate() {
    var length = this.state.stocks.length;
    if (length === 1) {
      return (
        <div className="lastUpdate">Updated: {this.state.stocks[0].lastUpdate}</div>
      )
    }
    else if (length > 1) {
      var stock = this.state.stocks[length-1];
      return (
        <div className="lastUpdate">Updated: {stock.lastUpdate}</div>
      )
    }
    else {
      return (
        <div className="lastUpdate"></div>
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
            Stock Market
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

          <ul className="all-stocks">
            {this.lastUpdate()}
            {this.showData()}
          </ul>
      </div>
    );
  }
}

export default StockMarket;

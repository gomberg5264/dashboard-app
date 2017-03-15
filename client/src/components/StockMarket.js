/* eslint-disable */
import React, { Component } from 'react';
import '../stylesheets/StockMarket.css';
import $ from 'jquery';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import alertify from 'alertify.js';

class StockMarket extends Component {

  constructor() {
    super();
    this.state = {
      stocks: []
    }
    this.getStockData = this.getStockData.bind(this);
    this.showData = this.showData.bind(this);
    this.moreInfo = this.moreInfo.bind(this);
    this.lastUpdate = this.lastUpdate.bind(this);
    this.deleteStock = this.deleteStock.bind(this);
    this.deleteIcon = this.deleteIcon.bind(this);
    this.stockTitle = this.stockTitle.bind(this);
    this.updateStocks = this.updateStocks.bind(this);
  }

  componentDidMount() {
    // stock index: s&p 500, dow, nasdaq
    var indices = ['.INX', '.DJI', '.IXIC'];

    // grab the stock symbols from localStorage if exists
    var tickerSymbol = localStorage.getItem('list-of-stock-ticker-symbols');
    if (tickerSymbol) {
      indices = tickerSymbol.split(',');
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

        // an stock data object
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

        // update all the stocks with the current stock
        this.componentDidMount();

        // alert the new stock added
        alertify.logPosition('top left');
        alertify.log('Stock Market: \'' + this.stockSymbol.value.toUpperCase() + '\' added!')

        // empty the input box
        this.stockSymbol.value = null;
      })
    }
  }

  deleteStock(idxToDelete, tickerSymbol) {
    var stocks = this.state.stocks;
    // delete that item from the array
    stocks.splice(idxToDelete,1);

    // update the state with new stocks array
    this.setState({
      stocks
    });

    // update the localStorage
    var tickerSymbolArray = [];
    this.state.stocks.map(stock => {
      tickerSymbolArray.push(stock.tickerSymbol);
    })
    localStorage.setItem('list-of-stock-ticker-symbols', tickerSymbolArray.join());
    alertify.logPosition('top left');
    alertify.log('Stock Market: \'' + tickerSymbol + '\' deleted!')
  }

  // delete icon for user added stocks: not the s&p, dow, nasdaq index
  deleteIcon(idxToDelete, tickerSymbol) {
    if (tickerSymbol !== '.INX' && tickerSymbol !== '.DJI' && tickerSymbol !== '.IXIC') {
      return (
        <span className="deleteIconStock">
          <i className="fa fa-times-circle-o pull-left"
             aria-hidden="true"
             onClick={() => {this.deleteStock(idxToDelete, tickerSymbol)}}
             />
        </span>
      )
    }
  }

  // stock title to display: diffrent style for index vs. stocks
  stockTitle(title) {
    if (title === 'S&P 500' || title === 'DOW' || title === 'NASDAQ') {
      return (
        <div className="stockDesc index-average">{title}</div>
      )
    }
    else {
      return (
        <div className="stockDesc">{title}</div>
      )
    }
  }

  showData() {
    if (this.state.stocks) {
      return (
        this.state.stocks.map((stock, idx) => (
          <li className={"one-stock pull-left " + stock.stockClassName} key={idx}>
            {this.deleteIcon(idx, stock.tickerSymbol)}
            <a href={"https://www.google.com/finance?q="+stock.tickerSymbol} target="_blank">
              {this.stockTitle(stock.title)}
              <div className="stockPrice">$ {stock.currentPrice}</div>
              <div>Change: {stock.lastChange}</div>
            </a>
          </li>
        ))
      )
    }
  }

  // update the stocks with 2 seconds refresh animation
  updateStocks() {
    $('.updateStocksIcon').html('<i class="fa fa-refresh fa-spin" aria-hidden="true"></i>');
    setTimeout(() => {
      // update the stocks calling componenDidMount
      this.componentDidMount();
      $('.updateStocksIcon').html('<i class="fa fa-refresh" aria-hidden="true"></i>');
      alertify.logPosition('top left');
      alertify.log('Stock Market: Just Updated!');
    }, 2000);

  }

  // update the time when the stocks are last updated
  lastUpdate() {
    var length = this.state.stocks.length;
    if (length === 1) {
      return (
        <div className="lastUpdate">
          <span className="updateStocksIcon" onClick={this.updateStocks}>
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </span>
          &nbsp;
          Updated: {this.state.stocks[0].lastUpdate}
        </div>
      )
    }
    else if (length > 1) {
      var stock = this.state.stocks[length-1];
      return (
        <div className="lastUpdate">
          <span className="updateStocksIcon" onClick={this.updateStocks}>
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </span>
          &nbsp;
          Updated: {stock.lastUpdate}
        </div>
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
      <Popover id="stock market widget" className="aboutNewsWidget" title="About 'Stock Market'">
        <p>
          This widget live streams the stock market data. You can add/delete stocks to the watchlist.
          And refresh stocks data.
        </p>
        <ul>
          <li><strong>Add Stock</strong>: Enter stock symbol on top ('Enter Stock Symbol'), and press 'Enter'.</li><br/>
          <li><strong>Delete Stock</strong>: Click the 'x' to the left of the stock.</li><br />
          <li><strong>Refresh Stocks</strong>: Click on the refresh icons to the left of 'Updated: ...'</li>
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
            <OverlayTrigger placement="top" overlay={this.moreInfo()}>
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

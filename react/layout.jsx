/**
 * Layout
 * =====
 *
 * This is the main layout component which frames every page.
 */
'use strict'
let React = require('react')
let asink = require('asink')
let yoursVersion = require('../package').version
let ReactRouter = require('react-router')

let Link = ReactRouter.Link
let browserHistory = ReactRouter.browserHistory
let Route = ReactRouter.Route
let Router = ReactRouter.Router

let PageContentHot = React.createClass({
  render: function () {
    return (
      <div>
        <div className='row navigation'>
          <div className='col-md-12'>
            <ul className="nav nav-pills">
              <li role="presentation" className="active"><Link to={`/`}>Hot</Link></li>
              <li role="presentation"><Link to={`/all/`}>All</Link></li>
              <li role="presentation"><Link to={`/new/`}>New</Link></li>
              <li role="presentation"><Link to={`/wallet/`}>Wallet</Link></li>
            </ul>
          </div>
        </div>

        <div className='row content-link'>
          <div className='col-md-12'>
            <div className='content-item'>
              <button className='btn btn-success'>Invest $1</button>
              <h2><a href='#'>A compilation of cat gifs on imgur</a></h2>
              <div className='author'>$$$ invested | pubkey | author | date</div>
            </div>
            <div className='content-item'>
              <button className='btn btn-success'>Invest $1</button>
              <h2><a href='#'>An article about how tech both is and isn't in a bubble</a></h2>
              <div className='author'>$$$ invested | pubkey | author | date</div>
            </div>
            <div className='content-item'>
              <button className='btn btn-success'>Invest $1</button>
              <h2><a href='#'>An article about how expensive rent in San Francisco is</a></h2>
              <div className='author'>$$$ invested | pubkey | author | date</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

let PageContentAll = React.createClass({
  render: function () {
    return (
      <div>
        <div className='row navigation'>
          <div className='col-md-12'>
            <ul className="nav nav-pills">
              <li role="presentation"><Link to={`/`}>Hot</Link></li>
              <li role="presentation" className="active"><Link to={`/all/`}>All</Link></li>
              <li role="presentation"><Link to={`/new/`}>New</Link></li>
              <li role="presentation"><Link to={`/wallet/`}>Wallet</Link></li>
            </ul>
          </div>
        </div>

        <div className='row content-link'>
          <div className='col-md-12'>
            <div className='content-item'>
              <button className='btn btn-success'>Invest $1</button>
              <h2><a href='#'>An article about how tech both is and isn't in a bubble</a></h2>
              <div className='author'>$$$ invested | pubkey | author | date</div>
            </div>
            <div className='content-item'>
              <button className='btn btn-success'>Invest $1</button>
              <h2><a href='#'>An article about how expensive rent in San Francisco is</a></h2>
              <div className='author'>$$$ invested | pubkey | author | date</div>
            </div>
            <div className='content-item'>
              <button className='btn btn-success'>Invest $1</button>
              <h2><a href='#'>A compilation of cat gifs on imgur</a></h2>
              <div className='author'>$$$ invested | pubkey | author | date</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

let PageContentNew = React.createClass({
  render: function () {
    return (
      <div>
        <div className='row navigation'>
          <div className='col-md-12'>
            <ul className="nav nav-pills">
              <li role="presentation"><Link to={`/`}>Hot</Link></li>
              <li role="presentation"><Link to={`/all/`}>All</Link></li>
              <li role="presentation" className="active"><Link to={`/new/`}>New</Link></li>
              <li role="presentation"><Link to={`/wallet/`}>Wallet</Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
})

let PageWallet = React.createClass({
  propTypes: {
    dattcore: React.PropTypes.object
  },
  render: function () {
    return (
      <div>
        <div className='row navigation'>
          <div className='col-md-12'>
            <ul className="nav nav-pills">
              <li role="presentation"><Link to={`/`}>Hot</Link></li>
              <li role="presentation"><Link to={`/all/`}>All</Link></li>
              <li role="presentation"><Link to={`/new/`}>New</Link></li>
              <li role="presentation" className="active"><Link to={`/wallet/`}>Wallet</Link></li>
            </ul>
          </div>
        </div>

        <div className='row content-link'>
          <div className='col-md-12'>
            <BoxBitcoin dattcore={this.props.dattcore}/>
          </div>
        </div>
      </div>
    )
  }
})

let BoxBitcoin = React.createClass({
  getInitialState: function () {
    return {
      unconfirmedBalanceBits: 0,
      confirmedBalanceBits: 0,
      totalBalanceBits: 0,
      blockheightnum: 0,
      depositAddress: '',
      toAddress: '',
      toAmountBitsString: ''
    }
  },

  propTypes: {
    dattcore: React.PropTypes.object
  },

  setStateFromDattCore: function () {
    return asink(function * () {
      let dattcore = this.props.dattcore
      let info = yield dattcore.asyncGetLatestBlockInfo()
      this.setState({
        blockheightnum: info.height
      })
    }, this)
  },

  componentWillMount: function () {
    return asink(function *() {
      let dattcore = this.props.dattcore
      this.monitorDattCore()
      yield dattcore.asyncUpdateBalance()
    }, this)
  },

  componentWillUnmount: function () {
    this.unmonitorDattCore()
  },

  componentDidMount: function () {
    return this.setStateFromDattCore()
  },

  componentWillReceiveProps: function () {
    return this.setStateFromDattCore()
  },

  monitorDattCore: function () {
    let dattcore = this.props.dattcore
    dattcore.on('bitcoin-balance', this.handleBitcoinBalance)
  },

  unmonitorDattCore: function () {
    let dattcore = this.props.dattcore
    dattcore.removeListener('bitcoin-balance', this.handleBitcoinBalance)
  },

  handleBitcoinBalance: function (obj) {
    let unconfirmedBalanceBits = Math.round(obj.unconfirmedBalanceSatoshis / 100)
    let confirmedBalanceBits = Math.round(obj.confirmedBalanceSatoshis / 100)
    let totalBalanceBits = Math.round(obj.totalBalanceSatoshis / 100)

    this.setState({
      unconfirmedBalanceBits,
      confirmedBalanceBits,
      totalBalanceBits})
  },

  handleReceive: function () {
    return asink(function * () {
      let dattcore = this.props.dattcore
      let DattCore = dattcore.constructor
      let address = yield dattcore.asyncGetNewExtAddress()
      let depositAddress = yield DattCore.CryptoWorkers.asyncAddressStringFromAddress(address)
      this.setState({depositAddress})
    }, this)
  },

  handleToAddressChange: function (el) {
    this.setState({
      toAddress: el.target.value
    })
  },

  handleToAmountChange: function (el) {
    this.setState({
      toAmount: el.target.value
    })
  },

  handleSend: function (el) {
    return asink(function * () {
      el.preventDefault()
      let dattcore = this.props.dattcore
      let DattCore = dattcore.constructor
      let toAddressString = this.state.toAddress
      let toAmountBits = parseInt(this.state.toAmount, 10)
      let satoshis = toAmountBits * 100
      let address = yield DattCore.CryptoWorkers.asyncAddressFromAddressString(toAddressString)
      yield dattcore.asyncBuildSignAndSendTransaction(address, satoshis)
      this.setState({
        toAddress: '',
        toAmount: ''
      })
    }, this)
  },

  render: function () {
    return (
      <div className='info-box'>
        <h2>My Bitcoin</h2>
        <p>
          Confirmed balance:
          {this.state.confirmedBalanceBits} bits
        </p>
        <p>
          Unconfirmed balance:
          {this.state.unconfirmedBalanceBits} bits
        </p>
        <p>
          Total balance:
          {this.state.totalBalanceBits} bits
        </p>
        <p>
          Latest block height:
          {this.state.blockheightnum}
        </p>
        <p>
          <button className='btn btn-default' onClick={this.handleReceive}>
            Receive
          </button>
        </p>
        <p>
          Deposit Address:
          <br/>
          {this.state.depositAddress}
        </p>
        <form>
          <div className='form-group'>
            <label htmlFor='toAddress'>
              To Address
            </label>
            <input
              type='text'
              className='form-control'
              id='toAddress'
              placeholder='Label'
              onChange={this.handleToAddressChange}
              value={this.state.toAddress} />
          </div>
          <div className='form-group'>
            <label htmlFor='toAmount'>
              # of Bits
            </label>
            <input
              type='text'
              className='form-control'
              id='toAmount'
              placeholder='Label'
              onChange={this.handleToAmountChange}
              value={this.state.toAmount} />
          </div>
          <button type='submit' className='btn btn-default' onClick={this.handleSend}>
            Send
          </button>
        </form>
      </div>
    )
  }
})

let Layout = React.createClass({
  getInitialState: function () {
    return {
      dattcoreStatus: 'uninitialized'
    }
  },

  componentWillMount: function () {
    return asink(function *() {
      let dattcore = this.props.dattcore
      try {
        yield dattcore.asyncInitialize()
        this.setState({
          dattcoreStatus: 'initialized'
        })
        // this.monitorDattCore()
      } catch (err) {
        this.setState({
          dattcoreStatus: 'error initializing: ' + err
        })
      }
      yield dattcore.asyncNetworkInitialize()
    }, this)
  },

  propTypes: {
    apptitle: React.PropTypes.string,
    dattcore: React.PropTypes.object
  },

  render: function () {
    let dattcore = this.props.dattcore
    let dattcoreStatus = this.state.dattcoreStatus
    let apptitle = this.props.apptitle

    function createElement (Component, props) {
      return (
        <Component dattcore={props.dattcore}/>
      )
    }

    return (
      <div className='container'>
        <div className='row page-header'>
          <div className='col-md-12'>
            <img src="/yours-logo-white.svg" alt=""/>
            <h1>{apptitle}</h1>
          </div>
        </div>

        <Router history={browserHistory} createElement={(Component, props) => <Component dattcore={dattcore}/>}>
          <Route path="/" component={PageContentHot}/>
          <Route path="/all" component={PageContentAll}/>
          <Route path="/new" component={PageContentNew}/>
          <Route path="/wallet" component={PageWallet}/>
        </Router>

        <div className='row page-footer'>
          <div className='col-md-12'>
            <div className='version-numbers'>
              <p>Yours v{yoursVersion}</p>
              <p>Status of dattcore v{dattcore.version}: {dattcoreStatus}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Layout

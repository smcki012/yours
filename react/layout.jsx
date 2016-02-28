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
    return (
      <div className='container'>
        <div className='row page-header'>
          <div className='col-md-12'>
            <img src="/yours-logo-white.svg" alt=""/>
            <h1>{apptitle}</h1>
          </div>
        </div>

        <Router history={browserHistory}>
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

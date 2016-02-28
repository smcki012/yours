'use strict'

let React = require('react')
let ReactRouter = require('react-router')
let Link = ReactRouter.Link

let NavigationBar = React.createClass({
  render: function () {
    return (
    <div className='row navigation'>
        <div className='col-md-12'>
          <ul className='nav nav-pills'>
            <li role='presentation' className='active'><Link to={`/`}>Hot</Link></li>
            <li role='presentation'><Link to={`/all/`}>All</Link></li>
            <li role='presentation'><Link to={`/new/`}>New</Link></li>
            <li role='presentation'><Link to={`/wallet/`}>Wallet</Link></li>
          </ul>
        </div>
      </div>
    )
  }
})

module.exports = NavigationBar

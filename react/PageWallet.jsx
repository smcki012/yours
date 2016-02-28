let React = require('react')
let asink = require('asink')
let ReactRouter = require('react-router')
let Link = ReactRouter.Link
let BoxBitcoin = require('./BoxBitcoin.jsx')

let PageWallet = React.createClass({
  propTypes: {
    dattcore: React.PropTypes.object
  },
  render: function () {
    return (
    <div>
        <div className='row navigation'>
          <div className='col-md-12'>
            <div id='cssmenu'>
              <ul className='nav nav-pills'>
                <li role='presentation'><Link to={`/`}>Hot</Link></li>
                <li role='presentation'><Link to={`/all/`}>All</Link></li>
                <li role='presentation'><Link to={`/new/`}>New</Link></li>
                <li role='presentation' className='active'><Link to={`/wallet/`}>Wallet</Link></li>
              </ul>
            </div>
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

module.exports = PageWallet

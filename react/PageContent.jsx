let React = require('react')
let ReactRouter = require('react-router')
let Link = ReactRouter.Link


let MultiContentItemView = require('./MultiContentItemView.jsx')

let PageContent = React.createClass({
  getInitialState: function () {
    return {}
  },
  componentDidMount: function () {
    let listName = this.props.listName
    this.serverRequest = $.get(('https://9uc8g4loyk.execute-api.us-west-2.amazonaws.com/prod/link/search?sortParam=' + listName),
      function (result) {
        console.log(JSON.stringify(result, null, 4))                                 
        var linksList = result.Items

        this.setState({
          contentList: linksList
        })
      }.bind(this))
  },
  render: function () {
    let contentList = this.state.contentList || []
    let activePage = {}
    if (this.props.listName === 'HOT') {
      activePage.hot = 'active'
      activePage.all = ''
    } else {
      activePage.hot = ''
      activePage.all = 'active'
    }
    return (
      <div>
        <div className='col-md-12'>
          <div id='cssmenu'>
            <ul className="nav nav-pills">
              <li role="presentation" className={activePage.hot}><Link to={`/`}>Hot</Link></li>
              <li role="presentation" className={activePage.all}><Link to={`/all/`}>All</Link></li>
              <li role="presentation"><Link to={`/new/`}>New</Link></li>
              <li role="presentation"><Link to={`/wallet/`}>Wallet</Link></li>
            </ul>
          </div>
        </div>
        <div className='row content-link'>
          <div className='col-md-12'>
            <MultiContentItemView contentList={contentList} dattcore={this.props.dattcore}/>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = PageContent

let React = require('react')

let MultiContentItemView = require('./MultiContentItemView.jsx')
let NavigationBar = require('./NavigationBar.jsx')

let PageContent = React.createClass({
  getInitialState: function () {
    return {}
  },
  componentDidMount: function () {
    let listName = this.props.listName
    this.serverRequest = $.get(('https://9uc8g4loyk.execute-api.us-west-2.amazonaws.com/prod/link/search?sortParam=' + listName),
        function (result) {
          console.log(JSON.stringify(result, null, 4))                                 
          var linksList = result.Links

          this.setState({
            contentList: linksList
          })
      }.bind(this))
  },
  render: function () {
    let contentList = this.state.contentList || []
    return (
    <div>
        <NavigationBar />
        <div className='row content-link'>
          <div className='col-md-12'>
            <MultiContentItemView contentList={contentList} />
          </div>
        </div>
      </div>
    )
  }
})

module.exports = PageContent

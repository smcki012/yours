let React = require('react')
let ContentItemView = require('./ContentItemView.jsx')

let MultiContentItemView = React.createClass({
  render: function () {
    return React.createElement('div', null, this.props.contentList.map((contentItem) => {
      return <ContentItemView contentItem={contentItem} dattcore={this.props.dattcore}/>
    }))
  }
})

module.exports = MultiContentItemView

let React = require('react')
let ContentItemView = require('./ContentItemView.jsx')

let MultiContentItemView = React.createClass({
  render: function () {
    return React.createElement('div', null, this.props.contentList.map(function (contentItem) {
      return <ContentItemView contentItem={contentItem}/>
    }))
  }
})

module.exports = MultiContentItemView

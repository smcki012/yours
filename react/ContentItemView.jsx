let React = require('react')

let ContentItemView = React.createClass({
  render: function () {
    let contentItem = this.props.contentItem
    console.log('ContentItemView')
    let dattcore = this.props.dattcore
    console.log('ContentItemView 2')
    return (
    <div className='content-item'>
        <button className='btn btn-success'>Endorse</button>
        <h2><a href='#'>{contentItem.title}</a></h2>
        <div className='author'>$$$ invested | pubkey | author | date</div>
        </div>
    )
  }
})

module.exports = ContentItemView

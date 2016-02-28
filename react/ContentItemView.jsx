let React = require('react')

let ContentItemView = React.createClass({
  render: function () {
    let contentItem = this.props.contentItem
    let dattcore = this.props.dattcore
    let DattCore = dattcore.constructor
    let ContentAuth = DattCore.ContentAuth
    let contentauth = ContentAuth().fromHex(contentItem.datahex)
    let content = contentauth.getContent()
    let url = content.body
    let name = content.name
    let title = content.title
    let pubkey = contentauth.pubkey.toString()
    return (
    <div className='content-item'>
        <button className='btn btn-success'>Endorse</button>
        <h2><a href='url'>{content.title}</a></h2>
        <div className='author'>$$$ invested | {pubkey} | {name} | date</div>
        </div>
    )
  }
})

module.exports = ContentItemView

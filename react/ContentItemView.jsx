let React = require('react')
let asink = require('asink')

let ContentItemView = React.createClass({
  handleSubmit: function (el) {
    return asink(function *() {
      console.log('submit was called')
      // get who to send to from server
      el.preventDefault()
      let contentItem = this.props.contentItem
      let DattCore = dattcore.constructor
      let ContentAuth = DattCore.ContentAuth
      let contentauth = ContentAuth().fromHex(contentItem.datahex)
      let address = contentauth.address
      yield dattcore.asyncBuildSignAndSendTransaction(address, 5000 * 1e2)
      // tell server that i just paid. tell server what my bitcoin address is
      // and what content id i just upvoted.
    }, this)
  },

  render: function () {
    let contentItem = this.props.contentItem
    let dattcore = this.props.dattcore
    let DattCore = dattcore.constructor
    let ContentAuth = DattCore.ContentAuth
    let contentauth = ContentAuth().fromHex(contentItem.datahex)
    let content = contentauth.getContent()
    let url = content.body
    let body = content.body
    let name = content.name
    let title = content.title
    let label = content.label
    let pubkey = contentauth.pubkey.toString()
    let address = contentauth.address
    return (
    <div className='content-item'>
        <button className='btn btn-success' onClick={this.handleSubmit}>Endorse</button>
        <h2><a href={url}>{title}</a></h2>
        <div className='author'>$$$ invested | {pubkey} | {name} | date</div>
        </div>
    )
  }
})

module.exports = ContentItemView

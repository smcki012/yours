let React = require('react')
let asink = require('asink')

let ContentItemView = React.createClass({
  handleSubmit: function (el) {
    return asink(function *() {
      console.log('submit was called')
      el.preventDefault()
      let contentItem = this.props.contentItem
      let DattCore = dattcore.constructor
      let ContentAuth = DattCore.ContentAuth
      let contentauth = ContentAuth().fromHex(contentItem.datahex)
      let address = contentauth.address

      // get who to send to from server
      let LINK_ID = contentauth.getHash().toString('hex') // TODO: workers, async
      let result1 = yield new Promise((resolve, reject) => {
        let obj = {
          LINK_ID: LINK_ID
        }
        let str = JSON.stringify(obj)
        $.post('https://9uc8g4loyk.execute-api.us-west-2.amazonaws.com/prod/prepareupvote', str).done((result) => {
          console.log('jQuery 1 success')
          resolve(result)
        }).fail(() => {
          console.log('jQuery 1 failure')
          reject(new Error('jQuery #1 failed'))
        })
      })

      // send money to the content creator
      yield dattcore.asyncBuildSignAndSendTransaction(address, 5000 * 1e2)
      if (result1) {
        // send money to the investor. if no one has paid, result is null
        console.log('test 1')
        let addressString = result1.UPVOTER_ADDRESS
        console.log('addressString: ' + addressString)
        console.log('test 2')
        let investorAddress = yield DattCore.CryptoWorkers.asyncAddressFromAddressString(addressString)
        console.log('test 3')
        yield dattcore.asyncBuildSignAndSendTransaction(investorAddress, 5000 * 1e2)
        console.log('test 4')
      }

      // tell server that i just paid. tell server what my bitcoin address is
      // and what content id i just upvoted.
      let myAddress = yield dattcore.asyncGetNewExtAddress()
      let result2 = yield new Promise((resolve, reject) => {
        let sendobj2 = {
          LINK_ID: LINK_ID,
          UPVOTER_ADDRESS: myAddress.toString() // TODO: workers, async
        }
        let str = JSON.stringify(sendobj2)
        $.post('https://9uc8g4loyk.execute-api.us-west-2.amazonaws.com/prod/investment', str).done((result) => {
          resolve(result)
        }).fail(() => {
          reject(new Error('jQuery #2 failed'))
        })
      })
      console.log('final result notifying server of investment:')
      console.log(result2)

    }, this)
  },

  render: function () {
    let contentItem = this.props.contentItem
    let dattcore = this.props.dattcore
    let DattCore = dattcore.constructor
    let ContentAuth = DattCore.ContentAuth
    let contentauth = ContentAuth().fromHex(contentItem.datahex)
    let content = contentauth.getContent()
    let date = contentauth.date.toString()
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
        <div className='author'>{pubkey} | {name} | {date}</div>
        </div>
    )
  }
})

module.exports = ContentItemView

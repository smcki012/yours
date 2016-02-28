let React = require('react')
let asink = require('asink')
let ReactRouter = require('react-router')
let Link = ReactRouter.Link

let PageContentNew = React.createClass({
  render: function () {
    return (
      <div>
        <div className='row navigation'>
          <div className='col-md-12'>
            <div id='cssmenu'>
              <ul className='nav nav-pills'>
                <li role='presentation'><Link to='/'>Hot</Link></li>
                <li role='presentation'><Link to='/all'>All</Link></li>
                <li role='presentation' className='active'><Link to='/new'>New</Link></li>
                <li role='presentation'><Link to='/wallet'>Wallet</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className='row page-content-new'>
          <div className='col-md-12'>
            <FormNewContent dattcore={this.props.dattcore}/>
          </div>
        </div>
      </div>
    )
  }
})

let FormNewContent = React.createClass({
  getInitialState: function () {
    return {
      inputTitle: '',
      inputLabel: '',
      inputName: '',
      inputBody: ''
    }
  },

  propTypes: {
    dattcore: React.PropTypes.object
  },

  handleTitleChange: function (el) {
    this.setState({
      inputTitle: el.target.value
    })
  },

  handleNameChange: function (el) {
    this.setState({
      inputName: el.target.value
    })
  },

  handleLabelChange: function (el) {
    this.setState({
      inputLabel: el.target.value
    })
  },

  handleBodyChange: function (el) {
    this.setState({
      inputBody: el.target.value
    })
  },

  handleSubmit: function (el) {
    return asink(function * () {
      el.preventDefault()
      let title = this.state.inputTitle
      let label = this.state.inputLabel
      let body = this.state.inputBody
      let name = this.state.inputName
      let dattcore = this.props.dattcore

      // create, but do not post or send the new content
      yield dattcore.asyncSetUserName(name)
      let contentauth = yield dattcore.asyncNewContentAuth(title, label, body)
      console.log('made data:')
      console.log(contentauth.toBuffer().toString('hex'))
      let obj = {
        datahex: contentauth.toBuffer().toString('hex'),
        LINK_ID: contentauth.getHash().toString('hex') // TODO: async/worker
      }
      let str = JSON.stringify(obj)
      console.log('sending')
      console.log(obj)
      this.serverRequest = $.post('https://9uc8g4loyk.execute-api.us-west-2.amazonaws.com/prod/link', str)
      .done(function (result) {
        console.log('submitted data. result: ' + result)
      })

      this.setState(this.getInitialState())
    }, this)
  },

  render: function () {
    return (
      <div className='row'>
        <div className='col-md-8 col-md-offset-2'>
          <div className='author-new-content well'>
            <form>
              <div className='form-group'>
                <label htmlFor='inputTitle'>
                  Title
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='inputTitle'
                  placeholder='Title'
                  onChange={this.handleTitleChange}
                  value={this.state.inputTitle} />
              </div>
              <div className='form-group'>
                <label htmlFor='inputBody'>
                  URL
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='inputBody'
                  placeholder='URL'
                  onChange={this.handleBodyChange}
                  value={this.state.inputBody} />
              </div>
              <div className='form-group'>
                <label htmlFor='inputBody'>
                  Your Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='inputBody'
                  placeholder='Your Name'
                  onChange={this.handleNameChange}
                  value={this.state.inputName} />
              </div>
              <button type='submit' className='btn btn-default' onClick={this.handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = PageContentNew

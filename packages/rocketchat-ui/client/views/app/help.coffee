Template.help.helpers
  title: ->
    RocketChat.settings.get 'Layout_Home_Title'
  body: ->
    RocketChat.settings.get 'Layout_Home_Body'
  userId: ->
    Meteor.userId()
  currentUser: ->
    x = undefined
    x = undefined
    x = RocketChat.models.Users.findOne('_id': Meteor.userId())
    x
  networkCount: ->
    q = undefined
    x = undefined
    q = undefined
    x = undefined
    x = RocketChat.models.Users.find({}).fetch()
    q = x.length
    q
Template.help.events 'submit .form-horizontal': (event) ->
  target = event.target
  category = target.category.value
  userName = target.userName.value
  situation = target.situation.value
  offer = target.os0.value
  selfUserId = Meteor.userId()
  data =
    category: category
    situation: situation
    userName: userName
    offer: offer
    selfUserId: selfUserId
  if !situation or target.situation.value == '!!!! PLEASE DESCRIBE YOUR SITUATION !!!!'
    url = '/help'
    event.preventDefault()
    target.situation.value = '!!!! PLEASE DESCRIBE YOUR SITUATION !!!!'
    return FlowRouter.go(url)
  else
    console.log data
    Meteor.call 'addCustomFields', data, ->
  return

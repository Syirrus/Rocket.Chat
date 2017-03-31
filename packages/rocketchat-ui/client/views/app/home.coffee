CountLines = undefined
CountLines = undefined
CountLines = []
Template.home.helpers
  title: ->
    RocketChat.settings.get 'Layout_Home_Title'
  body: ->
    RocketChat.settings.get 'Layout_Home_Body'
  decimalRound: (number) ->
    parseFloat(Math.round(number * 100) / 100).toFixed 2
  fUppercase: (string) ->
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  time: (ts, willPay) ->
    s = undefined
    hours = undefined
    s = new Date(ts).toISOString()
    switch willPay
      when 0.5
        hours = 2
      when 1
        hours = 4
      when 2
        hours = 8
      when 3
        hours = 16
      when 4
        hours = 24
      when 5
        hours = 48
    #console.log s
    moment(s, 'YYYY-MM-DDTHH:mm:ss.sssZ').add(hours, 'h').calendar()
  countID: (string) ->
    ele = undefined
    ele = undefined
    ele = undefined
    CountLines.push '.' + string
    ele = JSON.stringify(CountLines, null, 4)
    return
  directory: ->
    x = undefined
    x = undefined
    x = undefined
    x = RocketChat.models.Users.find({ 'customFields.isShowing': true }, sort: 'customFields.when': -1)
    x
Template.home.events
  'submit .loadHelpFrm': (event) ->
    personNeedingHelpId = undefined
    personNeedingHelpId = undefined
    personNeedingHelpId = undefined
    personNeedingHelpId = undefined
    event.preventDefault()
    #console.log event.target
    personNeedingHelpId = event.target.personNeedingHelpId
    #console.log 'button tapped' + personNeedingHelpId
    return
  'submit .dMessaging': (event) ->
    data = undefined
    uName = undefined
    url = undefined
    userIdOfPersonNeedingHelp = undefined
    data = undefined
    uName = undefined
    url = undefined
    userIdOfPersonNeedingHelp = undefined
    data = undefined
    uName = undefined
    url = undefined
    userIdOfPersonNeedingHelp = undefined
    event.preventDefault()
    uName = event.target.uName.value
    userIdOfPersonNeedingHelp = event.target.personNeedingHelpId.value
    console.log userIdOfPersonNeedingHelp
    data = name: uName
    if userIdOfPersonNeedingHelp == Meteor.userId()
      #console.log 'Do nothing same person clicking on themselves'
    else
      url = '/direct/' + uName
      FlowRouter.go url
      return Meteor.call('dMessaging', uName, ->
      )
    return
  'click #show': (e) ->
    showButton = undefined
    showButton = undefined
    showButton = undefined
    e.preventDefault()
    showButton = @_id
    $('.' + showButton).popover()
    return
Template.home.onRendered ->
  i = undefined
  i = undefined
  #console.log 'onRendered'
  i = 0
  while i < CountLines.length
    @$(CountLines[i]).popover()
    i++
  return
Template.home.onDestroyed ->
  CountLines = []
  return

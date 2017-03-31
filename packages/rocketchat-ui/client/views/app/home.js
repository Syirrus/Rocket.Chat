var CountLines;

CountLines = void 0;

CountLines = void 0;

CountLines = [];

Template.home.helpers({
  title: function() {
    return RocketChat.settings.get('Layout_Home_Title');
  },
  body: function() {
    return RocketChat.settings.get('Layout_Home_Body');
  },
  decimalRound: function(number) {
    return parseFloat(Math.round(number * 100) / 100).toFixed(2);
  },
  fUppercase: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  },
  time: function(ts, willPay) {
    var hours, s;
    s = void 0;
    hours = void 0;
    s = new Date(ts).toISOString();
    switch (willPay) {
      case 0.5:
        hours = 2;
        break;
      case 1:
        hours = 4;
        break;
      case 2:
        hours = 8;
        break;
      case 3:
        hours = 16;
        break;
      case 4:
        hours = 24;
        break;
      case 5:
        hours = 48;
        break;
    }
    return moment(s, 'YYYY-MM-DDTHH:mm:ss.sssZ').add(hours, 'h').calendar();
  },
  countID: function(string) {
    var ele;
    ele = void 0;
    ele = void 0;
    ele = void 0;
    CountLines.push('.' + string);
    ele = JSON.stringify(CountLines, null, 4);
  },
  directory: function() {
    var x;
    x = void 0;
    x = void 0;
    x = void 0;
    x = RocketChat.models.Users.find({
      'customFields.isShowing': true
    }, {
      sort: {
        'customFields.when': -1
      }
    });
    return x;
  }
});

Template.home.events({
  'submit .loadHelpFrm': function(event) {
    var personNeedingHelpId;
    personNeedingHelpId = void 0;
    personNeedingHelpId = void 0;
    personNeedingHelpId = void 0;
    personNeedingHelpId = void 0;
    event.preventDefault();
    personNeedingHelpId = event.target.personNeedingHelpId;
  },
  'submit .dMessaging': function(event) {
    var data, uName, url, userIdOfPersonNeedingHelp;
    data = void 0;
    uName = void 0;
    url = void 0;
    userIdOfPersonNeedingHelp = void 0;
    data = void 0;
    uName = void 0;
    url = void 0;
    userIdOfPersonNeedingHelp = void 0;
    data = void 0;
    uName = void 0;
    url = void 0;
    userIdOfPersonNeedingHelp = void 0;
    event.preventDefault();
    uName = event.target.uName.value;
    userIdOfPersonNeedingHelp = event.target.personNeedingHelpId.value;
    console.log(userIdOfPersonNeedingHelp);
    data = {
      name: uName
    };
    if (userIdOfPersonNeedingHelp === Meteor.userId()) {

    } else {
      url = '/direct/' + uName;
      FlowRouter.go(url);
      return Meteor.call('dMessaging', uName, function() {});
    }
  },
  'click #show': function(e) {
    var showButton;
    showButton = void 0;
    showButton = void 0;
    showButton = void 0;
    e.preventDefault();
    showButton = this._id;
    $('.' + showButton).popover();
  }
});

Template.home.onRendered(function() {
  var i;
  i = void 0;
  i = void 0;
  i = 0;
  while (i < CountLines.length) {
    this.$(CountLines[i]).popover();
    i++;
  }
});

Template.home.onDestroyed(function() {
  CountLines = [];
});

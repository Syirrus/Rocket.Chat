/*
var CountLines;
CountLines = [];
*/

Template.home.helpers({
  title: function() {
    return RocketChat.settings.get('Layout_Home_Title');
  },
  body: function() {
    return RocketChat.settings.get('Layout_Home_Body');
  },
  decimalRound: function(number) {
    if(number == 0){
      return "None";
    } else {
      answer = parseFloat(Math.round(number * 100) / 100).toFixed(2);
      return "$" + answer;
    }
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
    //return moment(s, 'YYYY-MM-DDTHH:mm:ss.sssZ').add(hours, 'h').calendar();
    return moment(s, 'YYYY-MM-DDTHH:mm:ss.sssZ').startOf('minute').fromNow();

  },
  /*
  countID: function(string) {
    var ele;
    CountLines.push('.' + string);
    ele = JSON.stringify(CountLines, null, 4);
  },
  */
  directory: function() { //'customFields.when': -1
    var x;
    x = RocketChat.models.Users.find({
      'customFields.isShowing': true
    }, {
      sort: {
        'customFields.willPay': -1
      }
    });
    return x;
  }
});

Template.home.events({

  'submit .loadHelpFrm': function(event) {
    var personNeedingHelpId;
    event.preventDefault();
    personNeedingHelpId = event.target.personNeedingHelpId;
  },

  'submit .read': function(event) {
    event.preventDefault();
    url = '/read/' + event.target.personNeedingHelpId.value;
    //FlowRouter.go(url);
    FlowRouter.redirect(url);
  },

  'submit .dMessaging': function(event) {
    var data, uName, url, userIdOfPersonNeedingHelp;
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
    e.preventDefault();
    showButton = this._id;
    $('.' + showButton).popover();
  }

});
/*
Template.home.onRendered(function() {
  var i;
  i = 0;
  while (i < CountLines.length) {
    this.$(CountLines[i]).popover();
    i++;
  }
});

Template.home.onDestroyed(function() {
  CountLines = [];
});
*/

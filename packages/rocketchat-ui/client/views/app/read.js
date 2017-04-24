Template.read.helpers({
  title: function() {
    return RocketChat.settings.get('Layout_Home_Title');
  },
  body: function() {
    return RocketChat.settings.get('Layout_Home_Body');
  },
  selFuserId: function() {
    return Meteor.userId();
  },
  fUppercase: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  },
  data: function() {
    var Id = FlowRouter.getParam("userId");
    x = RocketChat.models.Users.findOne({"_id": Id});
    return x;
  }
});

Template.read.events({

  'submit .dMessaging': function(event) {
    event.preventDefault();
    uName = event.target.uName.value;
    userIdOfPersonNeedingHelp = event.target.personNeedingHelpId.value;

    if (userIdOfPersonNeedingHelp === Meteor.userId()) {

    } else {
      url = '/direct/' + event.target.uName.value;
      FlowRouter.go(url);

      return Meteor.call('dMessaging', uName, function() {});
    }

  },

  'click #back': function(e) {
    e.preventDefault();
    url = '/home';
    FlowRouter.go(url);
  }
  
});

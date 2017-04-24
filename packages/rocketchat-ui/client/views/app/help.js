Template.help.helpers({
  title: function() {
    return RocketChat.settings.get('Layout_Home_Title');
  },
  body: function() {
    return RocketChat.settings.get('Layout_Home_Body');
  },
  userId: function() {
    return Meteor.userId();
  },
  currentUser: function() {
    var x;
    x = RocketChat.models.Users.findOne({
      '_id': Meteor.userId()
    });
    return x;
  },
  networkCount: function() {
    var q, x;
    x = RocketChat.models.Users.find({}).fetch();
    q = x.length;
    // var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
    // var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
  	// var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
    // console.log("ANDROID:" + deviceIsAndroid);
    // console.log("IOS:" + deviceIsIOS);
    return q;
  }
});

Template.help.events({
  'submit .form-horizontal': function(event) {
    var category, data, offer, selfUserId, situation, target, url, userName;

    target = event.target;
    category = target.category.value;
    userName = target.userName.value;
    situation = target.situation.value;
    offer = target.os0.value;
    selfUserId = Meteor.userId();

    data = {
      category: category,
      situation: situation,
      userName: userName,
      offer: offer,
      isShowing: false,
      selfUserId: selfUserId
    };

    var clearError = function (){
      document.getElementById("errorSituation").innerHTML = "";
      document.getElementById("errorSelect").innerHTML = "";
    }

    if (!situation || situation.length <= 30) {

      event.preventDefault();
      document.getElementById("errorSituation").innerHTML = "<span class='label label-danger'>Please tell us your situation in 30 characters or more!</span>";

      setTimeout(clearError, 6000);

    } else if(target.os0.value === "na") {

      event.preventDefault();
      document.getElementById("errorSelect").innerHTML = "<span class='label label-danger'>Please select an option!</span>";

      setTimeout(clearError, 6000);

    } else {

      // Check to see if user selected the free plan
    	if(offer == 0){
    		// Activate ad
    		data.isShowing = true;
    		url = '/home';
    		event.preventDefault();
    		Meteor.call('addCustomFields', data, function() {});
    		return FlowRouter.go(url);

    	} else {
	        console.log(data);
	        Meteor.call('addCustomFields', data, function() {});

      }
    }
  }
});

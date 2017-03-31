Meteor.methods({
  'addCustomFields': function(data) {
    var user;
    console.log('Hello CustomFields Method'); // Syirrus
    user = Meteor.user();
    RocketChat.models.Users.update({
      _id: data.selfUserId
    },
    {$set: {
              customFields : {
              situation: data.situation,
              userName: data.userName,
              willPay: parseFloat(data.offer),
              isShowing: false,
              category: data.category,
              when: new Date().getTime()
           }  }
    });
  }
});

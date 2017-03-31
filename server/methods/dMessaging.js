Meteor.methods({
  'dMessaging': function(uName) {
    var me, now, rid, to, username;
    username = uName;
    console.log(uName);
    if (!Meteor.userId()) {
      throw new Meteor.Error('invalid-user', "[methods] createDirectMessage -> Invalid user");
    }
    me = Meteor.user();
    if (!me.username) {
      throw new Meteor.Error('invalid-user', '[methods] createDirectMessage -> Invalid user');
    }
    if (me.username === username) {
      throw new Meteor.Error('invalid-user', "[methods] createDirectMessage -> Invalid target user");
    }
    to = RocketChat.models.Users.findOneByUsername(username);
    if (!to) {
      throw new Meteor.Error('invalid-user', "[methods] createDirectMessage -> Invalid target user");
    }
    rid = [me._id, to._id].sort().join('');
    now = new Date();
    RocketChat.models.Rooms.upsert({
      _id: rid
    }, {
      $set: {
        usernames: [me.username, to.username]
      },
      $setOnInsert: {
        t: 'd',
        msgs: 0,
        ts: now
      }
    });
    RocketChat.models.Subscriptions.upsert({
      rid: rid,
      $and: [
        {
          'u._id': me._id
        }
      ]
    }, {
      $set: {
        ts: now,
        ls: now,
        open: true
      },
      $setOnInsert: {
        name: to.username,
        t: 'd',
        alert: false,
        unread: 0,
        u: {
          _id: me._id,
          username: me.username
        }
      }
    });
    RocketChat.models.Subscriptions.upsert({
      rid: rid,
      $and: [
        {
          'u._id': to._id
        }
      ]
    }, {
      $setOnInsert: {
        name: me.username,
        t: 'd',
        open: false,
        alert: false,
        unread: 0,
        u: {
          _id: to._id,
          username: to.username
        }
      }
    });
    return {
      rid: rid
    };
  }
});

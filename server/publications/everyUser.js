Meteor.publish('everyUser', function() {
	if (!this.userId) {
		return this.ready();
	}
// Syirrus customFields

/*
	return RocketChat.models.Users.findUsersEveryone({
		fields: {
			username: 1,
			status: 1,
			utcOffset: 1,
			customFields: 1
		}
	});

	*/
});

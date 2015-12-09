Meteor.publish("websites", function() {
    return Websites.find();
});

Meteor.publish("UserKeywords", function(){
   return UserKeywords.find();
});

Meteor.publish("userData", function(argument) {
    return Meteor.users.find({}, {
        fields: {
            "_id": 1,
            "username": 1
        }
    });
});

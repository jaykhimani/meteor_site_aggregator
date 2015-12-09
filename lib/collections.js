Websites = new Mongo.Collection("websites");
UserKeywords = new Mongo.Collection("UserKeywords");

Websites.allow({
    insert: function(userId, doc) {
        if (Meteor.user()) {
            // force the image to be owned by the user
            doc.createdBy = userId;
            if (userId !== doc.createdBy) {
                return false;
            }
            // user is logged in
            return true;
        }
        // user not logged in
        return false;
    },
    update: function() {
        if (Meteor.user()) {
            return true;
        }
        return false;
    }
});

UserKeywords.allow({
    insert: function(userId, doc) {
        if (Meteor.user()) {
            return true;
        }

        return false;
    },
    update: function() {
        if (Meteor.user()) {
            return true;
        }

        return false;
    }
});

Meteor.users.allow({
    update: function(){
        return true;
    }
});

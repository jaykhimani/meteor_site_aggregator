Template.website_details.events({
    "submit .js-save-website-comment-form": function(event, template) {
        var comment = event.target.comment.value;
        var website_id = this._id;
        Websites.update({
            _id: website_id
        }, {
            $push: {
                comments: {
                    commenter: Meteor.user()._id,
                    commentText: comment,
                    createdOn: new Date()
                }
            }
        });
        return false;
    }
});

Template.comment.helpers({
    getCommenterName: function() {
        var user = Meteor.users.findOne({
            _id: this.commenter
        });
        if(user) {
            return user.username;
        }
        return '';
    }
});

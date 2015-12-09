Template.website_details.events({
    "submit .js-save-website-comment-form": function(event, template) {
        var comment = event.target.comment;
        var commentVal = comment.value;
        var website_id = this._id;
        Websites.update({
            _id: website_id
        }, {
            $push: {
                comments: {
                    commenter: Meteor.user()._id,
                    commentText: commentVal,
                    createdOn: new Date()
                }
            }
        });
        addUserKeywords(commentVal);
        comment.value = "";
        toastr.success('Comment successfully added', 'Comment');
        return false;
    }
});

Template.comment.helpers({
    getCommenterName: function() {
        var user = Meteor.users.findOne({
            _id: this.commenter
        });
        if (user) {
            return user.username;
        }
        return '';
    }
});

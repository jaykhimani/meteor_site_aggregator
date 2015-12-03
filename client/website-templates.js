/////
// template helpers
/////

// helper function that returns all available websites
Template.website_list.helpers({
    websites: function() {
        return Websites.find({}, {
            sort: {
                upVotes: -1,
                title: 1
            }
        });
    }
});

Template.website_item.helpers({
    getNumberOfUpVoters: function() {
        return this.upVoters.length;
    },
    getNumberOfDownVoters: function() {
        return this.downVoters.length;
    }
});


/////
// template events
/////

Template.website_item.events({
    "click .js-upvote": function(event) {
        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        if (Meteor.user()) {
            // put the code in here to add a vote to a website!
            var userId = Meteor.user()._id;

            var website = Websites.findOne({
                _id: website_id
            });

            if ($.inArray(userId, website.upVoters) === -1) {
                // user has not upvoted this site. add it to upVoters
                Websites.update({
                    _id: website_id
                }, {
                    $push: {
                        upVoters: Meteor.user()._id
                    },
                    $inc : {
                        upVotes: 1
                    }
                });
            } else {
                // user has already upvoted this site. do nothing.
                alert('You have already up voted this site');
            }
        } else {
            alert('Please signin to register your vote');
        }

        return false; // prevent the button from reloading the page
    },
    "click .js-downvote": function(event) {

        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;

        if (Meteor.user()) {
            // put the code in here to add a vote to a website!
            var userId = Meteor.user()._id;

            var website = Websites.findOne({
                _id: website_id
            });

            if ($.inArray(userId, website.downVoters) === -1) {
                // user has not upvoted this site. add it to downVoters
                Websites.update({
                    _id: website_id
                }, {
                    $push: {
                        downVoters: Meteor.user()._id
                    },
                    $inc : {
                        downVotes: 1
                    }
                });
            } else {
                // user has already upvoted this site. do nothing.
                alert('You have already down voted this site');
            }
        } else {
            alert('Please signin to register your vote');
        }

        return false; // prevent the button from reloading the page
    }
})

Template.website_form.events({
    "click .js-toggle-website-form": function(event) {
        $("#website_form").toggle('slow');
    },
    "submit .js-save-website-form": function(event, template) {

        // here is an example of how to get the url out of the form:
        var url = event.target.url.value;
        var title = event.target.title.value;
        var description = event.target.description.value;
        if (isEmpty(url)) {
            alert('Site address cannot be empty');
            return false;
        }

        if (isEmpty(description)) {
            alert('Site description cannot be empty');
            return false;
        }

        //  put your website saving code in here!
        Websites.insert({
            title: title,
            url: url,
            description: description,
            createdOn: new Date(),
            createdBy: Meteor.user()._id,
            upVoters: [],
            downVotes: [],
            upVotes: 0,
            downVotes: 0
        });
        // Close the form
        $("#website_form").toggle('slow');
        template.find("form").reset();
        return false; // stop the form submit from reloading the page
    }
});

/////
// template helpers
/////

Template.website_suggestion_list.helpers({
    suggestedWebsites: function() {
        var user = Meteor.user();
        if (user.profile) {
            var keywords = user.profile.keywords;
            if (keywords && keywords.length > 0) {
                var orClause = [];
                var searchCriteria = {};
                for (var i = 0; i < keywords.length; i++) {
                    orClause.push({
                        description: new RegExp(keywords[i])
                    });
                }
                searchCriteria["createdBy"] = {
                    "$ne": Meteor.userId()
                };
                searchCriteria["upVoters"] = {
                    "$nin": [Meteor.userId()]
                };
                searchCriteria["$or"] = orClause;
                return Websites.find(searchCriteria, {
                    sort: {
                        upVotes: -1,
                        createdOn: 1,
                        title: 1
                    }
                });
            }
        }
        return [];
    }
});

// helper function that returns all available websites
Template.website_list.helpers({
    websites: function() {
        var searchCriteria = {};
        if (Session.get("searchTerms")) {
            var searchTerms = Session.get("searchTerms");
            var orclause = [];
            if (searchTerms.charAt(0) === '"' && searchTerms.charAt(searchTerms.length - 1) === '"') {
                // Search is for full text and not each words in the text
                searchTerms = searchTerms.substring(1, searchTerms.length - 1);
                orclause.push({
                    title: new RegExp(searchTerms)
                });
                orclause.push({
                    description: new RegExp(searchTerms)
                });
            } else {
                // Search for each term
                var splits = searchTerms.split(" ");
                for (var cntr = 0; cntr < splits.length; cntr++) {
                    orclause.push({
                        title: new RegExp(splits[cntr])
                    });
                    orclause.push({
                        description: new RegExp(splits[cntr])
                    });
                }
            }
            searchCriteria["$or"] = orclause;
        }
        return Websites.find(searchCriteria, {
            sort: {
                upVotes: -1,
                createdOn: 1,
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
    },
    getNumberOfComments: function() {
        return this.comments.length;
    }
});

Template.website_search_form.helpers({
    getSearchTerms: function() {
        return Session.get('searchTerms');
    }
});

Template.website_form.helpers({
    getNewSiteTitle: function() {
        return Session.get('newWebsiteTitle');
    },
    getNewSiteDescription: function() {
        return Session.get('newWebsiteDescription');
    }
});

Template.website_title_desc.helpers({
    getCreator: function() {
        var user = Meteor.users.findOne({
            _id: this.createdBy
        });
        if (user) {
            return user.username;
        }
        return '';
    }
});

/////
// template events
/////

Template.navbar.rendered = function() {
    $('[data-toggle=popover]').popover({
        html: true,
        trigger: 'focus',
        container: 'body'
    });
};

Template.tabcontainer.events({
    "click .js-tab": function(event, template) {
        Session.set("CurrentTab", event.target.hash);
    }
});

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
                    $inc: {
                        upVotes: 1
                    }
                });

                addUserKeywords(website.description);

            } else {
                // user has already upvoted this site. do nothing.
                toastr.warning('You have already up voted this site');
            }
        } else {
            toastr.warning('Please signin to register your vote');
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
                    $inc: {
                        downVotes: 1
                    }
                });
            } else {
                // user has already upvoted this site. do nothing.
                toastr.warning('You have already down voted this site');
            }
        } else {
            toastr.warning('Please signin to register your vote');
        }

        return false; // prevent the button from reloading the page
    }
})

Template.website_form.events({
    "click .js-toggle-website-form": function(event) {
        $("#website_form").toggle('slow');
    },
    "blur .js-website-url": function(event) {
        var objTitle = event.target.title;
        Meteor.call("getUrlDetails", event.target.value, 'GET', function(error, result) {
            if (result) {
                if (result.error) {
                    Session.set('newWebsiteTitle', undefined);
                    Session.set('newWebsiteDescription', undefined);
                    toastr.error('Cannot add new site: ' + result.error);
                } else {
                    Session.set('newWebsiteTitle', result.title);
                    Session.set('newWebsiteDescription', result.description);
                }
            }
        });

    },
    "submit .js-save-website-form": function(event, template) {

        // here is an example of how to get the url out of the form:
        var url = event.target.url.value;
        var title = event.target.title.value;
        var description = event.target.description.value;
        if (isEmpty(url)) {
            toastr.error('Site address cannot be empty');
            return false;
        }

        if (isEmpty(description)) {
            toastr.error('Site description cannot be empty');
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
            downVoters: [],
            upVotes: 0,
            downVotes: 0,
            comments: []
        });
        // Close the form
        $("#website_form").toggle('slow');
        template.find("form").reset();
        Session.set('newWebsiteTitle', undefined);
        Session.set('newWebsiteDescription', undefined);
        return false; // stop the form submit from reloading the page
    }
});

Template.website_search_form.events({
    "keyup .js-search-terms": function(event, template) {
        var searchTerms = event.target.value;
        if (searchTerms.length === 0) {
            Session.set('searchTerms', undefined);
        } else {
            Session.set('searchTerms', searchTerms);
        }
        return true;
    }
});

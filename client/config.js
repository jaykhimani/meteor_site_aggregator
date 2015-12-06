/// Accounts config
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Tracker.autorun(function() {
    Meteor.subscribe("websites");
    Meteor.subscribe("userData");
});

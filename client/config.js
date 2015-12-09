/// Accounts config
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Tracker.autorun(function() {
    Meteor.subscribe("websites");
    Meteor.subscribe("userData");
    Meteor.subscribe("UserKeywords")
});

toastr.options = {
    closeButton: true,
    preventDuplicates: true,
    positionClass: "toast-top-center",
    timeOut: 2000
}

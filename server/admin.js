Accounts.validateLoginAttempt(function(attempt) {
    // This does nothing as of now, but this is more of a reminder on how/where we can hook our code at the time of authentication. For example commentted line shows how to stop authentication if the email is not verified.
    if (!attempt.allowed) {
        return false;
    }
    // if(!attempt.user.emails[0].verified) {
    //     throw new Meteor.Error('email-not-verified', 'Email not verified')
    // }
    return true;
});

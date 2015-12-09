///////
// Global JS functions
///////
isEmpty = function(val) {
    return !$.trim(val);
}

addUserKeywords = function(keywordsToExtracFrom) {
    var parsed = nlp.pos(keywordsToExtracFrom);
    var nouns = parsed.nouns();
    var nounsAry = [];
    for (var i = 0; i < nouns.length; i++) {
        var noun = nouns[i];
        nounsAry.push(noun.text);
    }
    Meteor.users.update({
        _id: Meteor.userId()
    }, {
        $addToSet: {
            "profile.keywords": {
                $each: nounsAry
            }
        }
    });
};

///////
// Template helpers
///////
Template.registerHelper("formatDate", function(date, format) {
    return moment(date).format(format);
});

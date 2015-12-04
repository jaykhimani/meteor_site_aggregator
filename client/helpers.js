isEmpty = function(val) {
    return !$.trim(val);
}

Template.registerHelper("formatDate", function(date, format){
    return moment(date).format(format);
});

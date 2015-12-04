// start up function that creates entries in the Websites databases.

Meteor.startup(function() {
    // code to run on server at startup

    // Define server methods to invoked from client
    var cheerio = Npm.require('cheerio');
    Meteor.methods({
        getUrlDetails: function(url, method) {
            var result, title, desc, err;
            try {
                result = HTTP.call(method, url);
            } catch (e) {
                err = e.message
                if(err === 'getaddrinfo ENOTFOUND') {
                    err = 'Website with url "' + url + '" not found.';
                }
            }
            if (result) {
                if (!result.error) {
                    $ = cheerio.load(result.content);
                    title = $('title').text().trim();
                    desc = $('meta[name=description]').attr('content');
                }
            }
            return {
                error: err,
                title: title,
                description: desc
            }
        }
    });

    // Populate with some startup data
    if (!Websites.findOne()) {
        console.log("No websites yet. Creating starter data.");
        Websites.insert({
            title: "Goldsmiths Computing Department",
            url: "http://www.gold.ac.uk/computing/",
            description: "This is where this course was developed.",
            createdOn: new Date(),
            createdBy: "System",
            upVoters: [],
            downVoters: [],
            upVotes: 0,
            downVotes: 0,
            comments: []
        });
        Websites.insert({
            title: "University of London",
            url: "http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
            description: "University of London International Programme.",
            createdOn: new Date(),
            createdBy: "System",
            upVoters: [],
            downVoters: [],
            upVotes: 0,
            downVotes: 0,
            comments: []
        });
        Websites.insert({
            title: "Coursera",
            url: "http://www.coursera.org",
            description: "Universal access to the world’s best education.",
            createdOn: new Date(),
            createdBy: "System",
            upVoters: [],
            downVoters: [],
            upVotes: 0,
            downVotes: 0,
            comments: []
        });
        Websites.insert({
            title: "Google",
            url: "http://www.google.com",
            description: "Popular search engine.",
            createdOn: new Date(),
            createdBy: "System",
            upVoters: [],
            downVoters: [],
            upVotes: 0,
            downVotes: 0,
            comments: []
        });
    }
});

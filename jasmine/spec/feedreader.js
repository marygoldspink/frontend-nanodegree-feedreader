/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loop through each feed in the allFeeds object 
         * and ensures each one has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has a url defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                let feed = allFeeds[i];
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        /* Loop through each feed in the allFeeds object 
         * and ensures each one has a name defined
         * and that the name is not empty.
         */
        it('each feed has a name defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                let feed = allFeeds[i];
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Test suite for the menu */
    describe('The menu', function() {

        /* Ensures the menu element is hidden by default by looking
         * for the presence of the menu-hidden class on the body element
         */
        it('menu is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Ensures the menu changes visibility when the menu icon is clicked. 
          */
         it('menu is shown when clicked', function() {
            // get the menu element and click it using jquery
            let menuElement = $('.menu-icon-link');
            menuElement.click();

            // check the menu-hidden class does not appear on the body element
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // now hide it by clicking it again
            $(menuElement).click();

            // check the menu-hidden class is now back on the body element.
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite for initial entries logic */
    describe('Initial Entries', function() {

        /* Before each test ensure we empty the feed element so we don't
         * worry about previous tests affecting each other.
         */
        beforeEach(function() {
            // empty the feedContainer so it isn't affected by other tests
            const feedContainer = $('.feed');
            feedContainer.empty();
        });

        /* Check that the entry element exists in the feed.
         * There maybe multiple so verify that at least one is there.
         */
        it('entry element is in feed container', function(done) {
            loadFeed(0, function() {
                const entryInFeedContainer = $('.feed .entry');
                expect(entryInFeedContainer.length >= 1).toBe(true);
                done();
            });
        });

    });

    /* Test suite for verifying "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* Before each test ensure we empty the feed element so we don't
         * worry about previous tests affecting each other.
         */
        beforeEach(function() {
            // empty the feedContainer so it isn't affected by other tests
            const feedContainer = $('.feed');
            feedContainer.empty();
        });

        /* Ensure that the entry element inside of the feed is changed when
         * we load a different feed.
         */
        it('entry element changes in feed container', function(done) {
            // load the first feed to fill the feedContainer
            loadFeed(0, function() {
                const entryInFeedContainer = $('.feed .entry');
                const contentOfFirstFeed = entryInFeedContainer.html();

                // now load a different feed
                loadFeed(1, function() {
                    const entryInFeedContainer = $('.feed .entry');
                    const contentOfSecondFeed = entryInFeedContainer.html();
    
                    // we'll compare the html result of the first feed and second feed
                    // they should not be equal if they're from different feeds.
                    expect(contentOfFirstFeed).not.toBe(contentOfSecondFeed);
                    done();
                });
            });
        });

    });
}());

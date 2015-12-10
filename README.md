Website Aggregator
==================

Website aggregator using meteor framework.

This demo app contains following features

1.	Users can register and login.

2.	Users can post new websites if they are logged in. Websites posted by users should have an URL and a description.

	-	After adding URL, application will fetch website details and suggest title and description by filling relevant fields. User is free to change or accept it.
	-	If website is not found or there is any error, proper error message will be displayed and website will not be added.

3.	Users can up and down vote webpages by clicking a plus or a minus button.

4.	Websites should be listed with the most up voted site first.

5.	The listing page shows when the website was added and how many up and down votes it has.

6.	Users can move to a detail page for a website (using routing).

7.	On the detail page, users can post comments about a webpage, and they are displayed below the description of the webpage.

8.	User can search for the sites. Search is based on the website titles and description.

9.	two flavors of search is supported

	-	Exact search: If search term is placed between double quotes, search will look for exact term in available sites title and description.
	-	Open Search: User can enter multiple search term without wrapping them in double quotes and search will based on each term. Any site's title or description has any of the term, will be part of the result.

10.	If you are logged in and have up voted some sites or add comments to some sites, app will also suggest you other sites which are based on the sites you up voted or commented.

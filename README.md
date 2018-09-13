**PhotosWebSite**

*Run Locally*

To run, enter the following command in a terminal:

    webpack-dev-server -d

Then browse to:

    http://localhost:9000/

*Deploy*

Type the following commands into a terminal:

   ./deploy.sh

Provide the password for the FTP account, which is the usual password since the UK.

*Backlog*

* focus on album catalog, so <space> and <arrows> work when arriving and returning to it
* consider using Highmaps (from Highcharts)
* fix 'dummy' in Iceland
* remove 'albums' from spreadsheet, and then instead of having to remove it from thumb.php5 param, add it to full-sized photo src
* convert videos
* fix portrait/fullscreen on mobile not to have too big a font!
* update document title when navigating
* the drop shadow is _just_ visible when the headers scroll away, which means the top of the top picture is never 100% clear
* better accessibility for phones (e.g., controls at bottom/center? swipe for next photo?)

*UX improvements*

* style map better: better colors, better legend, better hover-overs, better responsiveness, zooming in for caribbean
* full-screen from places other than home page?
* album icon is ambiguous: perhaps a consistent back-button would be better
* don't show photos loading on album
* don't show main photo loading
* don't show photos loading on album catalog
* hiding prev/next on touch devices (e.g., phones)
* see how it looks with always square thumbnails (tricky on last line!)


*Icebox*

* send message to web master
* show map of dive destinations
* go to next/prev album from within album



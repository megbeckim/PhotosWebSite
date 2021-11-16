**PhotosWebSite**

*Run Locally*

To run, enter the following command in a terminal:

    webpack-dev-server

Then browse to:

    http://localhost:9000/

Then to test, in a second terminal:

    npm test

*Deploy*

Type the following commands into a terminal:

   ./deploy.sh

Provide the password for the FTP account, which is the usual password since the UK.

*Upload Photos*

Firstly, resize them to "fit within" 1,280 x 1,024. This is easily done by opening all of the files in
the MacOS Preview app, selecting all of them, and then using the "Tool" "Resize" menu option. Since this lowers the
resolution of most photos, ONLY DO THIS ON COPIES OF THE PHOTOS. Then close Preview.

Next, upload the resized files. Instructions are in the Google Doc with the spreadsheet data in it.

*Backlog*

* download diff quality images based on screen size (mobile vs. desktop) or bandwidth (do a probe?)
* make thumbnail images better quality (what's wrong with them again???)
* update document title when navigating
* fix portrait/fullscreen on mobile not to have too big a font!
* consider using Highmaps (from Highcharts)
* remove 'albums' from spreadsheet, and then instead of having to remove it from thumb.php5 param, add it to full-sized photo src
* convert videos
* the drop shadow is _just_ visible when the headers scroll away, which means the top of the top picture is never 100% clear
* better accessibility for phones (e.g., controls at bottom/center? swipe for next photo?)

*UX improvements*

* style map better: better colors, better legend, better hover-overs, better responsiveness, zooming in for caribbean, antartica
* full-screen from places other than home page
* album icon is ambiguous: perhaps a consistent back-button would be better
* don't show photos loading on album
* don't show main photo loading
* don't show photos loading on album catalog
* hide and disable prev/next on touch devices (e.g., phones)
* see how it looks with always square thumbnails (tricky on last line!)

*Icebox*

* send message to webmaster
* show map of dive destinations
* go to next/prev album from within album



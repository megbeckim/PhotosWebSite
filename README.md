# PhotosWebSite

## To Run Locally

To run, enter the following command in a terminal:

    webpack-dev-server

Then browse to [https://localhost:9000/](https://localhost:9000/).

Then to test, in a second terminal run the following command:

    npm test

If you see the error "This version of ChromeDriver only supports Chrome version XX"
for some version number XX, then update your ChromeDriver with the following command:

    npm run e2e-setup

That didn't work for some reason, but running this afterwards fixed it:

    npm install chromedriver --chromedriver-force-download

## To Deploy

Type the following commands into a terminal:

    ./deploy.sh

Provide the password for the FTP account, which is the usual password since the UK.

Then to test, in a second terminal run the following command:

    npm run test-prod

## To Upload Photos

Firstly, resize them to "fit within" 1,280 x 1,024. This is easily done by opening all of the files in
the MacOS Preview app, selecting all of them, and then using the "Tool" "Resize" menu option. Since this lowers the
resolution of most photos, ONLY DO THIS ON COPIES OF THE PHOTOS. Then close Preview.

Next, upload the resized files. Further instructions are in the Google Doc that contains the album data.

## Backlog

* update to BrowserRouter (instead of HashRouter) - might break bookmarks!
* make text stand out more (grey translucent background?)
* add full screen to all menus
* scroll up-down on photos
* make sure zoom-in works on pictures on phone
* hide decorations on photos by tapping on screen
* download diff quality images based on screen size (mobile vs. desktop) or bandwidth (do a probe?)
* make thumbnail images better quality (what's wrong with them again???)
* update document title when navigating
* fix portrait/fullscreen on mobile not to have too big a font!
* consider using Highmaps (from Highcharts)
* remove 'albums' from spreadsheet, and then instead of having to remove it from thumb.php5 param, add it to full-sized photo src
* the drop shadow is _just_ visible when the headers scroll away, which means the top of the top picture is never 100% clear
* better accessibility for phones (e.g., controls at bottom?)

## UX improvements

* style map better: better colors, better legend, better hover-overs, better responsiveness, zooming in for caribbean, 
add Antarctica
* full-screen from places other than home page
* album icon is ambiguous: perhaps a consistent back-button would be better
* don't show photos loading in album
* don't show album cover photo loading
* don't show photos loading on album catalog
* hide and disable prev/next on touch devices, since swiping is preferred and 
they take up valuable display pixels? (e.g., phones)
* see how it looks with always square thumbnails (tricky on last line!)

*Icebox*

* send message to webmaster
* show map of dive destinations
* go to next/prev album from within album



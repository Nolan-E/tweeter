# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express and MongoDB back-end skills.
****
## Initial Setup

1. Fork this repository, then clone your fork of this repository.
   
2. Install all dependencies:
  ```shell
  npm install
  ```

3. Start the development web server using:
  ```shell
  npm start
  ```

4. Open your web browser and enter the default URL:
  ```browser
  http://localhost:8080/
  ```
5. When finished, shut the server down with `control + c`.
****
## Final Product

!["Tweeter Desktop Breakpoint"](https://github.com/Nolan-E/tweeter/blob/master/docs/Tweeter_Desktop.png?raw=true)
<br>

!["Tweeter Mobile Hover"](https://github.com/Nolan-E/tweeter/blob/master/docs/Tweeter_MobHover.png?raw=true)
<br>

!["Tweeter Mobile Error"](https://github.com/Nolan-E/tweeter/blob/master/docs/Tweeter_MobErr.png?raw=true)

****
## Additional Features
- Click "write a new tweet" to expose compose new tweet area and auto-focus on the textarea field.
- Error messages slide up & down.
- Custom hover effects when hovering over an individual tweet in the feed.
****
## Dependencies

- Node 5.10.x or above
- Body-parser
- Chance
- Express
- MD5

****
## Known Issues

- In a full desktop  window media layout, "header" background doesn't stretch all of the way to the bottom without posting more tweets in the feed.
- Enter key creates new line in the compose new tweet box.
****
## Future Updates

- Refactor CSS using SASS.
- Add "to the top" fixed position button, visible while scrolling down the page.
- Add additional media query breakpoints for wider array of device optimization.
- Add "x" button to close the error message box, instead of just clearing errors on valid tweet submission.
- Add support for submitting new tweet form with enter key (instead of enter creating a new line).

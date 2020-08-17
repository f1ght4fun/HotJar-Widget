### User Story

As a Hotjar user, I want to be able to create a funnel using an in-page widget on my own site.

#### Why are we doing this?

Our users currently configure Hotjar funnels by manually writing the URLs or a CSS selector they wish to track (for example: visit to www.site.com, click on _#purchase-button_ in www.site.com/product, visit to www.site.com/cart). Hotjar would then use this data to populate a funnel report and show how many users are dropping off between each step.

In an effort to improve the user experience for our users, we would like to implement an in-app widget that would load on users’ websites and allow them to select the pages and elements directly from their site. This would also decrease the amount of funnel report failures due to users writing the URLs or CSS selectors incorrectly.

#### Design Prototype

[Design link](https://www.figma.com/file/f5naBOjKqoog2jhHvM5gfj/Front-end-Engineering-task?node-id=1%3A141)

#### Acceptance Criteria

- For each new step, the user can:
  - Add the current URL
  - Add an element from the page by bringing up a selector that allows you to visually highlight and select the element you want to add, providing the following options when it’s clicked:
    - Any element:
      1.  **Viewed** - Meaning at any point in time it was visible in the view-port (such as scrolling down and seeing the element).
      2.  **Clicked** - Any time an element such as an `<a>, <div>, <img>, <button>`, etc is clicked.
    - Form elements which support key press events (`<input type=”[text/password/email/etc.”>`, `<textarea>`):
      1.  **Key pressed** or **filled** - Meaning an element had its value changed.
      2.  **Focus** - Meaning an element received focus from the user.
    - Form elements which support change events (`<select>`, `<input type=”[checkbox/radio]”>`):
      1.  **Change** - Whenever the element was changed.
- A “**Save funnel**” button that sends the collected data by calling the submit() function from the @api package. Please set the element _id_ to be “**save-funnel**”.
- An “**X**” close button that closes the widget when clicked. Please set the element _id_ to be “**close-widget**”.
- The widget should maintain state across multiple pages and remember the steps throughout the session. This will allow users to navigate their site and build a funnel that could consist of multiple page URLs.

#### Important Notes

- The Acceptance Criteria is the source of truth, not the design.
- There is a supplied design that shows the intended experience / visuals for the widget itself - the rest is up to you.
- You can use your own boilerplate.
- Any usage of a third party library is allowed but must be explained in the comments or `widget/README.md`.
- You can change any code, but the code review will be only done in `widget/src/` folder and on `widget/README.md` file.
- For this boilerplate to run, you will need to run `npm install; npm start` in both `demosite/` and `widget/` and make sure that the 3000 and 3001 ports are available.

---

### Good luck!

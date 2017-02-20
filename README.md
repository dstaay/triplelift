## ITEMLIST APP

A small, object-oriented JS (ES6) app to create a list of items, and pass items as an array of strings to a callback function on submit Event.  App supports multiple instances on single webpage

### USAGE

To add to existing html page, add a containing div, and add script tag:

```
  <div id="app_instance"></div>
  ...
  <script src="app/app.js"></script>
```

For onload Event, call newItemList(id, callback(listArray)).  The callback function will be called with an array of strings on submit Event.

using above example, a function call would be:

```
  <body onload="newItemList('app_instance', listArray => { ... }">
```

# Website 3.0

## Setup Webpage

Basic page layout

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Good Long Description" />
    <title>Document</title>
    <link rel="stylesheet" href="/style/typography.css" />
    <link rel="stylesheet" href="/style/main.css" />
    <script defer src="/src/main.js" type="module"></script>
  </head>
  <body>
    <!--Add To all Pages-->
    <menu-button src="/images/utils/menu.svg" id="menu-button"></menu-button>
    <side-nav id="side-nav"></side-nav>
    <search-bar id="search-bar"></search-bar>
    <search-pop-up id="search-pop-up" open=false searchfor=""></search-pop-up>
    <!--    -->

    <!--Main Content-->
    <div id="content-container">
      <main id="main">
        <h1> HEADING </h1>
        <div id="card-container">
          <!--Cards attached from notes.js-->
        </div>
      </main>
    </div>
    <!--Main Content End-->
  </body>
</html>
```

## Components

### Add all basic components

```javascript
// -- components initiated in main.js -- import from component.js
customElements.define("menu-button", IconButton);
customElements.define("side-nav", SideNav);
customElements.define("search-bar", GlobalSearch);
customElements.define("search-pop-up", SearchPopUp);
customElements.define("show-error", ShowError);
customElements.define("topic-card", Card);
//  ---
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="/style/typography.css" />
    <link rel="stylesheet" href="/style/main.css" />
    <script defer src="/src/main.js" type="module"></script>
  </head>
  <!-- Basic Template -->
  <body>
    <!--Add To all Pages-->
    <menu-button src="/images/utils/menu.svg" id="menu-button"></menu-button>
    <side-nav id="side-nav"></side-nav>
    <search-bar id="search-bar"></search-bar>
    <search-pop-up id="search-pop-up" open=false searchfor=""></search-pop-up>
    <!--    -->
    <div id="content-container">
      <main id="main">
        <div id="card-container"></div> <!--remove where no cards-->
      </main>
    </div>
  </body>
<html>
```

### Cards

Could be used directly in HTML

```html
<topic-card title="Test" image="/images/utils/interface.svg" ...otherattributes></topic-card>
```

Initialize and append from javascript

```javascript
//create card
customElements.define('topic-card', Card);

// -- init and append card
const card = document.createElement('topic-card');
card.setAttribute('title', 'Test Title');
card.setAttribute('image', '/images/utils/interface.svg');
card.setAttribute('tags', 'salesforce, web-dev');
card.setAttribute('desc', 'Spring Boot is an open source, microservice-based Java web framework. Spring takes an opinionated approach for developing Spring application. This allows it to reducea lot of setup and get quick running application.');
card.setAttribute('date', '10 JAN, 2023');
card.setAttribute('link', '/articles.html');
cardContainer.appendChild(card);
```

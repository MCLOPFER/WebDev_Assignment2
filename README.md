<img src="images/logo.png" width="200" height="200" />

# Whether(Weather)
Whether(Weather), this application provides information on the weather forecast using the latest satellite technology.
The features include what we all look for a weather app, it provides a weekly and hourly forecasts, current temperature, precipitation probability and images to improve your experience.
The weather app supports different locations and different times zones. It is a nice option of staying informed about the weather, planning your activities, and making informed decisions.

- [Whether(Weather)](#whetherweather)
  - [Features](#features)
  - [Installation Instructions](#installation-instructions)
    - [Prerequisite tools to install](#prerequisite-tools-to-install)
    - [Build command](#build-command)
  - [Usage](#usage)
  - [Tools and Technology used](#tools-and-technology-used)
  - [How access it](#how-access-it)
  - [Directory structure](#directory-structure)
  - [Source Attributions](#source-attributions)
  - [Authors](#authors)


## Features
- Dashboard page displaying all cities current weather
- Home page displaying favourite cities current weather
- City focus page displaying the weeks weather forecast
- Hourly focus page displaying the next 24hr weather forecast for a city
- Settings page with the following options:
    - Ability to select favourite cities
    - Ability to select favourite speed units
    - Ability to select favourite temperature units

## Installation Instructions

### Prerequisite tools to install
- [Nunjucks](https://mozilla.github.io/nunjucks/getting-started.html)

### Build command
To build this project run the following command from the root directory of the repo
``` console
$ eleventy
[11ty] Writing _site/index.html from ./index.njk
[11ty] Writing _site/home/index.html from ./home.njk
[11ty] Writing _site/README/index.html from ./README.md (liquid)
[11ty] Writing _site/hourlyCityFocus/index.html from ./hourlyCityFocus.njk
[11ty] Writing _site/settings/index.html from ./settings.njk
[11ty] Writing _site/cityFocus/index.html from ./cityFocus.njk
[11ty] Copied 22 files / Wrote 6 files in 0.07 seconds (v2.0.1)
```

## Usage
To run this project locally using eleventy, run the following command:
``` console
$ eleventy --serve
[11ty] Writing _site/README/index.html from ./README.md (liquid)
[11ty] Writing _site/cityFocus/index.html from ./cityFocus.njk
[11ty] Writing _site/home/index.html from ./home.njk
[11ty] Writing _site/hourlyCityFocus/index.html from ./hourlyCityFocus.njk
[11ty] Writing _site/settings/index.html from ./settings.njk
[11ty] Writing _site/index.html from ./index.njk
[11ty] Copied 22 files / Wrote 6 files in 0.06 seconds (v2.0.1)
[11ty] Watching…
[11ty] Server at http://localhost:8080/
```

You can now access the website locally at http://localhost:8080/

## Tools and Technology used
- HTML
- Bulma CSS
- JavaScript
- Nunjucks
- JQuery
- Eleventy
- Netlify
- Git

## How access it
You would just need internet and a device where you can open the following link: 

## Directory structure
``` console
#eleventy build the output

.
├── MariCruzLopez_assignment2_template.pages
├── _includes
│   ├── cityFavSwitch.njk
│   ├── cityFocusTile.njk
│   ├── cityTile.njk
│   ├── footer.njk
│   ├── head.njk
│   ├── hourlyCityFocusTile.njk
│   └── navbar.njk
├── cityFocus.njk
├── css
│   ├── bulma-extensions.min.css
│   └── bulma.min.css
├── home.njk
├── hourlyCityFocus.njk
├── images
│   └── <all weather images>.png
├── index.njk
├── js
│   ├── all.js
│   ├── pages
│   │   ├── cityFocus.js
│   │   ├── home.js
│   │   ├── hourlyCityFocus.js
│   │   ├── index.js
│   │   └── settings.js
│   ├── utils.js
│   └── weather_data
│       └── weather_data.js
├── package.json
├── README.md
└── settings.njk
```

## Source Attributions
- Weather images and logo: https://flaticon.com
- Icons in the project: https://fontawesome.com
- Weather code references: data-definition.pdf (page 19-20) 

## Authors

- Mari Cruz Lopez: 20108907@gmail.wit.ie
- Student Number: 20108907
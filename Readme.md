[![](https://img.shields.io/github/forks/Samarth-HP/templater?style=social)](http://makeapullrequest.com)
[![](https://img.shields.io/github/release-date/Samarth-HP/templater)](http://makeapullrequest.com)
[![](https://img.shields.io/github/languages/count/Samarth-HP/templater)](http://makeapullrequest.com)
[![](https://img.shields.io/github/issues/Samarth-HP/templater/good-first)](http://makeapullrequest.com)
[![](https://img.shields.io/github/issues/Samarth-HP/templater)](http://makeapullrequest.com)



## 📃 Templater

Templater is a REST API service that can store, manage and render templates. A Template is like a well-defined format in which data can be entered. The output generated is according to the format defined in the template. Templater helps us simplify and enhance this process by providing multiple services such as Data transformation, Lambda API, User interface, Support for multiple engines, etc. 

### 📖 Table of Contents 

- [Objectives](#🏹-objectives)
- [Architecture](#👷-architecture)
- [Core Features](#💻-core-features)
- [Example use case/(s)](#🚻-use-cases)
- [API Overview](#🪜-api-overview)
- [Schema Overview](#🔭-schema-overview)
- [Contribution guidelines](#ℹ-contribution-guidelines)
- [FAQs](#❓faqs)


###  🏹 Objectives

The objectives of templater are as follows:

- Efficient template management and storage
- Provide CRUD operations on templates with the help of our API
- Allow rendering of the templates. Rendering is the output generated after filling the data. It is a combination of Data + Template. A - person inputs some data to the template, Whatever output is achieved is considered to be part of the rendering procedure

###  👷 Architecture



###  💻 Core Features

### Transformer

The Transformer is one of the building blocks of Templater API. It helps us in Data transformation. Before inserting data into a template we can run a Transformer, they are of two types:

1. OPTIONS
This transformer replaces the target item with the specified value. These two items are stored in the form of key-value pairs. The key parameter contains the target item while the value paramater consists of new item which will replace the target item. For example:

```
{
    "type": "OPTIONS",
    "meta" : {
        "options": [
            {
                "key": "Original Text",
                "value": "This is the new text which will be replaced"
            },
            {
                "key": "Pratik",
                "value": "Sam"
            }
        ]
    }
}
```

In the above case, Whenever the text “Original Text” is hit, It will be immediately replaced by the contents of the value parameter "This is the new text which will be replaced". Similarly, when the string “Pratik” is found, it will be directly replaced by the string “Sam”

2. Cloud Functions
For a particular key, this transformer can trigger a specific cloud function. Whenever a value is found that matches the key parameter, this Transformer will invoke a cloud function that is specified in the value parameter For example:

```
{
    path: "data.username",
    type: "options", //enum => options, function
    meta: {
        options: [
            {
                key: 1,
                value: "cloudfunctions.googleapis.com"
            },
            {
                key: 2,
                value: "cloudbuild.googleapis.com"
            }
        ]
    },
    sampleData: {}
}

```
Here, the integer 1 will trigger the cloud function "cloudfunctions.googleapis.com". Similarly, the integer 2 will trigger another cloud function "cloudbuild.googleapis.com"


###  🚻 Use cases

### 🪜 API Overview

### 🔭 Schema Overview

### ℹ Contribution Guidelines

### ❓FAQs

## Contributors

<a href="https://github.com/Samarth-HP/templater/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Samarth-HP/templater" />
</a>
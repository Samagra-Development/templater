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
//text to be added here


###  💻 Core Features

### Transformer

The Transformer is one of the building blocks of Templater API. It helps us in Data transformation. Before inserting data into a template we can run a Transformer, they are of two types:

1. OPTIONS
This transformer replaces the target item with the specified value. These two items are stored in the form of key-value pairs. The key parameter contains the target item while the value paramater consists of new item which will replace the target item. For example:

```js
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

In the above case, Whenever the text “Original Text” is hit, It will be immediately replaced by the contents of the value parameter "This is the new text which will be replaced". Similarly, when the string “Pratik” is found, it will be directly replaced by the string “Sam”.

2. Cloud Functions
For a particular key, this transformer can trigger a specific cloud function. Whenever a value is found that matches the key parameter, this Transformer will invoke a cloud function that is specified in the value parameter For example:

```js
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
Here, the integer 1 will trigger the cloud function "cloudfunctions.googleapis.com". Similarly, the integer 2 will trigger another cloud function "cloudbuild.googleapis.com".

### Lambda API
//text to be added here


###  🚻 Use cases
// content to be added

### 🪜 API Overview
//content to be added

### 🔭 Schema Overview
//content to be added

### ℹ Contribution Guidelines
If you are a new developer looking to contribute something to Templater, please take a look and see if there's anything that you'd like to work on in the [issue tracker](https://github.com/Samarth-HP/templater/issues).

The "Good First Issue" label has been added to any tasks that seem like a good way to get started working with the codebase.

Please let us know that you're working on an open issue and let us assign it to you, this ensures that two people aren't working on the same issue, and ensures that all effort is valuable to the project. If an issue hasn't seen activity in a couple of weeks, feel free to ping the assignee to see if they're working on it, or ask a maintainer to reassign the issue to you.

If you can't work on an issue any more, please post another message to let us know.

If it's unclear exactly what needs to be done, or how to do it, please don't hesitate to ask for clarification or help!

### Intial Setup (one time)

1. Fork the Templater repository.

2. Now let's set up our local repository
```shell
git clone https://github.com/username/templater-docs.git
```
3. Next step is to establish an upstream connection with the base repository
```shell
cd templater
git remote add upstream https://github.com/Samarth-HP/templater.git
```

### Making a new pull request
Now if want to make a new change to the code base, we create a new 'feature branch' based off the latest version of the main branch:
```shell
git checkout master
git pull upstream master
git checkout -b my-feature-branch 
# make your changes to the source code
git push origin HEAD
```
### Dealing with merge conflicts
If changes are made to the Templater repository that conflict with the changes in your pull request in-between creating the feature branch and your changes getting merged into the master repository, it may be necessary to rebase your code:

```shell
git checkout master
git pull upstream master
git checkout my-feature-branch # or just "git checkout -" 
git rebase master
# it may be necessary to resolve merge conflicts here
# if you need to update the existing pull request, you should do a 'force' push
git push origin HEAD -f
```
### Dev Setup
Start the database and gql server - 
```shell 
docker-compose up -d templaterdb gql
```

Migrate -
```shell
prisma migrate dev
```

Generating docs when you are done - 
```shell
npx @compodoc/compodoc -p tsconfig.json -s
```

### ❓FAQs
//content to be added

## Contributors

<a href="https://github.com/Samarth-HP/templater/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Samarth-HP/templater" />
</a>

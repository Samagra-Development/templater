[![](https://img.shields.io/github/forks/Samarth-HP/templater?style=social)](http://makeapullrequest.com)
[![](https://img.shields.io/github/release-date/Samarth-HP/templater)](http://makeapullrequest.com)
[![](https://img.shields.io/github/languages/count/Samarth-HP/templater)](http://makeapullrequest.com)
[![](https://img.shields.io/github/issues/Samarth-HP/templater/good-first)](http://makeapullrequest.com)
[![](https://img.shields.io/github/issues/Samarth-HP/templater)](http://makeapullrequest.com)



## 📃 Templater

Templater is a REST API service that can store, manage and render templates. A Template is like a well-defined format in which data can be entered. The output generated is according to the format defined in the template. Templater helps us simplify and enhance this process by providing multiple services such as Data transformation, Lambda API, User interface, Support for multiple engines, etc. 

### What's a Template?

A Template is a structure or a format which holds some kind of data. Templates can be written in many languages and engines such as Razor view, Handlebars etc. but typically Templates that are written combine HTML with special tags. We can use these Templates for many purposes. For example, we can write a Template to render a list of Employees through a Templating Engine.

```html
<h1> Employees ({{ employees.length }}) </h1>
<ul>
{{ #each students }}
<li>{{ name }} ({joining { year }})</li>
{{ /each }}
</ul>
```
The data inside a Template is written in the form of JSON Strings and Objects. This data is usually retrieved from a backend or the database of the web application. For example,

```json
{  
    "employee": {  
        "name":       "sonoo",   
        "salary":      56000,   
        "year":        2011  
    }  
} 
```
This data is usually retrieved from a backend or the database of the web application. The [Templating Engines](#templating-engines) renders this data as HTML through Templates. Finally, the output generated is according to the format designed in the template. Templating is used to generate documents, reports and data in a certain format.

### Templating Engines

A Templating engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page. These engines allow you to load data dynamically onto your website Front end. When you build a server-side application with a template engine, the template engine replaces the variables in a template file with actual values, and displays this value to the client. This makes it easier to quickly build our application.

Some Popular Examples of Templating Engines include:
- [EJS](https://ejs.co/)
- [Jade](https://jade-lang.com/)
- [Pug](https://pugjs.org/)
- [Mustache](https://mustache.github.io/)
- [HandlebarsJS](https://handlebarsjs.com/)
- [Jinja2](https://jinja.palletsprojects.com/en/2.11.x/templates/) & [Nunjucks](https://mozilla.github.io/nunjucks/)
- [Blade](https://laravel.com/docs/9.x/blade)

## 📖 Table of Contents 

- [Objectives](#🏹-objectives)
- [Architecture](#👷-architecture)
- [Core Features](#💻-core-features)
- [Example use case/(s)](#🚻-use-cases)
- [API Overview](#🪜-api-overview)
- [Schema Overview](#🔭-schema-overview)
- [Contribution guidelines](#ℹ-contribution-guidelines)
- [FAQs](#❓faqs)


##  🏹 Objectives

The objectives of templater are as follows:

- Efficient template management and storage
- Provide CRUD operations on templates with the help of our API
- Allow rendering of the templates. Rendering is the output generated after filling the data. It is a combination of Data + Template. A - person inputs some data to the template, Whatever output is achieved is considered to be part of the rendering procedure

##  👷 Architecture
The Templater Architecture is divide into several components.

>This section is under construction


##  💻 Core Features

### Transformer

The Transformer is one of the building blocks of Templater API. It helps us in Data transformation. Before inserting data into a template we can run a Transformer, they are of two types:

1. OPTIONS:

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
                "key": "Jason",
                "value": "Sam"
            }
        ]
    }
}
```

In the above case, Whenever the text “Original Text” is hit, It will be immediately replaced by the contents of the value parameter "This is the new text which will be replaced". Similarly, when the string “Pratik” is found, it will be directly replaced by the string “Sam”.

2. Cloud Functions:

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
>This section is under construction

### Playground
>This section is under construction

##  🖱️ Use cases
>This section is under construction

## 🪜 API Overview
>This section is under construction

## 🔭 Schema Overview
>This section is under construction

## ℹ Contribution Guidelines
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
```

```shell
git remote add upstream https://github.com/Samarth-HP/templater.git
```

### Making a new pull request
Now if want to make a new change to the code base, we create a new 'feature branch' based off the latest version of the main branch:
```shell
git checkout master
git pull upstream master
git checkout -b my-feature-branch 
# make changes here
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
``` 
docker-compose up -d templaterdb gql
```

Migrate -
```
prisma migrate dev
```

Generating docs when you are done - 
```
npx @compodoc/compodoc -p tsconfig.json -s
```

### Development Environment

Click the button below to start working in a new ready to code development environment

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#<your-project-url>)


## ❓FAQs
>This section is under construction

## Contributors

<a href="https://github.com/Samarth-HP/templater/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Samarth-HP/templater" />
</a>

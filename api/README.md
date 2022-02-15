## Description

Templates as a service.

1. APIs to CRUD Templates
2. Render(substitute) data in a template.

Feel free to use this as a config manager.

## Installation

```bash
$ yarn install
```

## Templating languages supported

1. Javascript Literals + JSON
2. Jinja (Coming Soon)

## Abbreviations

1. JSTL = Javascript Template Literals.

## Running Migrations

1. Update the schema in schema.prisma.
2. Run `prisma migrate dev`

## Transformer Spec

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

## Notes

[Public API Docs for Commenting](https://www.getpostman.com/collections/94450bb012196b6a6d69)

```json
{
  "data": {
    "field1": "f1",
    "field1": "f2"
  },
  "transformers": [
    {
      "path": "data.field1",
      "transformer": "transformer1"
    },
    {
      "path": "data.field2",
      "transformer": "transformer2"
    }
  ],
  "meta": {},
  "body": "Hello World",
  "templateType": "JSTL"
}
```

## Dev Setup

1. Start the database and gql server - `docker-compose up -d templaterdb gql`
2. Migrate -`prisma migrate dev`
3. Generating docs when you are done - `npx @compodoc/compodoc -p tsconfig.json -s`
4. Generating Swagger docs - `

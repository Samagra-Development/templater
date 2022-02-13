## Dev Setup

1. Start the database and gql server - `docker-compose up -d templaterdb gql`
2. Migrate -`prisma migrate dev`
3. Generating docs when you are done - `npx @compodoc/compodoc -p tsconfig.json -s`

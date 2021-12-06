FROM node:14
LABEL maintainer = "Chakshu Gautam"
LABEL maintainer_email = "chakshu@samagragovernance.in"

# Default value; will be overridden by build_args, if passed
ARG node_env=production

ENV NODE_ENV $node_env

# Create app directory
WORKDIR /app

ADD package.json ./
ADD yarn.lock ./

# Install app dependencies
RUN yarn install

ADD . .

EXPOSE 3001
CMD [ "npm", "run", "start:prod" ]
FROM node:19-alpine3.15

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./src/api/package*.json ./

RUN npm install

# Bundle app source
COPY ./src/api/ .

EXPOSE 3008
CMD [ "node", "src/server.js" ]
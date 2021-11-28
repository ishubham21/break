FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# copying all the files in the /usr/src/app directory
COPY . .

EXPOSE 4000
CMD [ "node", "index.js" ]
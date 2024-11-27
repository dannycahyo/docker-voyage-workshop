FROM node:20-alpine

USER node

WORKDIR /home/node/code

# Copy package files and install dependencies
COPY --chown=node:node package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY --chown=node:node . .

CMD ["node", "index.js"]
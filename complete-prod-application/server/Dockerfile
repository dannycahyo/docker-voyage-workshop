# Build stage
FROM node:18 AS builder

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Production stage
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Create non-root user and group
RUN addgroup -S nodeapp && \
    adduser -S -G nodeapp -s /bin/false nodeapp && \
    chown -R nodeapp:nodeapp /usr/src/app

# Copy only necessary files from builder
COPY --from=builder --chown=nodeapp:nodeapp /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=nodeapp:nodeapp /usr/src/app/package*.json ./
COPY --from=builder --chown=nodeapp:nodeapp /usr/src/app/index.js ./

# Switch to non-root user
USER nodeapp

EXPOSE 3000

CMD [ "node", "index.js" ]
FROM node:20 AS node-builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx
COPY --from=node-builder /app/dist /usr/share/nginx/html

# Or if we want to run using bind mount, we can use the following command:
# docker run --mount type=bind,source="$(pwd)"/dist,target=/usr/share/nginx/html -p 8080:80 nginx
# Note: This will run the nginx server with the dist folder mounted to the /usr/share/nginx/html folder in the container.
# So don't forget to run the npm run build command before running the above command.
FROM node:14-alpine AS builder

# set working directory
WORKDIR /usr/src/app

# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package.json ./

# Installs all node packages
RUN npm install 

# Copies everything over to Docker environment
COPY . .
# ENV REACT_APP_BACKEND_MAIN_URL=http://dev.api.kodlnw-product.net/
# RUN npm run build
RUN npm run build

FROM node:14-alpine AS production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/build build

RUN npm install serve

EXPOSE 5000

CMD ["npx", "serve", "build"]
# #pull the official nginx:1.19.0 base image
# FROM nginx:1.21.3-alpine
# #copies React to the container directory
# # Set working directory to nginx resources directory
# WORKDIR /usr/share/nginx/html
# # Remove default nginx static resources
# RUN rm -rf ./*
# # Copies static resources from builder stage
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# # Containers run nginx with global directives and daemon off
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
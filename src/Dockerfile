FROM node:12.16.1-alpine as frontend-build
RUN apk add g++ make python
# create destination directory
RUN mkdir -p /src/nuxt-app
WORKDIR /src/nuxt-app

# copy the app, note .dockerignore
COPY . /src/nuxt-app/
RUN npm install
RUN npm uninstall murmurhash-native
RUN npm i murmurhash-native --build-from-source

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN yarn build --configuration=production

# expose 5000 on container
EXPOSE 5000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=5000

# start the app
CMD [ "npm", "start" ]
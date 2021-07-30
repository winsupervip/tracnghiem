FROM node:15.11.0 as frontend-build

# create destination directory
RUN mkdir -p /src/nuxt-app
WORKDIR /src/nuxt-app

# copy the app, note .dockerignore
COPY ./src/ /src/nuxt-app/
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 5000 on container
EXPOSE 5000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=5000

# start the app
CMD [ "npm", "start" ]
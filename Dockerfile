# -----------------------------------------------------------------
# Dockerfile for building the client
# -----------------------------------------------------------------
#
FROM node:12.18-alpine
#
# -----------------------------------------------------------------
# Default template for running Node.js apps in production mode
# -----------------------------------------------------------------
# ENV NODE_ENV=production
# WORKDIR /usr/src/app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 3000
# CMD ["npm", "start"]
# -----------------------------------------------------------------
#
# -----------------------------------------------------------------
# Run Node.js app in development mode
# -----------------------------------------------------------------
# ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN ls -laR
RUN npm install --silent
COPY . .
RUN npm run build
# RUN ls -la
# RUN ls -laR dist/
CMD ["node", "dist/app.js"]
# -----------------------------------------------------------------
#
# EOF

# -----------------------------------------------------------------
# Dockerfile for building the client
# -----------------------------------------------------------------
#
FROM node:12.18-alpine
# ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
#
# -----------------------------------------------------------------
# Default template for Node.js applications
# -----------------------------------------------------------------
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 3000
# CMD ["npm", "start"]
# -----------------------------------------------------------------
#
# -----------------------------------------------------------------
# Template for static files
# -----------------------------------------------------------------
# RUN ls -laR
RUN npm install --silent
COPY . .
RUN npm run build
# RUN ls -laR public/
CMD ["ls", "-laR", "public/"]
# -----------------------------------------------------------------
#
# EOF
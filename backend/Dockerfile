FROM node:16-alpine

# Set working directory
WORKDIR /usr/src

# Copy package.json, package-lock.json, yarn.lock
COPY package*.json *.lock ./

# Install dependencies
RUN yarn install --ignore-scripts

# Copy start script and grant access to execute
COPY ./start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

CMD [ "/start" ]

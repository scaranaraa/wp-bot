
ARG NODE_VERSION=21.7.1

FROM node:${NODE_VERSION}

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
WORKDIR /usr/src/app

# Install git otherwise everything fails idk why
RUN apt-get install -y git

# Install dependencies
RUN apt-get update && apt-get install -y wget gnupg

# Install Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -y google-chrome-stable --no-install-recommends
ENV CHROME_BIN=google-chrome-stable


RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --pure-lockfile
# Run the application as a non-root user.
USER root

# Copy the rest of the source files into the image.
COPY . .

# Run the application.
CMD npm start

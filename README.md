# blobfishes

![Superlinter](https://github.com/gmacario/blobfishes/actions/workflows/superlinter.yml/badge.svg)

Blobfishes aims to be the ugliest project participating to the [DigitalOcean MongoDB Hackathon](https://www.digitalocean.com/mongodb-hackathon/).  

![blobfish-rounded](https://user-images.githubusercontent.com/44038661/125737644-895ff7c5-f68f-4350-9231-d8ab7b00006c.png)

If you need some inspiration to be ugly, look at this blobfish!


## Deploying blobfishes to DigitalOcean

Please see [this document](./docs/deploy-blobfishes-to-digitalocean.md).


## Running blobfishes in Docker

### Prerequisites

* [Docker](https://www.docker.com/) version 20.10.6 or later
  - Make sure that Docker is configured to be managed as an ordinary (non-root) user.
See <https://docs.docker.com/engine/install/linux-postinstall/> for details.
* [Docker Compose](https://docs.docker.com/compose/) version 1.21.2 or later
* Credentials to connect to an existing [MongoDB](https://www.mongodb.com/) instance
  - For development purposes you may use a one-node instance running on your local Docker engine.

### Create and run the containers

1. Check out the sources from GitHub.

2. Create file `.env` starting from the `.env.example` available in the repository and insert the credentials to connect to your MongoDB instance editing the lines which start with `MONGODB_`:

   ```bash
   cp .env.example .env
   vi .env
   ```

3. Run the following command from a shell to create and run the containers:

   ```bash
   docker-compose up -d
   ```

4. You may check the server logs with the following command (type Ctrl-C to stop):

   ```bash
   docker-compose logs -f
   ```

5. To shut down the server run the following command

   ```bash
   docker-compose down
   ```

### Rebuild the updated version of the Docker images

```bash
docker-compose build --pull --no-cache
```

### Local client development

Prerequisites:

* [Node.js](https://nodejs.org/) version 14.17.3 or later

Run the following command from a shell:

```bash
cd client
npm install
npm run dev
```


## How to submit bugs and/or questions

Please create issues under <https://github.com/aquariophilie/blobfishes/issues>.

For quick communications with the project maintainers use the [Telegram group](https://t.me/joinchat/SKXDx6mokoQ4MmVk).


## Copyright and License

Copyright (c) 2021 [Gianpaolo Macario](https://gmacario.github.io/) and the [Aquariophilie team](https://github.com/aquariophilie).

Blobfishes is released under an Open Source license; see [LICENSE](./LICENSE) file for details.

The "blobfish-rounded" logo is a derivative of ["blobfish-s400x244-2297-580"](https://www.flickr.com/photos/48988481@N00/3219837080) by [jamasca66](https://www.flickr.com/photos/48988481@N00), used under [CC BY-NC 2.0](https://creativecommons.org/licenses/by-nc/2.0/?ref=ccsearch&atype=rich). "blobfish-rounded" is licensed under [CC BY-NC 2.0](https://creativecommons.org/licenses/by-nc/2.0/?ref=ccsearch&atype=rich).

<!-- EOF -->

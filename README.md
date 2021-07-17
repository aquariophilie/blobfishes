# blobfishes

![Superlinter](https://github.com/gmacario/blobfishes/actions/workflows/superlinter.yml/badge.svg)

The ugliest project participating to the [DigitalOcean MongoDB Hackathon](https://www.digitalocean.com/mongodb-hackathon/).  

![blobfish-rounded](https://user-images.githubusercontent.com/44038661/125737644-895ff7c5-f68f-4350-9231-d8ab7b00006c.png)
> This work, "blobfish-rounded" is a derivative of ["blobfish-s400x244-2297-580"](https://www.flickr.com/photos/48988481@N00/3219837080) by [jamasca66](https://www.flickr.com/photos/48988481@N00), used under [CC BY-NC 2.0](https://creativecommons.org/licenses/by-nc/2.0/?ref=ccsearch&atype=rich). "blobfish-rounded" is licensed under [CC BY-NC 2.0](https://creativecommons.org/licenses/by-nc/2.0/?ref=ccsearch&atype=rich).

If you need some inspiration, look at this blobfish!

## Running blobfishes

Prerequisites:

* [Docker](https://www.docker.com/) version 20.10.6 or later
* [Docker Compose](https://docs.docker.com/compose/) version 1.21.2 or later

Run the following command from a shell:

```bash
docker-compose up -d
```

### Rebuilding images from scratch

```bash
docker-compose up --build --force-recreate
```

### Local client development

```bash
cd client
npm install
npm run dev
```

## Communications

Use the [Telegram group](https://t.me/joinchat/SKXDx6mokoQ4MmVk)

## Copyright and License

Please see [LICENSE](./LICENSE)

<!-- EOF -->

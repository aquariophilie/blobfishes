# Deploying blobfishes to DigitalOcean
 
## Table of Contents

* Introduction
* Reference documents
* Step-by-step instructions
  - Create a VM on DigitalOcean with Ubuntu-server 20.04.2 LTS 64-bit
  - Login to the VM via SSH
  - Install Docker and docker-compose
  - Clone blobfishes sources from GitHub
  - Create a MongoDB cluster on DigitalOcean
  - Create file `.env` and fill-in credentials for MongoDB instance
  - Run `docker-compose up -d`
  - Test webapp locally: `curl -v http://localhost:3000/`
  - Open incoming ports on the VM
  - Test webapp remotely using a browser <http://vm_ip_address:3000>
* See also


## Reference documents

* <https://github.com/do-community/mongodb-resources>
* <https://github.com/do-community/node-express-api>
* <https://www.digitalocean.com/products/managed-databases/>
* <https://cloud.digitalocean.com/apps/new?repo=https://github.com/do-community/node-express-api/tree/master>
* [MongoDB.live | July 13-14, 2021](https://www.mongodb.com/live)
  - [Atlas Overview](https://youtu.be/vy8Vylvqohk) - by MongoDB (33:18 YouTube Video)
  - [Jumpstart MongoDB Basics](https://youtu.be/W76yyd791js) - by MongoDB (48:37 YouTube Video)
  - [Atlas video -From SQL to NoSQL, Changing Your Mindset...](https://youtu.be/4TdVcfh1Kk8) - by MongoDB (40:46 YouTube Video)


## Introduction
 
This document explains how to install the blobfishes project on the [DigitalOcean](https://www.digitalocean.com/) cloud.


## Step by step instructions

### Create a VM on DigitalOcean with Ubuntu-server 20.04.2 LTS 64-bit

TODO

### Login to the VM via SSH

TODO

### Install Docker and docker-compose

TODO

### Clone blobfishes sources from GitHub

TODO

### Spin a MongoDB cluster on DigitalOcean

Browse <https://cloud.digitalocean.com/databases/new?engine=mongodb>

TODO

### Create file `.env` and fill-in credentials for MongoDB instance

TODO

### Run `docker-compose up -d`

TODO

### Test webapp locally: `curl -v http://localhost:3000/`

TODO

### Open incoming ports on the VM

TODO

### Test webapp remotely using a browser <http://vm_ip_address:3000>

TODO


## See also

TODO
 
 <!-- EOF -->

# Deploying blobfishes to DigitalOcean
 
## Table of Contents

* Introduction
* Reference documents
* Prerequisites
* Deploy blobfishes to DigitalOcean using Droplets
  - Create a project on DigitalOcean
  - Spin a MongoDB cluster on DigitalOcean
  - Create a Droplet on DigitalOcean
  - Login to the VM via SSH
  - Install Docker and `docker-compose`
  - Clone blobfishes sources from GitHub
  - Create file `.env` with connection info to the MongoDB instance
  - Bring up blobfish webapp using `docker-compose`
  - Test blobfish webapp locally
  - Open incoming ports on the VM
  - Test webapp remotely using a browser <http://vm_ip_address:3000>
* Deploy blobfishes to DigitalOcean inside an App
* See also


## Introduction
 
This document explains how to perform a deployment of the blobfishes project to the [DigitalOcean](https://www.digitalocean.com/) cloud.


## Reference documents

* [DigitalOcean Home Page](https://docs.digitalocean.com/)
  - [DigitalOcean Managed Databases](https://www.digitalocean.com/products/managed-databases/)
* [DigitalOcean Documentation](https://docs.digitalocean.com/)
  - [Managed Databases](https://docs.digitalocean.com/products/databases/) - DigitalOcean Documentation
  - [MongoDB](https://docs.digitalocean.com/products/databases/mongodb/) - DigitalOcean Documentation
* [MongoDB.live | July 13-14, 2021](https://www.mongodb.com/live)
  - [MongoDB.live 2021 On-Demand Sessionso](https://www.youtube.com/playlist?list=PL4RCxklHWZ9ubJ-RLYZ5GFnu23ccml_Cq) (83 videos)
  - [MongoDB.live Playlist Instructions](https://youtu.be/p5kcUrhl8Kc) - by MongoDB (3:00 YouTube Video)
  - [Atlas Overview](https://youtu.be/vy8Vylvqohk) - by MongoDB (33:18 YouTube Video)
  - [Jumpstart MongoDB Basics](https://youtu.be/W76yyd791js) - by MongoDB (48:37 YouTube Video)
  - [Atlas video -From SQL to NoSQL, Changing Your Mindset...](https://youtu.be/4TdVcfh1Kk8) - by MongoDB (40:46 YouTube Video)
* <https://github.com/do-community/mongodb-resources>
* <https://github.com/do-community/node-express-api>
  - [Deploy to DigitalOcean](https://cloud.digitalocean.com/apps/new?repo=https://github.com/do-community/node-express-api/tree/master)


## Prerequisites

* A valid login to [DigitalOcean cloud](https://cloud.digitalocean.com/)
* Access to blobfishes sources on GitHub

## Deploy blobfishes to DigitalOcean using Droplets

> Droplets? Are we spreading COVID-19 disease again???

**Don't Panic!** Here we refer to [DigitalOcean Droplets](https://www.digitalocean.com/products/droplets/)!

In DigitalOcean cloud, a Droplet can be seen as the rough equivalent of an EC2 (Elastic Compute Cloud) instance in [AWS](https://aws.amazon.com/), or of a VM (Virtual Machine) in [Microsoft Azure](https://azure.microsoft.com/) and [Google Cloud Platform](https://cloud.google.com/).

### Create a project on DigitalOcean

Sign in to <https://cloud.digitalocean.com/> to access the DigitalOcean console.

<!-- TODO: Screenshot -->

Expand section "PROJECTS", then click "New Project".

> **Create new project**
>
> * Name your project:
>   - `blobfishes`
> * Add a description:<br>
>   Helpful for teams or differentiating between projects with similar names.
>   - `The ugliest project participating to the DigitalOcean MongoDB Hackathon`
> * Tell us what it's for:<br>
>   This will help us to provide a more relevant experience.
>   - `Class project / Educational purposes`

Then click "Create Proejct".

> **Move resources into blobfishes**
>
> Move existing Droplets, Spaces, load balancers, domains or floating IPs into your new project.

Click "Skip for now".

> Remind me later
>
> **Managed MongoDB is now generally available**
>
> Hassle-free MongoDB for modern apps.
> We handle all the management chores, so you can focus on your apps.
>
> * [Try it out](https://cloud.digitalocean.com/databases/new)
> * [Product documentation](https://docs.digitalocean.com/products/databases/mongodb/)

Click "Remind me later".

### Spin a MongoDB cluster on DigitalOcean

Logged into the DigitalOcean console, expand section "MANAGE", then click "Databases".

Click "Create a Database Cluster".

<!-- Browse <https://cloud.digitalocean.com/databases/new?engine=mongodb> -->

> **Create a Database Cluster**
>
> **Choose a database engine**
>
> A database cluster runs a single database engine that powers
> one or more individual databases.
>
> * MongoDB | 4.4
> * PostgreSQL | Select version <!-- 13 | 12 | 11 |10 -->
> * MySQL | 8
> * Redis | 6
>
> **Choose a cluster configuration**
>
> You will be able to add, remove, or resize nodes at any time
> after the cluster is created.
>
> * **MACHINE TYPE**
>   - Basic nodes<br>
>     Variable ratio of memory per shared CPU
> * **NODE PLAN**
>   - $15/mo<br>
>     1 GB RAM / 1 vCPU / 15 GB Disk
> * **STANDBY NODES** (OPTIONAL)
>   - $0/mo<br>
>     No standby node 
>
> MONTHLY COST: $15 | $0.022/hr
>
> **Choose a datacenter**
>
> **Tip:** Generally, choose the datacenter where your application Droplets are located.
> If the database cluster is located in a different datacenter,
> added latency may slow performance.
>
> * New York: <!-- 1 | 2 | --> 3
> * San Francisco: This region is unavailable <!-- 1 | 2 | 3 -->
> * Amsterdam: <!-- 2 | --> 3
> * Singapore: This region will be available soon.
> * London: This region will be available soon.
> * Frankfurt: 1
> * Toronto: This region will be available soon.
> * Bangalore: This region will be available soon.
>
> **VPC Network**
>
> default-nyc3 DEFAULT
>
> All resources created in this datacenter will be members of the same VPC network.
> They can communicate securely over their Private IP addresses.
> [What does this mean?](https://docs.digitalocean.com/products/networking/vpc/)
>
> **Finalize and create**
>
> * Choose a unique database cluster name<br>
>   Enter database cluster name
>   - `db-mongodb-nyc3-33198`
>
> * Select project<br>
>   Select an existing project for this database cluster to belong to.
>   - `blobfishes`
>
> [Add Tags]()
>
> [Create a Database Cluster]()

Fill in the requested information

* Database engine: MongoDB 4.4
* Cluster configuration
  - Machine Type: Basic nodes
  - Node Plan: $15/mo (1 GB RAM / 1 vCPU / 15 GB Disk)
  - Standby Nodes (optional): $0/mo (No standby node)
* Choose a datacenter: Frankfurt 1
* VPC Network: `default-fra1` (DEFAULT)
* Finalize and create
  - Choose a unique database cluster name: `db-mongodb-fra1-32806`
  - Select project: `blobfishes`

Then click "Create a Database Cluster".

<!-- 2021-07-18 23:04 CEST -->

> Your database has been created

<!-- TODO: Add screenshot -->

TODO

### Create a Droplet on DigitalOcean

TODO

* Ubuntu-server 20.04.2 LTS 64-bit

### Login to the VM via SSH

TODO

### Install Docker and `docker-compose`

TODO

### Clone blobfishes sources from GitHub

TODO

### Create file `.env` with connection info to the MongoDB instance

```bash
cp .env.example .env
vi .env
```

Edit the `MONGODB_xxx` variables - example:

```text
MONGODB_NAME=TODO
MONGODB_PASS=dbpass
MONGODB_URI=TODO
MONGODB_USER=dbuser
```

TODO

### Bring up blobfish webapp using `docker-compose`

TODO

```bash
docker-compose up -d
```

Result:

```text
TODO
```

### Test blobfish webapp locally

TODO

```bash
curl -v http://localhost:3000/
```

Result:

```text
TODO
```

### Open incoming ports on the VM

TODO

### Test webapp remotely using a browser <http://vm_ip_address:3000>

TODO


## Deploy blobfishes to DigitalOcean inside an App

TODO


## See also

TODO
 
 <!-- EOF -->

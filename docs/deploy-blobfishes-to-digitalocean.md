# Deploying blobfishes to DigitalOcean
 
## Table of Contents

* Introduction
* Reference documents
* Deploy blobfishes as a DigitalOcean Droplet
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
* Deploy blobfishes as a DigitalOcean App
* See also


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
  - [Deploy on DigitalOcean](https://cloud.digitalocean.com/apps/new?repo=https://github.com/do-community/node-express-api/tree/master)


## Introduction
 
This document explains how to install the blobfishes project on the [DigitalOcean](https://www.digitalocean.com/) cloud.


## Deploy blobfishes as a DigitalOcean Droplet


### Log in to DigitalOcean

Log in to <https://cloud.digitalocean.com/>

### Create a project on DigitalOcean

Logged into the DigitalOcean console, expand section "PROJECTS", then click "New Project"

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

### Create a MongoDB instance on DigitalOcean

Logged into the DO console, click on "New Managed Database"


### Spin a MongoDB cluster on DigitalOcean

Logged into the DigitalOcean console, expand section "MANAGE", then click "Databases"

Click "Create a Database Cluster"

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
  - Choose a unique database cluser name: `db-mongodb-fra1-32806`
  - Select project: `blobfishes`

Then click "Create a Database Cluster".

<!-- 2021-07-18 23:04 CEST -->

> Your database has been created

TODO


### Create a VM on DigitalOcean with Ubuntu-server 20.04.2 LTS 64-bit

TODO

### Login to the VM via SSH

TODO

### Install Docker and docker-compose

TODO

### Clone blobfishes sources from GitHub

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


## Deploy blobfishes as a DigitalOcean App

TODO


## See also

TODO
 
 <!-- EOF -->

# Deploying blobfishes to DigitalOcean
 
## Table of Contents

* Introduction
* Reference documents
* Prerequisites
* Deploy blobfishes to DigitalOcean in a Droplet
  - Create a new Project on DigitalOcean
  - Spin a MongoDB cluster
  - Create a Droplet
  - Login via SSH and update OS
  - (Optional) Register a DNS A record
  - Install Docker
  - Install Docker Compose
  - Check out blobfishes sources
  - Create and customize the `.env` file
  - Bring up the blobfish webapp
  - Test blobfish webapp locally
  - Open incoming ports on the VM
  - Test webapp remotely using a browser
<!-- * Deploy blobfishes to DigitalOcean inside an App -->
* See also


## Introduction
 
This document explains how to perform a deployment of the blobfishes project to the [DigitalOcean](https://www.digitalocean.com/) cloud.


## Reference documents

* [DigitalOcean Home Page](https://docs.digitalocean.com/)
  - [DigitalOcean Managed Databases](https://www.digitalocean.com/products/managed-databases/)
* [DigitalOcean Documentation](https://docs.digitalocean.com/)
  - [Managed Databases](https://docs.digitalocean.com/products/databases/) - DigitalOcean Documentation
  - [MongoDB](https://docs.digitalocean.com/products/databases/mongodb/) - DigitalOcean Documentation
* [The DigitalOcean Community](https://www.digitalocean.com/community)
  - [Making a Node + MongoDB App on DigitalOcean | DigitalOcean](https://www.digitalocean.com/community/tech_talks/making-a-node-mongodb-app-on-digitalocean)
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

## Deploy blobfishes to DigitalOcean in a Droplet

> Droplets? Are we spreading COVID-19 disease again???

**Don't Panic!** Here we refer to [DigitalOcean Droplets](https://www.digitalocean.com/products/droplets/)!

In DigitalOcean cloud, a Droplet can be seen as the rough equivalent of an EC2 (Elastic Compute Cloud) instance in [AWS](https://aws.amazon.com/), or of a VM (Virtual Machine) in [Microsoft Azure](https://azure.microsoft.com/) and [Google Cloud Platform](https://cloud.google.com/).

### Create a new Project on DigitalOcean

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

### Spin a MongoDB cluster

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


### Create a Droplet

<!-- 2021-07-20 02:01 CEST -->

Logged into the DigitalOcean console, expand section "PROJECTS", then click on "blobfishes".

Click "Get Started with a Droplet".

> **Create Droplets**
>
> **Choose an image**
>
> * Distributions
> * Container distributions
> * Marketplace
> * Custom images
>
> **Choose a plan**
>
> * SHARED CPU
>   - Basic
> * DEDICATED CPU
>   - General Purpose
>   - CPU-Optimized
>   - Memory-Optimized
>   - Storage-Optimized (NEW)
>
> CPU options:
> - [x] Regular Intel with SSD
> - [ ] Premium Intel with NVMe SSD (NEW)
>
> * $5/mo ($0.007/hour)
>   - 1 GB / 1 CPU
>   - 25 GB SSD Disk
>   - 1000 GB transfer
> * $10/mo ($0.015/hour)
>   - 2 GB / 1 CPU
>   - 50 GB SSD Disk
>   - 2 TB transfer
> * $15/mo ($0.022/hour)
>   - 2 GB / 2 CPUs
>   - 60 GB SSD Disk
>   - 3 TB transfer
>
> Our Basic Droplet plans, formerly called Standard Droplet plans, range from 1 GB of RAM to 16 GB of RAM. General Purpose Droplets have more overall resources and are best for production environment, and Memory-Optimized Droplets have more RAM and disk options for RAM intensive applications.
>
> Each Droplet plan includes free outbound data transfer which is shared between all Droplets each billing cycle. Inbound bandwidth to Droplets is always free. Learn more or try our price calculator.
>
> **Add block storage**
>
> * [Add Volume]()
>
> **Choose a datacenter region**
>
> * New York
> * San Francisco
> * Amsterdam
> * Singapore
> * London
> * Frankfurt
> * Toronto
> * Bangalore
>
> **VPC Network**
>
> * `default-nyc1` (DEFAULT)
>
> **Select additional options**
>
> - [ ] IPv6
> - [ ] User data
> - [ ] Monitoring
>
> **Authentication**
>
> * SSH keys<br>
>   A more secure authentication method
>
> * Password<br>
>   Create a root password to access Droplet (less secure)
>
> **Finalize and create**
>
> * How many Droplets?<br>
>   Deploy multiple Droplets with the same configuration.
>
> * Choose a hostname<br>
>   Give your Droplets an identifying name you will remember them by.
>   Your Droplet name can only contain alphanumeric characters, dashes, and periods.
>
> **Add tags**
>
> Use tags to organize and relate resources.
> Tags may contain letters, numbers, colons, dashes, and underscores.
>
> **Select Project**
>
> Assign Droplets to a project
>
> **Add backups**
>
> * [ ] Enable backups
>   $1.00/mo (per Droplet)
>   20% of the Droplet price
>   A system-level backup is taken once a week, and each backup is retained for 4 weeks.

Fill in the requested information

* Choose the following image
  * Distributions: Ubuntu 20.04 (LTS) x64

* Choose the following plan
  * SHARED CPU: Basic
  * CPU options: Regular Intel with SSD
  * Plan: $5/mo ($0.007/hour)

* Add block storage: no

* Choose a datacenter region: Frankfurt 1

* VPC Network: `default-fra1` (DEFAULT)

* Select additional options: (none)

* Authentication: SSH keys

  - Choose your SSH keys
  - If you have never provided any SSH keys to Digital Ocean,
    click "New SSH Key"

    > **Add public SSH key**
    >
    > Copy your public SSH key and paste it in the space below.
    > For instructions on how, follow the steps on the right.
    >
    > - SSH key content: `___`
    > - Name: `___`

    paste your public SSH key and a meaningful name, then click "Add SSH Key"

* Finalize and create
  - How many Droplets? 1
  - Choose a hostname: `ubuntu-s-1vcpu-1gb-fra1-01` (accept proposed value)

* Add tags: `blobfishes`, `ubuntu`

* Select Project: `blobfishes`

* Add backups: (no)

then click "Create Droplet"

As soon as the Droplet is created you should find its name with a green icon and its public IP address.

<!-- TODO: Add screenshot -->


### Login via SSH and update OS

<!-- 2021-07-20 02:09 CEST -->

Log in to the VM instance via SSH

```bash
ssh -i <ssh_identity_file> root@<vm_public_ip>
```

Result:

```text
gmacario@gmpowerhorse:~ $ ssh -i ~/.ssh/gmacario-gmail-com root@64.225.96.211
The authenticity of host '64.225.96.211 (64.225.96.211)' can't be established.
ECDSA key fingerprint is SHA256:g7NvixKU7nMFTGK5KErXncP99tb8K/jeT4w1Q4NNqRs.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '64.225.96.211' (ECDSA) to the list of known hosts.
Enter passphrase for key '/home/gmacario/.ssh/gmacario-gmail-com': 
Welcome to Ubuntu 20.04.2 LTS (GNU/Linux 5.4.0-73-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Tue Jul 20 00:14:34 UTC 2021

  System load:  0.01              Users logged in:       0
  Usage of /:   5.8% of 24.06GB   IPv4 address for eth0: 64.225.96.211
  Memory usage: 18%               IPv4 address for eth0: 10.19.0.5
  Swap usage:   0%                IPv4 address for eth1: 10.114.0.4
  Processes:    102

16 updates can be applied immediately.
5 of these updates are standard security updates.
To see these additional updates run: apt list --upgradable


The list of available updates is more than a week old.
To check for new updates run: sudo apt update


The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

root@ubuntu-s-1vcpu-1gb-fra1-01:~#
```

Update the OS and reboot if requested

```bash
sudo apt update && sudo apt -y dist-upgrade && sudo apt -y autoremove --purge
sudo reboot
```

### (Optional) Register a DNS A record

<!-- 2021-07-20 21:44 CEST -->

If you have edit permissions on some DNS zones you may register an A record for the public IP address of the Droplet which you have just created.

Example: "blobfishes.aquariophilie.fun" --> 64.225.96.211

Notice that the DNS zone propagation may take a few minutes.

Test that DNS update was successful

```bash
ping blobfishes.aquariophilie.fun
```

Result:

```text
gmacario@gmpowerhorse:~ $ ping blobfishes.aquariophilie.fun
PING blobfishes.aquariophilie.fun (64.225.96.211) 56(84) bytes of data.
64 bytes from 64.225.96.211 (64.225.96.211): icmp_seq=1 ttl=49 time=25.3 ms
64 bytes from 64.225.96.211 (64.225.96.211): icmp_seq=2 ttl=49 time=24.0 ms
64 bytes from 64.225.96.211 (64.225.96.211): icmp_seq=3 ttl=49 time=24.5 ms
^C
--- blobfishes.aquariophilie.fun ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 24.021/24.590/25.282/0.522 ms
gmacario@gmpowerhorse:~ $
```

Login to the VM via SSH to perform the next steps

```bash
ssh -i <ssh_identity_file> root@blobfishes.aquariophilie.fun
```

Result:

```text
gmacario@gmpowerhorse:~ $ ssh -i ~/.ssh/gmacario-gmail-com root@blobfish.aquariophilie.fun
Welcome to Ubuntu 20.04.2 LTS (GNU/Linux 5.4.0-77-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Tue Jul 20 20:02:58 UTC 2021

  System load:  0.0               Users logged in:       0
  Usage of /:   7.5% of 24.06GB   IPv4 address for eth0: 64.225.96.211
  Memory usage: 17%               IPv4 address for eth0: 10.19.0.5
  Swap usage:   0%                IPv4 address for eth1: 10.114.0.4
  Processes:    109

0 updates can be applied immediately.


Last login: Tue Jul 20 20:02:12 2021 from 93.43.242.87
root@ubuntu-s-1vcpu-1gb-fra1-01:~#
```


### Install Docker

Follow the instructions at <https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04>

Prerequisites: Logged in on the VM

<!-- 2021-07-20 22:00 CEST -->

```bash
ssh -i <ssh_identity_file> root@blobfishes.aquariophilie.fun
```

Update packages and install Docker

```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
apt-cache policy docker-ce
```

Result:

```text
docker-ce:
  Installed: (none)
  Candidate: 5:20.10.7~3-0~ubuntu-focal
  Version table:
     5:20.10.7~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.6~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.5~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.4~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.3~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.2~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.1~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:20.10.0~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:19.03.15~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:19.03.14~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:19.03.13~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:19.03.12~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:19.03.11~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:19.03.10~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
     5:19.03.9~3-0~ubuntu-focal 500
        500 https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
root@ubuntu-s-1vcpu-1gb-fra1-01:~#
```

Finally, install Docker:

```bash
sudo apt install docker-ce
```

Docker should now be installed, the daemon started, and the process enabled to start on boot. Check that it’s running:

```bash
sudo systemctl status docker
```
 
The output should be similar to the following, showing that the service is active and running:

```
root@ubuntu-s-1vcpu-1gb-fra1-01:~# sudo systemctl status docker
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2021-07-20 20:12:51 UTC; 15min ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 2914 (dockerd)
      Tasks: 8
     Memory: 41.8M
     CGroup: /system.slice/docker.service
             └─2914 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock

Jul 20 20:12:50 ubuntu-s-1vcpu-1gb-fra1-01 dockerd[2914]: time="2021-07-20T20:12:50.841032999Z" level=warning msg="Your kernel does not support CPU realtime scheduler"
Jul 20 20:12:50 ubuntu-s-1vcpu-1gb-fra1-01 dockerd[2914]: time="2021-07-20T20:12:50.841357547Z" level=warning msg="Your kernel does not support cgroup blkio weight"
Jul 20 20:12:50 ubuntu-s-1vcpu-1gb-fra1-01 dockerd[2914]: time="2021-07-20T20:12:50.841554439Z" level=warning msg="Your kernel does not support cgroup blkio weight_device"
Jul 20 20:12:50 ubuntu-s-1vcpu-1gb-fra1-01 dockerd[2914]: time="2021-07-20T20:12:50.842164586Z" level=info msg="Loading containers: start."
Jul 20 20:12:51 ubuntu-s-1vcpu-1gb-fra1-01 dockerd[2914]: time="2021-07-20T20:12:51.034045414Z" level=info msg="Default bridge (docker0) is assigned with an IP address 172.17.0.0/16. Daemon option --bip c>
Jul 20 20:12:51 ubuntu-s-1vcpu-1gb-fra1-01 dockerd[2914]: time="2021-07-20T20:12:51.146664996Z" level=info msg="Loading containers: done."
Jul 20 20:12:51 ubuntu-s-1vcpu-1gb-fra1-01 dockerd[2914]: time="2021-07-20T20:12:51.233915455Z" level=info msg="Docker daemon" commit=b0f5bc3 graphdriver(s)=overlay2 version=20.10.7
Jul 20 20:12:51 ubuntu-s-1vcpu-1gb-fra1-01 dockerd[2914]: time="2021-07-20T20:12:51.234615393Z" level=info msg="Daemon has completed initialization"
Jul 20 20:12:51 ubuntu-s-1vcpu-1gb-fra1-01 systemd[1]: Started Docker Application Container Engine.
Jul 20 20:12:51 ubuntu-s-1vcpu-1gb-fra1-01 dockerd[2914]: time="2021-07-20T20:12:51.350939489Z" level=info msg="API listen on /run/docker.sock"
lines 1-21/21 (END)
```

Test:

```bash
docker version
```

Result:

```text
root@ubuntu-s-1vcpu-1gb-fra1-01:~# docker version
Client: Docker Engine - Community
 Version:           20.10.7
 API version:       1.41
 Go version:        go1.13.15
 Git commit:        f0df350
 Built:             Wed Jun  2 11:56:38 2021
 OS/Arch:           linux/amd64
 Context:           default
 Experimental:      true

Server: Docker Engine - Community
 Engine:
  Version:          20.10.7
  API version:      1.41 (minimum version 1.12)
  Go version:       go1.13.15
  Git commit:       b0f5bc3
  Built:            Wed Jun  2 11:54:50 2021
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.4.8
  GitCommit:        7eba5930496d9bbe375fdf71603e610ad737d2b2
 runc:
  Version:          1.0.0
  GitCommit:        v1.0.0-0-g84113ee
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
root@ubuntu-s-1vcpu-1gb-fra1-01:~#
```

### Install Docker Compose 

Follow the instructions at <https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04>

Prerequisites: Docker already installed on your VM

Logged in on the VM, install Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

Verify that the installation was successful

```bash
docker-compose --version
```

Result

```text
root@ubuntu-s-1vcpu-1gb-fra1-01:~# docker-compose --version
docker-compose version 1.27.4, build 40524192
root@ubuntu-s-1vcpu-1gb-fra1-01:~#
```


### Check out blobfishes sources

Check out the blobfishes sources from GitHub:

```bash
mkdir -p ~/github/aquariophilie
cd ~/github/aquariophilie
git clone https://github.com/aquariophilie/blobfishes
```

Result

```text
root@ubuntu-s-1vcpu-1gb-fra1-01:~# mkdir -p ~/github/aquariophilie
root@ubuntu-s-1vcpu-1gb-fra1-01:~# cd ~/github/aquariophilie
root@ubuntu-s-1vcpu-1gb-fra1-01:~/github/aquariophilie# git clone https://github.com/aquariophilie/blobfishes
Cloning into 'blobfishes'...
remote: Enumerating objects: 593, done.
remote: Counting objects: 100% (593/593), done.
remote: Compressing objects: 100% (441/441), done.
remote: Total 593 (delta 272), reused 376 (delta 122), pack-reused 0
Receiving objects: 100% (593/593), 277.73 KiB | 16.34 MiB/s, done.
Resolving deltas: 100% (272/272), done.
root@ubuntu-s-1vcpu-1gb-fra1-01:~/github/aquariophilie#
```


### Create and customize the `.env` file

<!-- 2021-07-20 22:35 CEST -->

Create the `.env` file starting from `.env.example`:

```bash
cd ~/github/aquariophilie/blobfishes
cp .env.example .env
vi .env
```

Edit the `MONGODB_xxx` variables with the information for connecting to the MongoDB instance - example:

```text
MONGODB_NAME=blobfishes
MONGODB_PASS=dbpass
MONGODB_URI=TODO
MONGODB_USER=dbuser
```


### Bring up the blobfish webapp

<!-- 2021-07-20 22:35 CEST -->

Bring up the blobfish webapp using `docker-compose up`

```bash
cd ~/github/aquariophilie/blobfishes
docker-compose up -d
```

Result:

```text
root@ubuntu-s-1vcpu-1gb-fra1-01:~# cd ~/github/aquariophilie/blobfishes
root@ubuntu-s-1vcpu-1gb-fra1-01:~/github/aquariophilie/blobfishes# docker-compose up -d
Creating network "blobfishes_default" with the default driver
Building static-pages
Step 1/7 : FROM node:14.17.3-alpine
14.17.3-alpine: Pulling from librar
...
Successfully built 469fe99d09b2
Successfully tagged blobfishes_server:latest
WARNING: Image for service server was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.
Creating blobfishes_static-pages_1 ... done
Creating blobfishes_server_1       ... done
root@ubuntu-s-1vcpu-1gb-fra1-01:~/github/aquariophilie/blobfishes#
```

Verify that the services are up and running

```bash
docker-compose ps
```

Result:

```
root@ubuntu-s-1vcpu-1gb-fra1-01:~/github/aquariophilie/blobfishes# docker-compose ps
          Name                         Command               State                     Ports                  
--------------------------------------------------------------------------------------------------------------
blobfishes_server_1         docker-entrypoint.sh node  ...   Up       0.0.0.0:3000->3000/tcp,:::3000->3000/tcp
blobfishes_static-pages_1   docker-entrypoint.sh ls -l ...   Exit 0                                           
root@ubuntu-s-1vcpu-1gb-fra1-01:~/github/aquariophilie/blobfishes#
```

You can use "docker-compose logs ..." for troubleshooting services startup errors

```bash
docker-compose logs
```


### Test blobfish webapp locally

<!-- 2021-07-20 22:59 CEST -->

```bash
curl -v http://localhost:3000/
```

Result:

```text
root@ubuntu-s-1vcpu-1gb-fra1-01:~# curl -v http://localhost:3000/
*   Trying 127.0.0.1:3000...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET / HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.68.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 404 Not Found
< Vary: Origin
< Content-Type: text/plain; charset=utf-8
< Content-Length: 9
< Date: Tue, 20 Jul 2021 21:00:08 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host localhost left intact
root@ubuntu-s-1vcpu-1gb-fra1-01:~#
```

### Open incoming ports on the VM

**NOTE**: This step is not necessary with DigitalOcean.


### Test webapp remotely using a browser

<!-- 2021-07-20 23:15 CEST -->

Open <http://blobfishes.aquariophilie.fun:3000/> from your favourite browser.

<!-- TODO: Add screenshot -->

<!-- 
## Deploy blobfishes to DigitalOcean inside an App

TODO
-->


## See also

* <https://github.com/aquariophilie/blobfishes>
 
 <!-- EOF -->

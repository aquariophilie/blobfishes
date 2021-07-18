 # Deploying blobfishes to DigitalOcean
 
 TODO
 
 Steps:

- [ ] Create a VM on DigitalOcean with Ubuntu-server 20.04.2 LTS 64-bit
- [ ] Login to the VM via SSH
- [ ] Install Docker and docker-compose
- [ ] Clone blobfishes sources from GitHub
- [ ] Create a MongoDB cluster on DigitalOcean (#42)
- [ ] Create file `.env` and fill-in credentials for MongoDB instance
- [ ] Run `docker-compose up -d`
- [ ] Test webapp locally: `curl -v http://localhost:3000/`
- [ ] Open incoming ports on the VM
- [ ] Test webapp remotely using a browser <http://vm_ip_address:3000>

Document all the steps in a document under docs/
 
 <!-- EOF -->

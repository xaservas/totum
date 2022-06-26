# How to install api

## Install on vps or local without docker
```bash
git clone git@github.com:O-clock-Blob/projet-13-Totum.git
cd projet-13-Totum/api
npm install
npm start (or use pm2 to start project)
```

- It's necessary to install postgresql server and create a database name "totum"
- Use sqitch to deploy database tables
- If you not use sqitch, run: ```psql -U postgres -d totum -f ./migrations/deploy/create_database.sql```
- A .env_example file is created in the root of the project, you can edit it to your needs

## Install with docker
```bash
git clone git@github.com:O-clock-Blob/projet-13-Totum.git
cd projet-13-Totum/api
docker-compose up -d
```

- Postgresql server is started in the background
- A .env_example file is created in the root of the project, you can edit it to your needs


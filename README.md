### To run database docker image

```docker
docker pull postgres
docker run --name my-postgres -e POSTGRES_PASSWORD=1234 -e POSTGRES_DB=tasks-management -p 5432:5432 -d postgres
```

### To install typeorm

```
npm i @nestjs/typeorm typeorm pg
```


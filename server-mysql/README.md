# MySQL 环境

- 创建 MySQL 容器

```shell
docker run -d -p 3306:3306 --name bga-mysql -e MYSQL_ROOT_PASSWORD=111111 -e MYSQL_DATABASE=bga-mysql mysql:5.7.34 --character-set-server=utf8 --collation-server=utf8_general_ci --lower-case-table-names=1
```

- 创建用户表

```sql
drop table if exists user;
create table if not exists user
(
    id       varchar(32) not null primary key,
    username varchar(30) not null unique,
    email    varchar(30) not null unique,
    password varchar(32) not null
);
```

- 插入两条用户测试数据

```sql
insert into user (`id`, `username`, `email`, `password`)
values (replace(uuid(), '-', ''), 'zhangsan', 'zhangsan@bga.com', md5('111111'));
insert into user (`id`, `username`, `email`, `password`)
values (replace(uuid(), '-', ''), 'lisi', 'lisi@bga.com', md5('111111'));
```

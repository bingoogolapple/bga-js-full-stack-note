# 创建用户表
drop table if exists user;
create table if not exists user
(
    id       varchar(32) not null primary key,
    username varchar(30) not null unique,
    email    varchar(30) not null unique,
    password varchar(32) not null
);
# 插入两条用户测试数据
insert into user (`id`, `username`, `email`, `password`)
values (replace(uuid(), '-', ''), 'zhangsan', 'zhangsan@bga.com', md5('111111'));
insert into user (`id`, `username`, `email`, `password`)
values (replace(uuid(), '-', ''), 'lisi', 'lisi@bga.com', md5('111111'));
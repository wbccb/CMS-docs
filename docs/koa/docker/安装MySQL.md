# Docker安装MySQL

## 拉取镜像

### 查看可用版本

```shell
docker search mysql
```

### 拉取最新版本

```shell
docker pull mysql:latest
```

### 拉取指定版本

```shell
docker pull mysql:8.0.18
```

## 查看本地镜像

```shell
docker images
```

## 创建容器

```shell
docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```

参数说明：
- `mysql-test`: 数据库的名称
- `-p 3306:3306`: 映射容器的`3306端口`到宿主（也就是你自己的电脑）的`3306端口`
- `MYSQL_ROOT_PASSWORD=123456`: 设置`MySQL`服务`root用户`的密码


## 查看容器是否安装成功

```shell
docker ps
```

**注意**: 镜像->容器->数据库->数据库表是不同的东西，你创建一个容器只能代表一个环境下的一个mysql容器，你还得通过这个容器创建对应的数据库，而每一个数据库可以有多张数据库表，每一个数据库表是一种实体，可以有多行数据

## 整体流程演示

在使用工具查看数据库表时，记得在docker中运行数据库

```shell
# docker 中下载 mysql
docker pull mysql

# 运行容器，mysql-test是容器名
docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql

# 进入容器
docker exec -it mysql-test bash

# 登录mysql
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';

# 查看目前所有数据库
show databases;

# 创建数据库
create database db_test;

# 进入数据库
use databaseName;

# 创建数据库表
CREATE TABLE users(
    id int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
    name varchar(100) DEFAULT NULL,
    PRIMARY KEY (id) USING BTREE
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8
ROW_FORMAT=DYNAMIC;

# 展示数据库表
show tables;


# 创建用户
CREATE USER 'wbc'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
# 给用户设置权限
GRANT ALL PRIVILEGES ON *.* TO 'wbc'@'%';


# 退出mysql
exit;

# 退出mysql后退出容器
exit;

# 关闭容器
docker stop mysql-test;
```



# 参考
1. https://www.runoob.com/docker/docker-install-mysql.html






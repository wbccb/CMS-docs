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

## 运行容器

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


## 整体流程概述

```shell
# docker 中下载 mysql
docker pull mysql

# 运行容器
docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql

# 进入容器
docker exec -it mysql bash

# 登录mysql
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';

# 创建用户
CREATE USER 'wbc'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
# 给用户设置权限
GRANT ALL PRIVILEGES ON *.* TO 'wbc'@'%';
```



# 参考
1. https://www.runoob.com/docker/docker-install-mysql.html






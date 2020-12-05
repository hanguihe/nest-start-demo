# 创建数据库
CREATE DATABASE `nest_demo` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

# 创建用户表
CREATE TABLE `user` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(15) NOT NULL,
    `password` varchar(30) NOT NULL,
    `phone` varchar(18) NOT NULL,
    `email` varchar(30) NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB

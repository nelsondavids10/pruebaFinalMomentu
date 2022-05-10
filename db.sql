CREATE DATABASE `prueba_momentu_nodejs` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `prueba_momentu_nodejs`;

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idorder` int(11) NOT NULL,
  `idproduct` int(11) NOT NULL,
  `cant` decimal(10,0) NOT NULL,
  `total` decimal(10,0) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,0) NOT NULL DEFAULT '0',
  `state` varchar(45) NOT NULL DEFAULT 'Pendiente',
  `paydate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  `value` decimal(10,0) NOT NULL,
  `cant` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `names` varchar(45) NOT NULL,
  `rol` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL DEFAULT '123',
  `user` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

INSERT INTO `prueba_momentu_nodejs`.`users` (`id`, `names`, `rol`, `password`, `user`) VALUES ('1', 'admin', 'Admin', 'admin', 'admin');

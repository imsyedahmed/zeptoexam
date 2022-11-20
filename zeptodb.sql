# ************************************************************
# Sequel Ace SQL dump
# Version 20039
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: 127.0.01 (MySQL 5.7.39)
# Database: zeptodb
# Generation Time: 2022-11-20 11:31:41 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table fontgroups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fontgroups`;

CREATE TABLE `fontgroups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `files` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `fontgroups` WRITE;
/*!40000 ALTER TABLE `fontgroups` DISABLE KEYS */;

INSERT INTO `fontgroups` (`id`, `name`, `files`)
VALUES
	(3,'Test Group 1','[{\"id\": \"1\", \"name\": \"FiraSans-BlackItalic\"}, {\"id\": \"2\", \"name\": \"FiraSans-Black\"}]');

/*!40000 ALTER TABLE `fontgroups` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fonts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fonts`;

CREATE TABLE `fonts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `file_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `fonts` WRITE;
/*!40000 ALTER TABLE `fonts` DISABLE KEYS */;

INSERT INTO `fonts` (`id`, `name`, `file_name`)
VALUES
	(1,'FiraSans-BlackItalic','FiraSans-BlackItalic.ttf'),
	(2,'FiraSans-Black','FiraSans-Black.ttf'),
	(3,'FiraSans-ExtraBold','FiraSans-ExtraBold.ttf');

/*!40000 ALTER TABLE `fonts` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

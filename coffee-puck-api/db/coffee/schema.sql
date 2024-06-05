CREATE TABLE `roasters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `blogURL` varchar(255) NOT NULL,
  `notes` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `socials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `icon` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `roasterId` int NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roasterId` (`roasterId`),
  CONSTRAINT `socials_ibfk_1` FOREIGN KEY (`roasterId`) REFERENCES `roasters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `beans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `process` varchar(255) NOT NULL,
  `producers` varchar(255) NOT NULL,
  `altitude` varchar(255) NOT NULL,
  `roast` varchar(255) NOT NULL,
  `varietyId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `varietyId` (`varietyId`),
  CONSTRAINT `beans_ibfk_1` FOREIGN KEY (`varietyId`) REFERENCES `varieties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `varieties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `history` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `parentId` int NOT NULL,
  `dwarf` text,
  `altitude` text,
  `lineage` text,
  `genetic` text,
  `other_names` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `coffee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `isDecaf` tinyint(1) DEFAULT NULL,
  `rating` decimal(5,0) NOT NULL,
  `roasterId` int NOT NULL,
  `recipe` varchar(255) NOT NULL,
  `cost` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdOn` varchar(255) DEFAULT NULL,
  `updatedOn` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roasterId` (`roasterId`),
  CONSTRAINT `coffee_ibfk_1` FOREIGN KEY (`roasterId`) REFERENCES `roasters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `brew` (
  `id` int NOT NULL AUTO_INCREMENT,
  `preGrindAroma` varchar(255) NOT NULL,
  `postGrindAroma` varchar(255) NOT NULL,
  `acidity` varchar(255) NOT NULL,
  `sweetness` varchar(255) NOT NULL,
  `body` varchar(255) NOT NULL,
  `finish` varchar(255) NOT NULL,
  `flavour` varchar(255) NOT NULL,
  `coffeeId` int NOT NULL,
  `createdOn` datetime DEFAULT NULL,
  `updatedOn` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `coffeeId` (`coffeeId`),
  CONSTRAINT `brew_ibfk_1` FOREIGN KEY (`coffeeId`) REFERENCES `coffee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `coffee_bean` (
  `id` int NOT NULL AUTO_INCREMENT,
  `coffeeId` int DEFAULT NULL,
  `beanId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `coffeeId` (`coffeeId`),
  KEY `beanId` (`beanId`),
  CONSTRAINT `coffee_bean_ibfk_1` FOREIGN KEY (`coffeeId`) REFERENCES `coffee` (`id`),
  CONSTRAINT `coffee_bean_ibfk_2` FOREIGN KEY (`beanId`) REFERENCES `beans` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `coffee_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `ratio` varchar(255) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



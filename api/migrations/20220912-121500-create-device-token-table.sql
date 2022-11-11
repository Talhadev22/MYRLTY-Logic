CREATE TABLE `device_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `device_token` text NOT NULL,
  `unique_id` varchar(255) DEFAULT NULL,
  `device_platform` varchar(10) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deletedAt` datetime DEFAULT NULL,
  `user` int NOT NULL,
  PRIMARY KEY (`id`)
)
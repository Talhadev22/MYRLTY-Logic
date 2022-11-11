CREATE TABLE `subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `package_id` varchar(255),
  `type` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,  
  `days` int DEFAULT NULL,
  `status` int DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
  
)

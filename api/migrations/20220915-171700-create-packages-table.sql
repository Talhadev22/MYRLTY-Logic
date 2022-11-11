CREATE TABLE `packages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `package_name` varchar(255),
  `status` int DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
  
)

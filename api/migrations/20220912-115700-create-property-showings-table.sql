CREATE TABLE `property_showing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `property_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `is_notify` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
)
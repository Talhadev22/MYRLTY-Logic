CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `notification_type` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `user` int NOT NULL,
  `is_open` tinyint(1) DEFAULT '0',
  `unique_ids` text,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `showing_id` int DEFAULT NULL,
  `is_notify` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
)
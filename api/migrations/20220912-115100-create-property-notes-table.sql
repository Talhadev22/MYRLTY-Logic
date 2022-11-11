CREATE TABLE `property_notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

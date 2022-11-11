CREATE TABLE `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `term_and_condition` varchar(255) NOT NULL,
  `privacy_policy` varchar(255) NOT NULL,
  `about_us` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
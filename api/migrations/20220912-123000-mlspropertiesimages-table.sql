CREATE TABLE `mlspropertiesimages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img_property_id` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)
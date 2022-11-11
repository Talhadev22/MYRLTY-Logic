CREATE TABLE `property_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `property_id` int NOT NULL,
  `is_thumbnail` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `property_image_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

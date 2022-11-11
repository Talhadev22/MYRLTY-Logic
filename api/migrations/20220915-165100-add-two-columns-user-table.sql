ALTER TABLE `user_profile`
ADD `subscription_days` int DEFAULT NULL,
ADD `subscription_start_time` timestamp NOT NULL,
ADD `subscription_end_time` timestamp NOT NULL;

ALTER TABLE `subscriptions`
RENAME COLUMN`days` TO `duration`,
ADD `duration_type` int DEFAULT NULL;  

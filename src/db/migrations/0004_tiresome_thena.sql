ALTER TABLE `workouts` MODIFY COLUMN `time_elapsed` varchar(100);--> statement-breakpoint
ALTER TABLE `workouts` ADD `status` varchar(10) DEFAULT 'current';
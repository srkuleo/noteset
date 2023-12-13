ALTER TABLE `workouts` MODIFY COLUMN `title` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `workouts` MODIFY COLUMN `description` text DEFAULT ('Add description...');--> statement-breakpoint
CREATE INDEX `title_index` ON `workouts` (`title`);
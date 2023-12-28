ALTER TABLE `workouts` ADD `status` varchar(10) DEFAULT 'current';--> statement-breakpoint
CREATE INDEX `status_index` ON `workouts` (`status`);
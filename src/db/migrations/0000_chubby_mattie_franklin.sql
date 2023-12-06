CREATE TABLE `workouts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(100),
	`description` text,
	`user_id` varchar(255) NOT NULL,
	`done_at` date,
	`time_elapsed` text,
	CONSTRAINT `workouts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `user_id_index` ON `workouts` (`user_id`);
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(30) NOT NULL,
	`email` varchar(50) NOT NULL,
	`password` varchar(32) NOT NULL,
	`picture` text,
	`created_at` date,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `workouts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(100),
	`description` text,
	`exercises` json,
	`done_at` date,
	`time_elapsed` time,
	`user_id` bigint,
	CONSTRAINT `workouts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `done_at_idx` ON `workouts` (`done_at`);
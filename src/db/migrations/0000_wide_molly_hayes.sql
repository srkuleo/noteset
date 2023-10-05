CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(256),
	`email` varchar(50),
	`password` varchar(20),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workouts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`description` text,
	`exercises` json,
	`done_at` date,
	`time_elapsed` time,
	`user_id` bigint,
	CONSTRAINT `workouts_id` PRIMARY KEY(`id`)
);

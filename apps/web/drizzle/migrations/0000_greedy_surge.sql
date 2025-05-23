CREATE TABLE `locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`note` text,
	`created` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`hasToilet` integer NOT NULL,
	`createdById` text,
	`modifiedById` text,
	`lastModified` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`modifiedById`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `createdById_idx` ON `locations` (`createdById`);--> statement-breakpoint
CREATE INDEX `modifiedById_idx` ON `locations` (`modifiedById`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);

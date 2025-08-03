--
-- This script creates a MySQL database schema for an insurance provider comparison application.
-- This version includes security enhancements for user authentication and authorization.
--

CREATE DATABASE PolicyDash;
USE PolicyDash;

-- ====================================================================================
-- Table: insurance_providers
-- Stores information about the insurance companies.
-- ====================================================================================
CREATE TABLE `insurance_providers` (
    `provider_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `website` VARCHAR(255) NULL,
    `contact_email` VARCHAR(255) NULL,
    `phone_number` VARCHAR(50) NULL,
    `address` TEXT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`provider_id`),
    UNIQUE KEY `uk_provider_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================================
-- Table: insurance_plans
-- Stores the different insurance plans offered by providers.
-- The `plan_type` column can be used to categorize plans (e.g., 'auto', 'home', 'health').
-- ====================================================================================
CREATE TABLE `insurance_plans` (
    `plan_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `provider_id` INT UNSIGNED NOT NULL,
    `plan_name` VARCHAR(255) NOT NULL,
    `plan_type` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `monthly_premium` DECIMAL(10, 2) NOT NULL,
    `deductible` DECIMAL(10, 2) NULL,
    `policy_term_months` INT UNSIGNED NULL, -- E.g., 6, 12, 24 months
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`plan_id`),
    KEY `idx_provider_id` (`provider_id`),
    CONSTRAINT `fk_plans_provider_id` FOREIGN KEY (`provider_id`) REFERENCES `insurance_providers` (`provider_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================================
-- Table: plan_features
-- A catalog of all possible insurance plan features (e.g., 'Roadside Assistance', 'Dental Coverage').
-- ====================================================================================
CREATE TABLE `plan_features` (
    `feature_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `feature_name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    PRIMARY KEY (`feature_id`),
    UNIQUE KEY `uk_feature_name` (`feature_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================================
-- Table: insurance_plan_features
-- A junction table to link plans to their specific features.
-- This allows a plan to have many features, and a feature to belong to many plans.
-- The `feature_value` can store details like 'included', 'extra cost', or a specific amount.
-- ====================================================================================
CREATE TABLE `insurance_plan_features` (
    `plan_id` INT UNSIGNED NOT NULL,
    `feature_id` INT UNSIGNED NOT NULL,
    `feature_value` VARCHAR(255) NULL,
    PRIMARY KEY (`plan_id`, `feature_id`),
    CONSTRAINT `fk_ipf_plan_id` FOREIGN KEY (`plan_id`) REFERENCES `insurance_plans` (`plan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_ipf_feature_id` FOREIGN KEY (`feature_id`) REFERENCES `plan_features` (`feature_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================================
-- Table: users
-- Stores user information. This table is updated to support enhanced password security.
-- It is critical to use a strong hashing function like Argon2 or bcrypt in the application.
-- The `password_hash` should be long enough to store the full output of these functions.
-- ====================================================================================
CREATE TABLE `users` (
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL, -- Recommended for storing Argon2 or bcrypt hashes
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `uk_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================================
-- Table: uploaded_policies
-- Stores metadata about insurance policies uploaded by users.
-- ====================================================================================
CREATE TABLE `uploaded_policies` (
    `policy_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `file_name` VARCHAR(255) NOT NULL,
    `file_path` VARCHAR(512) NOT NULL, -- Path to the stored file
    `upload_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `document_type` VARCHAR(100) NULL, -- e.g., 'Policy Document', 'Invoice'
    PRIMARY KEY (`policy_id`),
    KEY `idx_user_id` (`user_id`),
    CONSTRAINT `fk_uploaded_policies_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================================
-- Table: forum_topics
-- Stores the main topics for the user-to-user discussion forum.
-- ====================================================================================
CREATE TABLE `forum_topics` (
    `topic_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL, -- The user who created the topic
    `topic_title` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`topic_id`),
    CONSTRAINT `fk_topics_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================================
-- Table: forum_posts
-- Stores the individual posts/comments within a forum topic.
-- `parent_post_id` allows for nested comments or replies.
-- ====================================================================================
CREATE TABLE `forum_posts` (
    `post_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `topic_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL, -- The user who created the post
    `parent_post_id` INT UNSIGNED NULL, -- For replies to other posts
    `post_content` TEXT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`post_id`),
    KEY `idx_topic_id` (`topic_id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_parent_post_id` (`parent_post_id`),
    CONSTRAINT `fk_posts_topic_id` FOREIGN KEY (`topic_id`) REFERENCES `forum_topics` (`topic_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_posts_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_posts_parent_post_id` FOREIGN KEY (`parent_post_id`) REFERENCES `forum_posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================================
-- Table: roles
-- Defines the different user roles in the application (e.g., 'admin', 'moderator', 'user').
-- This table is a key part of a robust Role-Based Access Control (RBAC) system.
-- ====================================================================================
CREATE TABLE `roles` (
    `role_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(50) NOT NULL, -- e.g., 'admin', 'moderator', 'user'
    PRIMARY KEY (`role_id`),
    UNIQUE KEY `uk_role_name` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================================
-- Table: user_roles
-- A junction table to assign multiple roles to a user.
-- This allows for flexible and granular permissions management.
-- ====================================================================================
CREATE TABLE `user_roles` (
    `user_id` INT UNSIGNED NOT NULL,
    `role_id` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`user_id`, `role_id`),
    CONSTRAINT `fk_user_roles_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_user_roles_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================================
-- Table: user_sessions
-- Stores secure session tokens (like JWT refresh tokens) for user authentication.
-- A refresh token should be a long, randomly generated, and unique string.
-- The `expires_at` column is essential for revoking sessions.
-- ====================================================================================
CREATE TABLE `user_sessions` (
    `session_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `token` VARCHAR(512) NOT NULL, -- To store the refresh token
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `expires_at` DATETIME NOT NULL,
    PRIMARY KEY (`session_id`),
    UNIQUE KEY `uk_session_token` (`token`),
    CONSTRAINT `fk_user_sessions_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

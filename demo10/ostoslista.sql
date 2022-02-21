-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 20, 2022 at 04:41 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE DATABASE IF NOT EXISTS ostoslista DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_swedish_ci;
USE ostoslista;

DROP TABLE IF EXISTS ostos; 

CREATE TABLE ostos (
  id int(11) NOT NULL,
  ostos text COLLATE utf8mb4_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;

INSERT INTO ostos (id, ostos) VALUES
(1, 'Maitoa'),
(2, 'Leipää'),
(3, 'Kahvia');

ALTER TABLE ostos
  ADD PRIMARY KEY (id);

ALTER TABLE ostos
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;


-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 15, 2025 at 06:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `omichannel`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `platform` varchar(255) NOT NULL,
  `sender_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `platform`, `sender_id`, `user_id`, `message`, `type`, `created_at`) VALUES
(1, 'telegram', NULL, '2139211504', '/start', NULL, '2025-06-12 10:12:42'),
(2, 'telegram', NULL, '2139211504', 'Tt', NULL, '2025-06-12 10:12:42'),
(3, 'telegram', NULL, '2139211504', 'Hii', NULL, '2025-06-12 10:12:42'),
(4, 'telegram', NULL, '2139211504', 'Hi', NULL, '2025-06-12 10:12:42'),
(5, 'telegram', NULL, '2139211504', 'Ppfr', NULL, '2025-06-12 10:21:03'),
(6, 'line', NULL, 'U278a55daf9be939e32082ee547493b79', 'Hgd', NULL, '2025-06-12 10:24:29'),
(7, 'line', NULL, 'U278a55daf9be939e32082ee547493b79', 'Ggye', NULL, '2025-06-12 10:36:04'),
(8, 'line', NULL, 'U278a55daf9be939e32082ee547493b79', 'Dytyug', NULL, '2025-06-12 10:36:11'),
(9, 'line', NULL, 'U278a55daf9be939e32082ee547493b79', 'Yrtrry', NULL, '2025-06-12 10:39:25'),
(10, 'line', NULL, 'U278a55daf9be939e32082ee547493b79', 'T55', NULL, '2025-06-12 10:39:26'),
(11, 'line', NULL, 'U278a55daf9be939e32082ee547493b79', 'Fry6', NULL, '2025-06-12 10:39:41'),
(12, 'line', NULL, 'U278a55daf9be939e32082ee547493b79', 'Ggff', NULL, '2025-06-12 10:40:52'),
(13, 'telegram', NULL, '2139211504', 'Jd6', NULL, '2025-06-14 02:48:39'),
(14, 'line', NULL, 'U278a55daf9be939e32082ee547493b79', 'Gdy', NULL, '2025-06-14 02:55:10'),
(15, 'telegram', NULL, '1691425366', '/start', NULL, '2025-06-14 02:56:15'),
(16, 'telegram', NULL, '1691425366', 'Hi', NULL, '2025-06-14 02:56:25'),
(17, 'telegram', NULL, '1691425366', 'Myat Phone San', NULL, '2025-06-14 02:56:32'),
(18, 'telegram', NULL, '1691425366', 'wa ta shi no namae wa sla', NULL, '2025-06-14 02:56:43'),
(19, 'telegram', NULL, '1691425366', 'to', NULL, '2025-06-14 02:56:45'),
(20, 'telegram', NULL, '1691425366', 'mo shi mas', NULL, '2025-06-14 02:56:49'),
(21, 'line', NULL, 'U6c275ca441d3a1a44f9203767851819a', 'Hola', NULL, '2025-06-14 03:00:38'),
(22, 'line', NULL, 'U6c275ca441d3a1a44f9203767851819a', 'Como esta ', NULL, '2025-06-14 03:00:48'),
(23, 'line', NULL, 'U6c275ca441d3a1a44f9203767851819a', 'Bueno dìa amigo', NULL, '2025-06-14 03:01:01'),
(24, 'facebook', NULL, '3715868921813174', 'Jhg', NULL, '2025-06-14 03:06:56'),
(26, 'facebook', NULL, '3715868921813174', 'Rrr', NULL, '2025-06-14 03:11:12'),
(27, 'facebook', NULL, '30919319691000820', 'Hi Design အပ်ချင်လို့ပါဗျ', NULL, '2025-06-14 03:41:37'),
(28, 'facebook', NULL, '102635271785797', 'Mingalar Par!!! စိတ်ဝင်တစား မေးမြန်းပေးတဲ.အတွက် ED မှ ကျေးဇူးအထူးတင်ရှိပါတယ်ခင်ဗျာ။ \n   လူကြီးမင်းရဲ. လုပ်ငန်းအတွက် Logo design/ ကြော်ငြာ design / Business cards / Vouchers / Stickers နှင်. ဖိတ်စာအမျိုးမျိုး တို.ကို ED မှာ အပ်လို.ရပါတယ် ခင်ဗျာ', NULL, '2025-06-14 03:41:41'),
(29, 'facebook', NULL, '30919319691000820', 'မရတာဘာရှိလဲအကို', NULL, '2025-06-14 03:41:45'),
(30, 'facebook', NULL, '30919319691000820', 'ပုံအပ်လို့ရလာဗျ', NULL, '2025-06-14 03:43:16'),
(31, 'facebook', NULL, '30919319691000820', 'dfgfddsf', NULL, '2025-06-14 03:50:37'),
(32, 'facebook', NULL, '30919319691000820', 'ိခ်ခ််လ်', NULL, '2025-06-14 03:51:12'),
(33, 'facebook', NULL, '30919319691000820', 'hi', NULL, '2025-06-14 03:51:14'),
(34, 'facebook', NULL, '3715868921813174', 'Vhu', NULL, '2025-06-14 04:47:17'),
(35, 'facebook', NULL, '102635271785797', 'Jgy', NULL, '2025-06-14 04:47:20'),
(36, 'facebook', NULL, '3715868921813174', 'Hgf', NULL, '2025-06-14 04:47:24'),
(37, 'facebook', NULL, '3715868921813174', 'Tt', NULL, '2025-06-14 04:47:25'),
(38, 'facebook', NULL, '102635271785797', 'ryy', NULL, '2025-06-14 05:08:43'),
(39, 'facebook', NULL, '30919319691000820', 'hyg', NULL, '2025-06-14 05:10:05'),
(40, 'facebook', NULL, '102635271785797', 'dkj', NULL, '2025-06-14 05:10:18'),
(41, 'facebook', NULL, '102635271785797', 'xvdv', NULL, '2025-06-14 05:12:34'),
(42, 'facebook', NULL, '102635271785797', 'fbfd', NULL, '2025-06-14 05:23:58'),
(43, 'facebook', NULL, '3715868921813174', 'Hgggg', NULL, '2025-06-14 05:26:42'),
(44, 'telegram', NULL, '2139211504', 'Xcf', NULL, '2025-06-14 08:05:39'),
(45, 'line', NULL, 'U278a55daf9be939e32082ee547493b79', 'Hut', NULL, '2025-06-14 08:07:23'),
(46, 'facebook', NULL, '3715868921813174', 'Jtt', NULL, '2025-06-14 08:09:33'),
(47, 'facebook', NULL, '102635271785797', 'm, m,m,', NULL, '2025-06-14 08:09:45'),
(48, 'telegram', NULL, '2139211504', 'ြင', NULL, '2025-06-14 08:21:49'),
(49, 'telegram', NULL, '2139211504', 'Hi', NULL, '2025-06-14 08:21:49'),
(50, 'telegram', NULL, '2139211504', 'Rrertt', NULL, '2025-06-14 08:21:50'),
(51, 'facebook', NULL, '3715868921813174', 'Hhg', NULL, '2025-06-14 08:22:23'),
(52, 'facebook', NULL, '102635271785797', 'mnnmnm', NULL, '2025-06-14 08:22:31'),
(53, 'facebook', NULL, '3715868921813174', 'T67u', NULL, '2025-06-14 08:22:42'),
(54, 'facebook', NULL, '102635271785797', ',mm', NULL, '2025-06-14 08:22:57'),
(55, 'line', NULL, 'U278a55daf9be939e32082ee547493b79', 'Hgt', NULL, '2025-06-14 08:23:27'),
(56, 'instagram', NULL, '17841440138207411', 'Rrr6', NULL, '2025-06-14 10:29:33'),
(57, 'instagram', NULL, '17841440138207411', 'Urr', NULL, '2025-06-14 10:39:05'),
(58, 'instagram', NULL, '17841440138207411', 'Hgctg', NULL, '2025-06-14 10:40:12'),
(59, 'instagram', NULL, '17841440138207411', '🎋🎋🎎🎏', NULL, '2025-06-14 10:40:39'),
(60, 'instagram', NULL, '17841440138207411', '၆ပ၅', NULL, '2025-06-14 10:41:06'),
(61, 'instagram', NULL, '17841440138207411', 'Hfy', NULL, '2025-06-14 10:44:14'),
(62, 'instagram', NULL, '677440358450272', 'Hey Yo', NULL, '2025-06-14 10:44:45'),
(63, 'instagram', NULL, '677440358450272', 'What\'s up bro', NULL, '2025-06-14 10:45:01'),
(64, 'instagram', NULL, '677440358450272', 'We are Venom', NULL, '2025-06-14 10:45:29'),
(65, 'instagram', NULL, '677440358450272', 'hey let\'s fight', NULL, '2025-06-14 10:46:28'),
(66, 'instagram', NULL, '677440358450272', 'hey guy let\'s fight', NULL, '2025-06-14 10:46:38'),
(67, 'instagram', NULL, '677440358450272', 'come on', NULL, '2025-06-14 10:46:40'),
(68, 'instagram', NULL, '17841440138207411', 'You dare fight me', NULL, '2025-06-14 10:46:56'),
(69, 'instagram', NULL, '677440358450272', 'how dare you', NULL, '2025-06-14 10:47:07');

-- --------------------------------------------------------

--
-- Table structure for table `reply`
--

CREATE TABLE `reply` (
  `id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  `platform` varchar(50) NOT NULL,
  `text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reply`
--
ALTER TABLE `reply`
  ADD PRIMARY KEY (`id`),
  ADD KEY `message_id` (`message_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `reply`
--
ALTER TABLE `reply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reply`
--
ALTER TABLE `reply`
  ADD CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

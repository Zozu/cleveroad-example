-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Ноя 17 2015 г., 05:27
-- Версия сервера: 5.6.26
-- Версия PHP: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `test_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `item`
--

CREATE TABLE IF NOT EXISTS `item` (
  `id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `title` varchar(30) COLLATE utf8_unicode_520_ci NOT NULL,
  `price` double NOT NULL,
  `image` varchar(50) COLLATE utf8_unicode_520_ci NOT NULL,
  `user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Дамп данных таблицы `item`
--

INSERT INTO `item` (`id`, `created_at`, `title`, `price`, `image`, `user`) VALUES
(1, '2015-11-17 06:17:46', 'Bag', 200, '/images/1', 0),
(2, '2015-11-17 06:19:00', 'Bag', 200, '/images/2', 0),
(3, '2015-11-17 06:19:12', 'Bag', 150, '/images/3', 0),
(4, '2015-11-17 06:20:53', 'Car', 1000, '/images/4', 0),
(5, '2015-11-17 06:21:04', 'Car', 2000, '/images/5', 0),
(6, '2015-11-17 06:21:13', 'Car', 3000, '/images/6', 0),
(7, '2015-11-17 06:22:12', 'House', 1000000, '/images/7', 0),
(8, '2015-11-17 06:22:25', 'House', 500000, '/images/8', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `email` varchar(40) COLLATE utf8_unicode_520_ci NOT NULL,
  `pass` varchar(20) COLLATE utf8_unicode_520_ci NOT NULL,
  `name` varchar(40) COLLATE utf8_unicode_520_ci NOT NULL,
  `tel` varchar(15) COLLATE utf8_unicode_520_ci NOT NULL,
  `token` varchar(40) COLLATE utf8_unicode_520_ci NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `email`, `pass`, `name`, `tel`, `token`, `time`) VALUES
(0, 'admin@admin.com', 'qwerty', 'Admin', '214123', '7q0ejg2dwn67ds4iscxx', '2015-11-17 06:18:48'),
(1, 'user@user.com', 'qwerty', 'User', '37363731', '', '0000-00-00 00:00:00');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `item`
--
ALTER TABLE `item`
  ADD FULLTEXT KEY `item` (`title`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD FULLTEXT KEY `user` (`email`,`name`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

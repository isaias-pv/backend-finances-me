-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2023 at 12:11 AM
-- Server version: 8.0.33
-- PHP Version: 8.2.4
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
--
-- Database: `finance_db`
--

-- --------------------------------------------------------
--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
	`account_id` int NOT NULL,
	`name` varchar(50) NOT NULL,
	`balance` decimal(10, 2) NOT NULL,
	`bank_id` int DEFAULT NULL,
	`created_at` date DEFAULT (now()),
	`creator_user_id` int DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (
		`account_id`,
		`name`,
		`balance`,
		`bank_id`,
		`created_at`,
		`creator_user_id`
	)
VALUES (
		1,
		'CUENTA DE AVVILLAS',
		290169.00,
		1,
		'2023-10-08',
		1
	),
	(
		2,
		'CUENTA DE NEQUI',
		2202.13,
		2,
		'2023-10-08',
		1
	),
	(
		3,
		'CUENTA DE DAVIVIENDA',
		1366.93,
		3,
		'2023-10-08',
		1
	),
	(
		4,
		'CUENTA DE BANCOLOMBIA',
		1015.34,
		4,
		'2023-10-08',
		1
	),
	(5, 'EFECTIVO', 77000.00, 5, '2023-10-08', 1),
	(
		6,
		'TARJETA DE CREDITO SERFINANZA',
		0.00,
		6,
		'2023-10-08',
		1
	);
-- --------------------------------------------------------
--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
	`bank_id` int NOT NULL,
	`name` varchar(50) NOT NULL,
	`created_at` date DEFAULT (now()),
	`creator_user_id` int DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
-- Dumping data for table `banks`
--

INSERT INTO `banks` (
		`bank_id`,
		`name`,
		`created_at`,
		`creator_user_id`
	)
VALUES (1, 'AVVILLAS', '2023-10-08', 1),
	(2, 'NEQUI', '2023-10-08', 1),
	(3, 'DAVIVIENDA', '2023-10-08', 1),
	(4, 'BANCOLOMBIA', '2023-10-08', 1),
	(5, 'EFECTIVO', '2023-10-08', 1),
	(6, 'SERFINANZA', '2023-10-08', 1);
-- --------------------------------------------------------
--
-- Table structure for table `concepts`
--

CREATE TABLE `concepts` (
	`concept_id` int NOT NULL,
	`name` varchar(50) NOT NULL,
	`created_at` date DEFAULT (now()),
	`creator_user_id` int DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
-- Dumping data for table `concepts`
--

INSERT INTO `concepts` (
		`concept_id`,
		`name`,
		`created_at`,
		`creator_user_id`
	)
VALUES (1, 'Gastos', '2023-10-08', 1),
	(2, 'Pago', '2023-10-08', 1),
	(3, 'Gastos Mensuales', '2023-10-08', 1),
	(4, 'Alquiler/Hipoteca', '2023-10-08', 1),
	(5, 'Comida', '2023-10-08', 1),
	(6, 'Transporte', '2023-10-08', 1),
	(7, 'Ocio y Entretenimiento', '2023-10-08', 1),
	(8, 'Facturas', '2023-10-08', 1),
	(9, 'Ingreso Mensual', '2023-10-08', 1),
	(10, 'Salario', '2023-10-08', 1),
	(11, 'Ingreso Adicional', '2023-10-08', 1),
	(12, 'Bonificación', '2023-10-08', 1),
	(13, 'Otros Ingresos', '2023-10-08', 1),
	(
		14,
		'Transferencia a Otra Cuenta',
		'2023-10-08',
		1
	),
	(
		15,
		'Transferencia a Otro Banco',
		'2023-10-08',
		1
	),
	(
		16,
		'Transferencia a Tarjeta de Crédito',
		'2023-10-08',
		1
	),
	(
		17,
		'Transferencia a Amigo/Familia',
		'2023-10-08',
		1
	),
	(
		18,
		'Ingreso de Transferencia Externa',
		'2023-10-08',
		1
	),
	(19, 'Compras', '2023-10-08', 1),
	(20, 'Cenas Fuera', '2023-10-08', 1),
	(21, 'Ropa y Accesorios', '2023-10-08', 1),
	(22, 'Tecnología', '2023-10-08', 1),
	(23, 'Salud y Bienestar', '2023-10-08', 1),
	(24, 'GASTO', '2023-10-08', 1),
	(25, 'PAGO', '2023-10-08', 1),
	(26, 'TRANSFERECIA', '2023-10-08', 1),
	(27, 'INGRESO DEL SUELDO', '2023-10-08', 1),
	(28, 'GASTO FIJO', '2023-10-08', 1);
-- --------------------------------------------------------
--
-- Table structure for table `credit_cards`
--

CREATE TABLE `credit_cards` (
	`credit_card_id` int NOT NULL,
	`name` varchar(50) NOT NULL,
	`credit_limit` decimal(10, 2) NOT NULL,
	`current_balance` decimal(10, 2) NOT NULL,
	`due_date` date NOT NULL,
	`associated_account_id` int DEFAULT NULL,
	`creator_user_id` int DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
-- Dumping data for table `credit_cards`
--

INSERT INTO `credit_cards` (
		`credit_card_id`,
		`name`,
		`credit_limit`,
		`current_balance`,
		`due_date`,
		`associated_account_id`,
		`creator_user_id`
	)
VALUES (
		1,
		'Visa Oro',
		5000.00,
		1000.00,
		'2023-11-30',
		NULL,
		1
	),
	(
		2,
		'MasterCard Platinum',
		10000.00,
		2500.00,
		'2023-11-25',
		NULL,
		1
	),
	(
		3,
		'American Express',
		8000.00,
		0.00,
		'2023-12-05',
		NULL,
		1
	);
-- --------------------------------------------------------
--
-- Table structure for table `credit_card_payments`
--

CREATE TABLE `credit_card_payments` (
	`credit_card_payment_id` int NOT NULL,
	`credit_card_transaction_id` int DEFAULT NULL,
	`account_id` int DEFAULT NULL,
	`payment_amount` decimal(10, 2) NOT NULL,
	`payment_date` date DEFAULT (now()),
	`creator_user_id` int DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
-- Dumping data for table `credit_card_payments`
--

INSERT INTO `credit_card_payments` (
		`credit_card_payment_id`,
		`credit_card_transaction_id`,
		`account_id`,
		`payment_amount`,
		`payment_date`,
		`creator_user_id`
	)
VALUES (1, 1, NULL, 2000.00, '2023-10-15', NULL),
	(2, 1, NULL, 50000.00, '2023-10-20', NULL);
-- --------------------------------------------------------
--
-- Table structure for table `credit_card_transactions`
--

CREATE TABLE `credit_card_transactions` (
	`credit_card_transaction_id` int NOT NULL,
	`credit_card_id` int DEFAULT NULL,
	`type_transaction_id` int DEFAULT (1),
	`date_transaction` date DEFAULT (now()),
	`amount` decimal(10, 2) NOT NULL,
	`concept_id` int DEFAULT NULL,
	`observation` text,
	`creator_user_id` int DEFAULT NULL,
	`installments` int DEFAULT '1',
	`installment_number` int DEFAULT NULL,
	`total_installments` int DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
-- Dumping data for table `credit_card_transactions`
--

INSERT INTO `credit_card_transactions` (
		`credit_card_transaction_id`,
		`credit_card_id`,
		`type_transaction_id`,
		`date_transaction`,
		`amount`,
		`concept_id`,
		`observation`,
		`creator_user_id`,
		`installments`,
		`installment_number`,
		`total_installments`
	)
VALUES (
		1,
		1,
		1,
		'2023-11-01',
		500.00,
		1,
		'Compra en supermercado',
		1,
		1,
		NULL,
		NULL
	),
	(
		2,
		1,
		2,
		'2023-11-10',
		200.00,
		2,
		'Pago de factura',
		1,
		1,
		NULL,
		NULL
	),
	(
		3,
		2,
		1,
		'2023-11-05',
		1000.00,
		1,
		'Compra en tienda de electrónicos',
		1,
		1,
		NULL,
		NULL
	),
	(
		4,
		2,
		1,
		'2023-11-20',
		1500.00,
		3,
		'Reservación de vuelo',
		1,
		1,
		NULL,
		NULL
	),
	(
		5,
		3,
		1,
		'2023-11-15',
		300.00,
		4,
		'Cena en restaurante',
		1,
		1,
		NULL,
		NULL
	),
	(
		6,
		3,
		2,
		'2023-11-30',
		800.00,
		2,
		'Pago de parte del saldo',
		1,
		1,
		NULL,
		NULL
	),
	(
		7,
		1,
		1,
		'2023-10-08',
		700000.00,
		NULL,
		NULL,
		NULL,
		1,
		1,
		3
	),
	(
		8,
		1,
		1,
		'2023-10-08',
		250000.00,
		NULL,
		NULL,
		NULL,
		1,
		1,
		2
	),
	(
		9,
		1,
		1,
		'2023-10-08',
		150000.00,
		NULL,
		NULL,
		NULL,
		1,
		1,
		1
	);
-- --------------------------------------------------------
--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
	`transaction_id` int NOT NULL,
	`type_transaction_id` int NOT NULL,
	`date_transaction` date DEFAULT (now()),
	`amount` decimal(10, 2) NOT NULL,
	`concept_id` int DEFAULT NULL,
	`observation` text,
	`account_origin_id` int DEFAULT NULL,
	`account_destination_id` int DEFAULT NULL,
	`created_at` date DEFAULT (now()),
	`creator_user_id` int DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (
		`transaction_id`,
		`type_transaction_id`,
		`date_transaction`,
		`amount`,
		`concept_id`,
		`observation`,
		`account_origin_id`,
		`account_destination_id`,
		`created_at`,
		`creator_user_id`
	)
VALUES (
		1,
		1,
		'2023-10-03',
		1520606.00,
		NULL,
		'Sueldo',
		NULL,
		1,
		'2023-10-08',
		1
	),
	(
		2,
		1,
		'2023-10-03',
		5000.00,
		NULL,
		'Spotify - Luis ',
		NULL,
		2,
		'2023-10-08',
		1
	),
	(
		3,
		1,
		'2023-10-03',
		1366.93,
		NULL,
		'Base',
		NULL,
		3,
		'2023-10-08',
		1
	),
	(
		4,
		1,
		'2023-10-03',
		4015.34,
		NULL,
		'Base',
		NULL,
		4,
		'2023-10-08',
		1
	),
	(
		5,
		1,
		'2023-10-03',
		1497.13,
		NULL,
		'Base',
		NULL,
		2,
		'2023-10-08',
		1
	),
	(
		6,
		1,
		'2023-10-03',
		0.00,
		NULL,
		'Base',
		NULL,
		5,
		'2023-10-08',
		1
	),
	(
		7,
		2,
		'2023-10-03',
		300000.00,
		5,
		'Mensualidad - Madre',
		5,
		NULL,
		'2023-10-08',
		1
	),
	(
		8,
		2,
		'2023-10-03',
		50000.00,
		5,
		'Mensualidad - Abuela',
		5,
		NULL,
		'2023-10-08',
		1
	),
	(
		9,
		2,
		'2023-10-03',
		5000.00,
		2,
		'Rifa de Jesus',
		2,
		NULL,
		'2023-10-08',
		1
	),
	(
		10,
		2,
		'2023-10-03',
		5000.00,
		2,
		'Rifa de Noris',
		2,
		NULL,
		'2023-10-08',
		1
	),
	(
		11,
		2,
		'2023-10-03',
		20000.00,
		2,
		'Rifa de Diana',
		2,
		NULL,
		'2023-10-08',
		1
	),
	(
		12,
		2,
		'2023-10-03',
		100000.00,
		1,
		'Vaca para Stiven',
		5,
		NULL,
		'2023-10-08',
		1
	),
	(
		13,
		2,
		'2023-10-03',
		4300.00,
		1,
		'Merienda (Dedito)',
		2,
		NULL,
		'2023-10-08',
		1
	),
	(
		14,
		2,
		'2023-10-03',
		26600.00,
		2,
		'Seguros AVVillas',
		1,
		NULL,
		'2023-10-08',
		1
	),
	(
		15,
		2,
		'2023-10-06',
		8000.00,
		2,
		'Cumpleaños Eyleen',
		2,
		NULL,
		'2023-10-08',
		1
	),
	(
		16,
		2,
		'2023-10-04',
		3000.00,
		1,
		'Pasaje',
		5,
		NULL,
		'2023-10-08',
		1
	),
	(
		17,
		2,
		'2023-10-04',
		18000.00,
		1,
		'Salchipapa',
		5,
		NULL,
		'2023-10-08',
		1
	),
	(
		18,
		2,
		'2023-10-05',
		252832.00,
		2,
		'Cuota Moto',
		1,
		NULL,
		'2023-10-08',
		1
	),
	(
		19,
		2,
		'2023-10-05',
		300000.00,
		2,
		'Pago de Tarjeta de Credito',
		1,
		NULL,
		'2023-10-08',
		1
	),
	(
		20,
		2,
		'2023-10-06',
		10000.00,
		2,
		'Motilada',
		5,
		NULL,
		'2023-10-08',
		1
	),
	(
		21,
		2,
		'2023-10-06',
		11000.00,
		1,
		'Pastel Lorena',
		2,
		NULL,
		'2023-10-08',
		1
	),
	(
		22,
		2,
		'2023-10-07',
		2000.00,
		1,
		'Mecatos',
		5,
		NULL,
		'2023-10-08',
		1
	),
	(
		23,
		2,
		'2023-10-07',
		35000.00,
		1,
		'Gasolina',
		5,
		NULL,
		'2023-10-08',
		1
	),
	(
		24,
		2,
		'2023-10-07',
		10000.00,
		1,
		'Lavado de Moto',
		5,
		NULL,
		'2023-10-08',
		1
	),
	(
		25,
		2,
		'2023-10-03',
		600000.00,
		3,
		'Retiro de dinero',
		1,
		5,
		'2023-10-08',
		1
	),
	(
		26,
		1,
		'2023-10-03',
		600000.00,
		3,
		'Retiro de dinero',
		1,
		5,
		'2023-10-08',
		1
	),
	(
		27,
		2,
		'2023-10-03',
		25000.00,
		3,
		'Transferencia',
		1,
		2,
		'2023-10-08',
		1
	),
	(
		28,
		1,
		'2023-10-03',
		25000.00,
		3,
		'Transferencia',
		1,
		2,
		'2023-10-08',
		1
	),
	(
		29,
		2,
		'2023-10-03',
		3000.00,
		3,
		'Transferencia',
		4,
		2,
		'2023-10-08',
		1
	),
	(
		30,
		1,
		'2023-10-03',
		3000.00,
		3,
		'Transferencia',
		4,
		2,
		'2023-10-08',
		1
	),
	(
		31,
		2,
		'2023-10-04',
		9000.00,
		3,
		'Transferencia',
		1,
		2,
		'2023-10-08',
		1
	),
	(
		32,
		1,
		'2023-10-04',
		9000.00,
		3,
		'Transferencia',
		1,
		2,
		'2023-10-08',
		1
	),
	(
		33,
		2,
		'2023-10-04',
		3000.00,
		3,
		'Transferencia',
		2,
		5,
		'2023-10-08',
		1
	),
	(
		34,
		1,
		'2023-10-04',
		3000.00,
		3,
		'Transferencia',
		2,
		5,
		'2023-10-08',
		1
	),
	(
		35,
		2,
		'2023-10-06',
		2000.00,
		3,
		'Transferencia',
		1,
		5,
		'2023-10-08',
		1
	),
	(
		36,
		1,
		'2023-10-06',
		2000.00,
		3,
		'Transferencia',
		1,
		5,
		'2023-10-08',
		1
	),
	(
		37,
		2,
		'2023-10-05',
		8005.00,
		3,
		'Transferencia',
		1,
		2,
		'2023-10-08',
		1
	),
	(
		38,
		1,
		'2023-10-05',
		8005.00,
		3,
		'Transferencia',
		1,
		2,
		'2023-10-08',
		1
	),
	(
		39,
		2,
		'2023-10-06',
		7000.00,
		3,
		'Transferencia',
		1,
		2,
		'2023-10-08',
		1
	),
	(
		40,
		1,
		'2023-10-06',
		7000.00,
		3,
		'Transferencia',
		1,
		2,
		'2023-10-08',
		1
	),
	(
		41,
		2,
		'2023-10-15',
		2000.00,
		8,
		NULL,
		NULL,
		1,
		'2023-10-08',
		1
	);
--
-- Triggers `transactions`
--
DELIMITER $$
CREATE TRIGGER `update_balance_after_insert`
AFTER
INSERT ON `transactions` FOR EACH ROW BEGIN -- Actualizar el balance de la cuenta de origen en la tabla de cuentas
	IF NEW.type_transaction_id = 1 THEN IF NEW.account_destination_id IS NOT NULL THEN
UPDATE accounts
SET balance = balance + NEW.amount
WHERE account_id = NEW.account_destination_id;
END IF;
-- Actualizar el balance de la cuenta de destino en la tabla de cuentas (si hay cuenta de destino)
END IF;
IF NEW.type_transaction_id = 2 THEN IF NEW.account_origin_id IS NOT NULL THEN
UPDATE accounts
SET balance = balance + - NEW.amount
WHERE account_id = NEW.account_origin_id;
END IF;
END IF;
END $$ DELIMITER;
-- --------------------------------------------------------
--
-- Table structure for table `types_transactions`
--

CREATE TABLE `types_transactions` (
	`type_transaction_id` int NOT NULL,
	`name` varchar(50) NOT NULL,
	`created_at` date DEFAULT (now()),
	`creator_user_id` int DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
-- Dumping data for table `types_transactions`
--

INSERT INTO `types_transactions` (
		`type_transaction_id`,
		`name`,
		`created_at`,
		`creator_user_id`
	)
VALUES (1, 'INGRESO', '2023-10-08', 1),
	(2, 'EGRESO', '2023-10-08', 1);
-- --------------------------------------------------------
--
-- Table structure for table `users`
--

CREATE TABLE `users` (
	`user_id` int NOT NULL,
	`name` varchar(250) NOT NULL,
	`created_at` date DEFAULT (now())
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `created_at`)
VALUES (1, 'Isaias A. Palacio Villarreal', '2023-10-08');
--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
ADD PRIMARY KEY (`account_id`),
	ADD KEY `FK_USER_ACCOUNT` (`creator_user_id`),
	ADD KEY `FK_BANK_ACCOUNT` (`bank_id`);
--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
ADD PRIMARY KEY (`bank_id`),
	ADD KEY `FK_USER_BANK` (`creator_user_id`);
--
-- Indexes for table `concepts`
--
ALTER TABLE `concepts`
ADD PRIMARY KEY (`concept_id`),
	ADD KEY `FK_USER_CONCEPT` (`creator_user_id`);
--
-- Indexes for table `credit_cards`
--
ALTER TABLE `credit_cards`
ADD PRIMARY KEY (`credit_card_id`),
	ADD KEY `FK_ASSOCIATED_ACCOUNT` (`associated_account_id`),
	ADD KEY `FK_USER_CREDIT_CARD` (`creator_user_id`);
--
-- Indexes for table `credit_card_payments`
--
ALTER TABLE `credit_card_payments`
ADD PRIMARY KEY (`credit_card_payment_id`),
	ADD KEY `FK_CREDIT_CARD_PAYMENT_CREDIT_CARD_TRANSACTION` (`credit_card_transaction_id`),
	ADD KEY `FK_CREDIT_CARD_PAYMENT_ACCOUNT` (`account_id`),
	ADD KEY `FK_USER_CREDIT_CARD_PAYMENT` (`creator_user_id`);
--
-- Indexes for table `credit_card_transactions`
--
ALTER TABLE `credit_card_transactions`
ADD PRIMARY KEY (`credit_card_transaction_id`),
	ADD KEY `FK_CREDIT_CARD_TRANSACTION_CREDIT_CARD` (`credit_card_id`),
	ADD KEY `FK_TYPE_TRANSACTION_CREDIT_CARD_TRANSACTION` (`type_transaction_id`),
	ADD KEY `FK_CONCEPT_CREDIT_CARD_TRANSACTION` (`concept_id`),
	ADD KEY `FK_USER_CREDIT_CARD_TRANSACTION` (`creator_user_id`);
--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
ADD PRIMARY KEY (`transaction_id`),
	ADD KEY `FK_USER_TRANSACTION` (`creator_user_id`),
	ADD KEY `FK_TYPE_TRANSACTION_TRANSACTION` (`type_transaction_id`),
	ADD KEY `FK_CONCEPT_TRANSACTION` (`concept_id`),
	ADD KEY `FK_ACCOUNT_ORIGIN_TRANSACTION` (`account_origin_id`),
	ADD KEY `FK_ACCOUNT_DESTINATION_TRANSACTION` (`account_destination_id`);
--
-- Indexes for table `types_transactions`
--
ALTER TABLE `types_transactions`
ADD PRIMARY KEY (`type_transaction_id`),
	ADD KEY `FK_USER_TYPE_TRANSACTION` (`creator_user_id`);
--
-- Indexes for table `users`
--
ALTER TABLE `users`
ADD PRIMARY KEY (`user_id`);
--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
MODIFY `account_id` int NOT NULL AUTO_INCREMENT,
	AUTO_INCREMENT = 7;
--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
MODIFY `bank_id` int NOT NULL AUTO_INCREMENT,
	AUTO_INCREMENT = 7;
--
-- AUTO_INCREMENT for table `concepts`
--
ALTER TABLE `concepts`
MODIFY `concept_id` int NOT NULL AUTO_INCREMENT,
	AUTO_INCREMENT = 29;
--
-- AUTO_INCREMENT for table `credit_cards`
--
ALTER TABLE `credit_cards`
MODIFY `credit_card_id` int NOT NULL AUTO_INCREMENT,
	AUTO_INCREMENT = 4;
--
-- AUTO_INCREMENT for table `credit_card_payments`
--
ALTER TABLE `credit_card_payments`
MODIFY `credit_card_payment_id` int NOT NULL AUTO_INCREMENT,
	AUTO_INCREMENT = 3;
--
-- AUTO_INCREMENT for table `credit_card_transactions`
--
ALTER TABLE `credit_card_transactions`
MODIFY `credit_card_transaction_id` int NOT NULL AUTO_INCREMENT,
	AUTO_INCREMENT = 10;
--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
MODIFY `transaction_id` int NOT NULL AUTO_INCREMENT,
	AUTO_INCREMENT = 42;
--
-- AUTO_INCREMENT for table `types_transactions`
--
ALTER TABLE `types_transactions`
MODIFY `type_transaction_id` int NOT NULL AUTO_INCREMENT,
	AUTO_INCREMENT = 3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `user_id` int NOT NULL AUTO_INCREMENT,
	AUTO_INCREMENT = 2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
ADD CONSTRAINT `FK_BANK_ACCOUNT` FOREIGN KEY (`bank_id`) REFERENCES `banks` (`bank_id`),
	ADD CONSTRAINT `FK_USER_ACCOUNT` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`);
--
-- Constraints for table `banks`
--
ALTER TABLE `banks`
ADD CONSTRAINT `FK_USER_BANK` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`);
--
-- Constraints for table `concepts`
--
ALTER TABLE `concepts`
ADD CONSTRAINT `FK_USER_CONCEPT` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`);
--
-- Constraints for table `credit_cards`
--
ALTER TABLE `credit_cards`
ADD CONSTRAINT `FK_ASSOCIATED_ACCOUNT` FOREIGN KEY (`associated_account_id`) REFERENCES `accounts` (`account_id`),
	ADD CONSTRAINT `FK_USER_CREDIT_CARD` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`);
--
-- Constraints for table `credit_card_payments`
--
ALTER TABLE `credit_card_payments`
ADD CONSTRAINT `FK_CREDIT_CARD_PAYMENT_ACCOUNT` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`),
	ADD CONSTRAINT `FK_CREDIT_CARD_PAYMENT_CREDIT_CARD_TRANSACTION` FOREIGN KEY (`credit_card_transaction_id`) REFERENCES `credit_card_transactions` (`credit_card_transaction_id`),
	ADD CONSTRAINT `FK_USER_CREDIT_CARD_PAYMENT` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`);
--
-- Constraints for table `credit_card_transactions`
--
ALTER TABLE `credit_card_transactions`
ADD CONSTRAINT `FK_CONCEPT_CREDIT_CARD_TRANSACTION` FOREIGN KEY (`concept_id`) REFERENCES `concepts` (`concept_id`),
	ADD CONSTRAINT `FK_CREDIT_CARD_TRANSACTION_CREDIT_CARD` FOREIGN KEY (`credit_card_id`) REFERENCES `credit_cards` (`credit_card_id`),
	ADD CONSTRAINT `FK_TYPE_TRANSACTION_CREDIT_CARD_TRANSACTION` FOREIGN KEY (`type_transaction_id`) REFERENCES `types_transactions` (`type_transaction_id`),
	ADD CONSTRAINT `FK_USER_CREDIT_CARD_TRANSACTION` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`);
--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
ADD CONSTRAINT `FK_ACCOUNT_DESTINATION_TRANSACTION` FOREIGN KEY (`account_destination_id`) REFERENCES `accounts` (`account_id`),
	ADD CONSTRAINT `FK_ACCOUNT_ORIGIN_TRANSACTION` FOREIGN KEY (`account_origin_id`) REFERENCES `accounts` (`account_id`),
	ADD CONSTRAINT `FK_CONCEPT_TRANSACTION` FOREIGN KEY (`concept_id`) REFERENCES `concepts` (`concept_id`),
	ADD CONSTRAINT `FK_TYPE_TRANSACTION_TRANSACTION` FOREIGN KEY (`type_transaction_id`) REFERENCES `types_transactions` (`type_transaction_id`),
	ADD CONSTRAINT `FK_USER_TRANSACTION` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`);
--
-- Constraints for table `types_transactions`
--
ALTER TABLE `types_transactions`
ADD CONSTRAINT `FK_USER_TYPE_TRANSACTION` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`user_id`);
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
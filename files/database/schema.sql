-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema card_game_dev
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `card_game_dev` ;

-- -----------------------------------------------------
-- Schema card_game_dev
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `card_game_dev` DEFAULT CHARACTER SET utf8 ;
USE `card_game_dev` ;

-- -----------------------------------------------------
-- Table `card_game_dev`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `mail` VARCHAR(64) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `xp` INT NOT NULL DEFAULT 0,
  `coins` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`Inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`Inventory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `inventory_user_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `inventory_user`
    FOREIGN KEY (`userId`)
    REFERENCES `card_game_dev`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`Friend`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`Friend` (
  `userId` INT NOT NULL,
  `friendId` INT NOT NULL,
  INDEX `friend_user_idx` (`userId` ASC) VISIBLE,
  INDEX `friend_friend_idx` (`friendId` ASC) VISIBLE,
  CONSTRAINT `friend_user`
    FOREIGN KEY (`userId`)
    REFERENCES `card_game_dev`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `friend_friend`
    FOREIGN KEY (`friendId`)
    REFERENCES `card_game_dev`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`Item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`Item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `description` VARCHAR(255) NULL,
  `image` BLOB NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`Object`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`Object` (
  `hash` VARCHAR(16) NOT NULL,
  `inventoryId` INT NULL,
  `itemId` INT NOT NULL,
  PRIMARY KEY (`hash`),
  UNIQUE INDEX `hash_UNIQUE` (`hash` ASC) VISIBLE,
  INDEX `object_inventory_idx` (`inventoryId` ASC) VISIBLE,
  INDEX `object_item_idx` (`itemId` ASC) VISIBLE,
  CONSTRAINT `object_inventory`
    FOREIGN KEY (`inventoryId`)
    REFERENCES `card_game_dev`.`Inventory` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `object_item`
    FOREIGN KEY (`itemId`)
    REFERENCES `card_game_dev`.`Item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`SubInventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`SubInventory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `objectHash` VARCHAR(16) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `subinventory_object_idx` (`objectHash` ASC) VISIBLE,
  CONSTRAINT `subInventory_object`
    FOREIGN KEY (`objectHash`)
    REFERENCES `card_game_dev`.`Object` (`hash`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`SubObject`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`SubObject` (
  `subInventoryId` INT NOT NULL,
  `objectHash` VARCHAR(16) NOT NULL,
  INDEX `subobject_subinventory_idx` (`subInventoryId` ASC) VISIBLE,
  INDEX `subobject_object_idx` (`objectHash` ASC) VISIBLE,
  CONSTRAINT `subobject_deck`
    FOREIGN KEY (`subInventoryId`)
    REFERENCES `card_game_dev`.`SubInventory` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `subobject_object`
    FOREIGN KEY (`objectHash`)
    REFERENCES `card_game_dev`.`Object` (`hash`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`Type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`Type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`Card`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`Card` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `health` INT NOT NULL DEFAULT 0,
  `damage` INT NOT NULL DEFAULT 0,
  `cost` INT NOT NULL DEFAULT 0,
  `itemId` INT NOT NULL,
  `typeId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `card_item_idx` (`itemId` ASC) VISIBLE,
  INDEX `card_type_idx` (`typeId` ASC) VISIBLE,
  CONSTRAINT `card_item`
    FOREIGN KEY (`itemId`)
    REFERENCES `card_game_dev`.`Item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `card_type`
    FOREIGN KEY (`typeId`)
    REFERENCES `card_game_dev`.`Type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`Ability`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`Ability` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`CardAbility`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`CardAbility` (
  `abilityId` INT NOT NULL,
  `cardId` INT NOT NULL,
  INDEX `cardability_ability_idx` (`abilityId` ASC) VISIBLE,
  INDEX `cardability_card_idx` (`cardId` ASC) VISIBLE,
  CONSTRAINT `cardability_ability`
    FOREIGN KEY (`abilityId`)
    REFERENCES `card_game_dev`.`Ability` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `cardability_card`
    FOREIGN KEY (`cardId`)
    REFERENCES `card_game_dev`.`Card` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`Game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`Game` (
  `id` INT NOT NULL,
  `beginDate` DATETIME NOT NULL,
  `endDate` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`GameHistory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`GameHistory` (
  `gameId` INT NOT NULL,
  `userId` INT NOT NULL,
  `placement` INT NOT NULL,
  INDEX `gamehistory_user_idx` (`userId` ASC) VISIBLE,
  INDEX `gamehistory_game_idx` (`gameId` ASC) VISIBLE,
  CONSTRAINT `gamehistory_user`
    FOREIGN KEY (`userId`)
    REFERENCES `card_game_dev`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `gamehistory_game`
    FOREIGN KEY (`gameId`)
    REFERENCES `card_game_dev`.`Game` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`Marketplace`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`Marketplace` (
  `objectHash` VARCHAR(16) NOT NULL,
  `price` INT NOT NULL,
  INDEX `marketplace_object_idx` (`objectHash` ASC) VISIBLE,
  UNIQUE INDEX `objectHash_UNIQUE` (`objectHash` ASC) VISIBLE,
  CONSTRAINT `marketplace_object`
    FOREIGN KEY (`objectHash`)
    REFERENCES `card_game_dev`.`Object` (`hash`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`Deck`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`Deck` (
  `id` INT NOT NULL,
  `maxCards` INT NULL,
  `itemId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `deck_item_idx` (`itemId` ASC) VISIBLE,
  CONSTRAINT `deck_item`
    FOREIGN KEY (`itemId`)
    REFERENCES `card_game_dev`.`Item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card_game_dev`.`Pack`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`Pack` (
  `id` INT NOT NULL,
  `rarity` INT NOT NULL DEFAULT 0,
  `itemId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `pack_item_idx` (`itemId` ASC) VISIBLE,
  CONSTRAINT `pack_item`
    FOREIGN KEY (`itemId`)
    REFERENCES `card_game_dev`.`Item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `card_game_dev` ;

-- -----------------------------------------------------
-- Placeholder table for view `card_game_dev`.`UserWins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`UserWins` (`userId` INT, `wins` INT);

-- -----------------------------------------------------
-- Placeholder table for view `card_game_dev`.`UserObjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`UserObjects` (`userId` INT, `hash` INT, `name` INT, `description` INT);

-- -----------------------------------------------------
-- Placeholder table for view `card_game_dev`.`ItemCards`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`ItemCards` (`id` INT, `name` INT, `description` INT, `cardId` INT, `health` INT, `damage` INT, `cost` INT, `typeName` INT, `typeDescription` INT);

-- -----------------------------------------------------
-- Placeholder table for view `card_game_dev`.`MarketplaceItems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`MarketplaceItems` (`userId` INT, `objectHash` INT, `price` INT, `itemId` INT, `name` INT, `description` INT);

-- -----------------------------------------------------
-- Placeholder table for view `card_game_dev`.`UserTodayPlays`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`UserTodayPlays` (`userId` INT, `name` INT, `mail` INT, `password` INT, `xp` INT, `coins` INT, `plays` INT);

-- -----------------------------------------------------
-- Placeholder table for view `card_game_dev`.`FriendAccepted`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`FriendAccepted` (`userId` INT, `friendId` INT, `name` INT, `mail` INT, `password` INT, `xp` INT, `coins` INT);

-- -----------------------------------------------------
-- Placeholder table for view `card_game_dev`.`FriendInvites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`FriendInvites` (`userId` INT, `friendId` INT, `name` INT, `mail` INT, `password` INT, `xp` INT, `coins` INT);

-- -----------------------------------------------------
-- Placeholder table for view `card_game_dev`.`FriendRequests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `card_game_dev`.`FriendRequests` (`userId` INT, `friendId` INT, `name` INT, `mail` INT, `password` INT, `xp` INT, `coins` INT);

-- -----------------------------------------------------
-- View `card_game_dev`.`UserWins`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `card_game_dev`.`UserWins`;
USE `card_game_dev`;
# Get count of wins based on userId
CREATE  OR REPLACE VIEW `UserWins` AS
SELECT Self.id as userId, Other.wins FROM User as Self
LEFT JOIN (SELECT User.id, count(placement) as wins FROM User
	LEFT JOIN GameHistory ON userId = id
	WHERE placement = 1
	GROUP BY User.id) as Other ON Other.id = Self.id;

-- -----------------------------------------------------
-- View `card_game_dev`.`UserObjects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `card_game_dev`.`UserObjects`;
USE `card_game_dev`;
# Get objects belonging to a user over userId
CREATE  OR REPLACE VIEW `UserObjects` AS
SELECT User.id as userId, Object.hash, Item.name, Item.description FROM User
LEFT JOIN Inventory ON Inventory.userId = User.id
LEFT JOIN Object ON Object.inventoryId = Inventory.id
LEFT JOIN Item ON Item.id = Object.itemId;

-- -----------------------------------------------------
-- View `card_game_dev`.`ItemCards`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `card_game_dev`.`ItemCards`;
USE `card_game_dev`;
# Get item info based on cardId
CREATE  OR REPLACE VIEW `ItemCards` AS
SELECT Item.id, Item.name, Item.description, Card.id as cardId, Card.health, Card.damage, Card.cost, Type.name as typeName, Type.name as typeDescription FROM Card
INNER JOIN Type ON Type.id = Card.typeId
LEFT JOIN Item ON Item.id = Card.itemId;

-- -----------------------------------------------------
-- View `card_game_dev`.`MarketplaceItems`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `card_game_dev`.`MarketplaceItems`;
USE `card_game_dev`;
# Get all marketplace infos from an object with objectHash
CREATE  OR REPLACE VIEW `MarketplaceItems` AS
SELECT User.id as userId, Object.hash as objectHash, Marketplace.price, Item.id as itemId, Item.name, Item.description FROM Marketplace
LEFT JOIN Object ON Object.hash = Marketplace.objectHash
INNER JOIN Item ON Item.id = Object.itemId
LEFT JOIN Inventory ON Inventory.id = Object.inventoryId
LEFT JOIN User ON User.id = Inventory.userId;

-- -----------------------------------------------------
-- View `card_game_dev`.`UserTodayPlays`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `card_game_dev`.`UserTodayPlays`;
USE `card_game_dev`;
# Get count of todays played games
CREATE  OR REPLACE VIEW `UserTodayPlays` AS
SELECT Self.id as userId, Self.name, Self.mail, Self.password, Self.xp, Self.coins, Other.plays FROM User AS Self
LEFT JOIN (SELECT User.id, count(*) as plays FROM User
	LEFT JOIN GameHistory ON GameHistory.userId = User.id
    LEFT JOIN Game ON Game.id = GameHistory.gameId
	WHERE DATE(Game.beginDate) = CURDATE()
	GROUP BY User.id) as Other ON Other.id = Self.id;

-- -----------------------------------------------------
-- View `card_game_dev`.`FriendAccepted`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `card_game_dev`.`FriendAccepted`;
USE `card_game_dev`;
# Get all accepted friends of userId
CREATE  OR REPLACE VIEW `FriendAccepted` AS
SELECT Self.*, User.name, User.mail, User.password, User.xp, User.coins FROM Friend AS Self
INNER JOIN Friend AS Other ON Other.userId = Self.friendId AND Other.friendId = Self.userId
LEFT JOIN User ON User.id = Self.friendId;

-- -----------------------------------------------------
-- View `card_game_dev`.`FriendInvites`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `card_game_dev`.`FriendInvites`;
USE `card_game_dev`;
# Get all invitations send by userId
CREATE  OR REPLACE VIEW `FriendInvites` AS
SELECT Self.*, User.name, User.mail, User.password, User.xp, User.coins FROM Friend AS Self
LEFT JOIN Friend AS Other ON Other.userId = Self.friendId AND Other.friendId = Self.userId
LEFT JOIN User ON User.id = Self.friendId
WHERE Other.userId IS NULL;

-- -----------------------------------------------------
-- View `card_game_dev`.`FriendRequests`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `card_game_dev`.`FriendRequests`;
USE `card_game_dev`;
# Get all friend requests for userId
CREATE  OR REPLACE VIEW `FriendRequests` AS
SELECT Self.friendId as userId, Self.userId as friendId, User.name, User.mail, User.password, User.xp, User.coins FROM Friend AS Self
LEFT JOIN Friend AS Other ON Other.userId = Self.friendId AND Other.friendId = Self.userId
LEFT JOIN User ON User.id = Self.userId
WHERE Other.userId IS NULL;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `card_game_dev`.`User`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`User` (`id`, `name`, `mail`, `password`, `xp`, `coins`) VALUES (1, 'albert', 'albert@example.com', '123456', DEFAULT, DEFAULT);
INSERT INTO `card_game_dev`.`User` (`id`, `name`, `mail`, `password`, `xp`, `coins`) VALUES (2, 'xXSlayer_69Xx', 'mats.fischer@example.com', 'test123', DEFAULT, DEFAULT);
INSERT INTO `card_game_dev`.`User` (`id`, `name`, `mail`, `password`, `xp`, `coins`) VALUES (3, 'another_user', 'user@example.com', 'user123', DEFAULT, DEFAULT);
INSERT INTO `card_game_dev`.`User` (`id`, `name`, `mail`, `password`, `xp`, `coins`) VALUES (4, 'bananenmann', 'b@nane.com', 'pommes123', DEFAULT, DEFAULT);
INSERT INTO `card_game_dev`.`User` (`id`, `name`, `mail`, `password`, `xp`, `coins`) VALUES (5, 'styx', 'styx@lm.ao', 'pommes12', DEFAULT, DEFAULT);
INSERT INTO `card_game_dev`.`User` (`id`, `name`, `mail`, `password`, `xp`, `coins`) VALUES (6, '13ene', 'i3ene@nano-insel.io', 'ichliebemeinemama', DEFAULT, DEFAULT);
INSERT INTO `card_game_dev`.`User` (`id`, `name`, `mail`, `password`, `xp`, `coins`) VALUES (7, 'bafr8', 'b@fr.eight', 'mechanicalKeyboard99', DEFAULT, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`Inventory`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`Inventory` (`id`, `userId`) VALUES (1, 1);
INSERT INTO `card_game_dev`.`Inventory` (`id`, `userId`) VALUES (2, 2);
INSERT INTO `card_game_dev`.`Inventory` (`id`, `userId`) VALUES (3, NULL);
INSERT INTO `card_game_dev`.`Inventory` (`id`, `userId`) VALUES (4, 3);
INSERT INTO `card_game_dev`.`Inventory` (`id`, `userId`) VALUES (5, 4);
INSERT INTO `card_game_dev`.`Inventory` (`id`, `userId`) VALUES (6, 5);
INSERT INTO `card_game_dev`.`Inventory` (`id`, `userId`) VALUES (7, 6);
INSERT INTO `card_game_dev`.`Inventory` (`id`, `userId`) VALUES (8, 7);

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`Friend`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`Friend` (`userId`, `friendId`) VALUES (1, 2);
INSERT INTO `card_game_dev`.`Friend` (`userId`, `friendId`) VALUES (2, 1);
INSERT INTO `card_game_dev`.`Friend` (`userId`, `friendId`) VALUES (3, 4);
INSERT INTO `card_game_dev`.`Friend` (`userId`, `friendId`) VALUES (5, 1);
INSERT INTO `card_game_dev`.`Friend` (`userId`, `friendId`) VALUES (6, 7);
INSERT INTO `card_game_dev`.`Friend` (`userId`, `friendId`) VALUES (7, 6);
INSERT INTO `card_game_dev`.`Friend` (`userId`, `friendId`) VALUES (2, 5);
INSERT INTO `card_game_dev`.`Friend` (`userId`, `friendId`) VALUES (5, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`Item`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (1, 'Card1', 'This is an example card', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (2, 'Card2', 'Another example card', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (3, 'Deck1', 'This is a deck of cards (max32)', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (4, 'Booster', 'A generic item', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (5, 'Card3', 'Lol', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (6, 'Card4', 'Card for testing', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (7, 'Antrax the destroyer', 'Rain hellfire', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (8, 'Sphinx', 'The sun godess', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (9, 'Card6', 'Most powerfull being in the universe', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (10, 'Poltergeist', 'A disturbing demon', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (11, 'Megalodon', 'A giant shark', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (12, 'Dolphin', 'A cute fish', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (13, 'Detroit', 'A powerfull steam machine', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (14, 'Mountainwind', 'Noisy wind flying through the mountains', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (15, 'TestDeck', NULL, NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (16, 'Ocean Deck', 'Water creatures', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (17, 'Human Deck', 'Humans', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (18, 'Deck2', 'Deck', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (19, 'SilverPack', 'Card Pack', NULL);
INSERT INTO `card_game_dev`.`Item` (`id`, `name`, `description`, `image`) VALUES (20, 'GoldPack', 'Rare Card Pack', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`Object`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('920524352BCB7C93', 1, 1);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('BF8953C522FA7B78', 1, 2);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('ECE73E5E4A068E17', 1, 3);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('2AEFD6D9CB8C87EB', 2, 1);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('76797BDE2F02D454', 3, 4);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('1VQVT93D9PK4YM8A', 5, 15);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('YYRMB3UGAHLCHDUR', 6, 16);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('2XRKB6T35O1Y5GIM', 7, 17);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('8P2M0K74HEFP1BPT', 8, 18);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('JKYI0A78U88MKRIZ', 5, 5);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('KEKTVS4WH70D8WOT', 5, 6);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('9W9V6XY5FLLORITK', 5, 7);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('BDTYOH5WGVRPSFLY', 6, 11);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('29EVPMAQYJ5LDYH3', 6, 12);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('3M5D8Y1ZP1P5JYGZ', 7, 8);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('OFDW7NTNKS99151V', 7, 9);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('3DHIG4W31GNJ294Q', 7, 13);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('FQO4TE05WL5MZPJH', 8, 10);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('T7VD4PW412BI5WL1', 8, 14);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('8PLE5F33DJHNYSYC', 5, 6);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('774E9O4C3MKCNSNH', 5, 6);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('Z3LUG8RZP4UGDGCU', 5, 6);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('F4QGLK40V77OLSUO', 8, 7);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('G3PT0LXXVSFN3G6K', 6, 8);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('62FX0LM81TYRDJ7G', 6, 14);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('58QUXLCI4NXAA0C0', 7, 11);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('Y8IXNVNA1L4SB4KO', 7, 11);
INSERT INTO `card_game_dev`.`Object` (`hash`, `inventoryId`, `itemId`) VALUES ('UA8LHFVBIP70M9U8', 7, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`SubInventory`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`SubInventory` (`id`, `objectHash`) VALUES (1, 'ECE73E5E4A068E17');
INSERT INTO `card_game_dev`.`SubInventory` (`id`, `objectHash`) VALUES (2, '1VQVT93D9PK4YM8A');
INSERT INTO `card_game_dev`.`SubInventory` (`id`, `objectHash`) VALUES (3, 'YYRMB3UGAHLCHDUR');
INSERT INTO `card_game_dev`.`SubInventory` (`id`, `objectHash`) VALUES (4, '2XRKB6T35O1Y5GIM');
INSERT INTO `card_game_dev`.`SubInventory` (`id`, `objectHash`) VALUES (5, '8P2M0K74HEFP1BPT');

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`SubObject`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`SubObject` (`subInventoryId`, `objectHash`) VALUES (1, '920524352BCB7C93');
INSERT INTO `card_game_dev`.`SubObject` (`subInventoryId`, `objectHash`) VALUES (1, 'BF8953C522FA7B78');
INSERT INTO `card_game_dev`.`SubObject` (`subInventoryId`, `objectHash`) VALUES (2, 'JKYI0A78U88MKRIZ');
INSERT INTO `card_game_dev`.`SubObject` (`subInventoryId`, `objectHash`) VALUES (2, 'KEKTVS4WH70D8WOT');
INSERT INTO `card_game_dev`.`SubObject` (`subInventoryId`, `objectHash`) VALUES (2, '9W9V6XY5FLLORITK');
INSERT INTO `card_game_dev`.`SubObject` (`subInventoryId`, `objectHash`) VALUES (3, 'BDTYOH5WGVRPSFLY');
INSERT INTO `card_game_dev`.`SubObject` (`subInventoryId`, `objectHash`) VALUES (3, '29EVPMAQYJ5LDYH3');
INSERT INTO `card_game_dev`.`SubObject` (`subInventoryId`, `objectHash`) VALUES (4, '3M5D8Y1ZP1P5JYGZ');
INSERT INTO `card_game_dev`.`SubObject` (`subInventoryId`, `objectHash`) VALUES (4, 'OFDW7NTNKS99151V');
INSERT INTO `card_game_dev`.`SubObject` (`subInventoryId`, `objectHash`) VALUES (4, '3DHIG4W31GNJ294Q');
INSERT INTO `card_game_dev`.`SubObject` (`subInventoryId`, `objectHash`) VALUES (5, 'FQO4TE05WL5MZPJH');
INSERT INTO `card_game_dev`.`SubObject` (`subInventoryId`, `objectHash`) VALUES (5, 'T7VD4PW412BI5WL1');

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`Type`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`Type` (`id`, `name`, `description`) VALUES (1, 'Creature', 'A description of the type');
INSERT INTO `card_game_dev`.`Type` (`id`, `name`, `description`) VALUES (2, 'Humanoid', NULL);
INSERT INTO `card_game_dev`.`Type` (`id`, `name`, `description`) VALUES (3, 'Ghost', 'A metaphysical being');
INSERT INTO `card_game_dev`.`Type` (`id`, `name`, `description`) VALUES (4, 'Machine', NULL);
INSERT INTO `card_game_dev`.`Type` (`id`, `name`, `description`) VALUES (5, 'Element', 'A force of nature');

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`Card`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`Card` (`id`, `health`, `damage`, `cost`, `itemId`, `typeId`) VALUES (1, 3, 2, DEFAULT, 1, 1);
INSERT INTO `card_game_dev`.`Card` (`id`, `health`, `damage`, `cost`, `itemId`, `typeId`) VALUES (2, 1, 4, 2, 2, 2);
INSERT INTO `card_game_dev`.`Card` (`id`, `health`, `damage`, `cost`, `itemId`, `typeId`) VALUES (3, 2, 2, 2, 5, 1);
INSERT INTO `card_game_dev`.`Card` (`id`, `health`, `damage`, `cost`, `itemId`, `typeId`) VALUES (4, 1, 1, 1, 6, 1);
INSERT INTO `card_game_dev`.`Card` (`id`, `health`, `damage`, `cost`, `itemId`, `typeId`) VALUES (5, 5, 6, 8, 7, 2);
INSERT INTO `card_game_dev`.`Card` (`id`, `health`, `damage`, `cost`, `itemId`, `typeId`) VALUES (6, 7, 0, 8, 8, 1);
INSERT INTO `card_game_dev`.`Card` (`id`, `health`, `damage`, `cost`, `itemId`, `typeId`) VALUES (7, 0, 0, 0, 9, 1);
INSERT INTO `card_game_dev`.`Card` (`id`, `health`, `damage`, `cost`, `itemId`, `typeId`) VALUES (8, 3, 1, 2, 10, 3);
INSERT INTO `card_game_dev`.`Card` (`id`, `health`, `damage`, `cost`, `itemId`, `typeId`) VALUES (9, 6, 6, 9, 11, 1);
INSERT INTO `card_game_dev`.`Card` (`id`, `health`, `damage`, `cost`, `itemId`, `typeId`) VALUES (10, 1, 10, 8, 12, 1);
INSERT INTO `card_game_dev`.`Card` (`id`, `health`, `damage`, `cost`, `itemId`, `typeId`) VALUES (11, 8, 0, 7, 13, 4);
INSERT INTO `card_game_dev`.`Card` (`id`, `health`, `damage`, `cost`, `itemId`, `typeId`) VALUES (12, 0, 4, 3, 14, 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`Ability`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`Ability` (`id`, `name`, `description`) VALUES (1, 'Deflect', 'Deflect a single attack');
INSERT INTO `card_game_dev`.`Ability` (`id`, `name`, `description`) VALUES (2, 'Extinguish', 'Immune to fire');
INSERT INTO `card_game_dev`.`Ability` (`id`, `name`, `description`) VALUES (3, 'Regeneration', 'Heals 1 health every round');
INSERT INTO `card_game_dev`.`Ability` (`id`, `name`, `description`) VALUES (4, 'Omnipresence', 'Deflect attacks on all lanes');
INSERT INTO `card_game_dev`.`Ability` (`id`, `name`, `description`) VALUES (5, 'Pacifist', 'Cant attack until damage taken');
INSERT INTO `card_game_dev`.`Ability` (`id`, `name`, `description`) VALUES (6, 'Translucent', 'Cant take damage through fights');
INSERT INTO `card_game_dev`.`Ability` (`id`, `name`, `description`) VALUES (7, 'Locate', 'Can deal 1 damage to selected enemy');

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`CardAbility`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (1, 1);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (2, 1);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (1, 2);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (3, 2);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (3, 4);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (7, 5);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (3, 5);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (4, 6);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (1, 7);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (2, 7);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (3, 7);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (4, 7);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (5, 7);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (6, 7);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (7, 7);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (6, 8);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (1, 9);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (4, 9);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (5, 10);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (2, 11);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (4, 11);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (4, 12);
INSERT INTO `card_game_dev`.`CardAbility` (`abilityId`, `cardId`) VALUES (6, 12);

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`Game`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`Game` (`id`, `beginDate`, `endDate`) VALUES (1, '2023-05-20 13:17:17', '2023-05-20 13:39:21');
INSERT INTO `card_game_dev`.`Game` (`id`, `beginDate`, `endDate`) VALUES (2, '2023-05-20 13:41:01', '2023-05-20 13:47:03');
INSERT INTO `card_game_dev`.`Game` (`id`, `beginDate`, `endDate`) VALUES (3, '2023-05-23 16:14:19', '2023-05-23 16:28:59');
INSERT INTO `card_game_dev`.`Game` (`id`, `beginDate`, `endDate`) VALUES (4, '2023-05-23 16:59:12', '2023-05-23 17:09:33');
INSERT INTO `card_game_dev`.`Game` (`id`, `beginDate`, `endDate`) VALUES (5, '2023-05-23 20:21:52', '2023-05-23 20:29:29');

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`GameHistory`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`GameHistory` (`gameId`, `userId`, `placement`) VALUES (1, 1, 2);
INSERT INTO `card_game_dev`.`GameHistory` (`gameId`, `userId`, `placement`) VALUES (1, 2, 1);
INSERT INTO `card_game_dev`.`GameHistory` (`gameId`, `userId`, `placement`) VALUES (2, 1, 2);
INSERT INTO `card_game_dev`.`GameHistory` (`gameId`, `userId`, `placement`) VALUES (2, 2, 1);
INSERT INTO `card_game_dev`.`GameHistory` (`gameId`, `userId`, `placement`) VALUES (3, 4, 2);
INSERT INTO `card_game_dev`.`GameHistory` (`gameId`, `userId`, `placement`) VALUES (3, 5, 1);
INSERT INTO `card_game_dev`.`GameHistory` (`gameId`, `userId`, `placement`) VALUES (3, 6, 3);
INSERT INTO `card_game_dev`.`GameHistory` (`gameId`, `userId`, `placement`) VALUES (4, 1, 1);
INSERT INTO `card_game_dev`.`GameHistory` (`gameId`, `userId`, `placement`) VALUES (4, 7, 2);
INSERT INTO `card_game_dev`.`GameHistory` (`gameId`, `userId`, `placement`) VALUES (5, 5, 2);
INSERT INTO `card_game_dev`.`GameHistory` (`gameId`, `userId`, `placement`) VALUES (5, 2, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`Marketplace`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`Marketplace` (`objectHash`, `price`) VALUES ('774E9O4C3MKCNSNH', 1);
INSERT INTO `card_game_dev`.`Marketplace` (`objectHash`, `price`) VALUES ('Z3LUG8RZP4UGDGCU', 1);
INSERT INTO `card_game_dev`.`Marketplace` (`objectHash`, `price`) VALUES ('Y8IXNVNA1L4SB4KO', 11);
INSERT INTO `card_game_dev`.`Marketplace` (`objectHash`, `price`) VALUES ('BF8953C522FA7B78', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`Deck`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`Deck` (`id`, `maxCards`, `itemId`) VALUES (1, 32, 3);
INSERT INTO `card_game_dev`.`Deck` (`id`, `maxCards`, `itemId`) VALUES (2, NULL, 16);
INSERT INTO `card_game_dev`.`Deck` (`id`, `maxCards`, `itemId`) VALUES (3, 16, 17);
INSERT INTO `card_game_dev`.`Deck` (`id`, `maxCards`, `itemId`) VALUES (4, 40, 18);

COMMIT;


-- -----------------------------------------------------
-- Data for table `card_game_dev`.`Pack`
-- -----------------------------------------------------
START TRANSACTION;
USE `card_game_dev`;
INSERT INTO `card_game_dev`.`Pack` (`id`, `rarity`, `itemId`) VALUES (1, DEFAULT, 19);
INSERT INTO `card_game_dev`.`Pack` (`id`, `rarity`, `itemId`) VALUES (2, 1, 20);

COMMIT;


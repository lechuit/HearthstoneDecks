CREATE TABLE cards (
  cardId INTEGER UNIQUE,
  cardSet TEXT,
  faction TEXT,
  text TEXT,
  playerClass TEXT,
  type TEXT,
  PRIMARY KEY(cardId)
);

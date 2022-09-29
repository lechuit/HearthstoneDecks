CREATE TABLE IF NOT EXISTS cards
(
  cardId
  TEXT
  UNIQUE,
  name_
  TEXT,
  cardSet
  TEXT,
  faction
  TEXT,
  img
  TEXT,
  playerClass
  TEXT,
  type_
  TEXT,
  PRIMARY
  KEY
(
  cardId
)
  );

CREATE TABLE IF NOT EXISTS deck
(
  deckId INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
  deckName
  TEXT
);

CREATE TABLE IF NOT EXISTS deckCards
(
  deckId
  INTEGER,
  cardId
  TEXT,
  amount
  INTEGER
)

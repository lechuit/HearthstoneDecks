CREATE TABLE IF NOT EXISTS cards (
  cardId TEXT UNIQUE,
  cardSet TEXT,
  faction TEXT,
  text TEXT,
  playerClass TEXT,
  type TEXT,
  PRIMARY KEY(cardId)
);

CREATE TABLE IF NOT EXISTS deck (
  deckId INTEGER UNIQUE,
  deckName TEXT,
  PRIMARY KEY(deckId)
);

CREATE TABLE IF NOT EXISTS deckCards(
  deckId INTEGER,
  cardId TEXT,
)

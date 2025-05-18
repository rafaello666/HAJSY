CREATE TABLE expenses (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  amount    REAL    NOT NULL,
  category  TEXT    NOT NULL,
  note      TEXT,
  ts        TEXT    NOT NULL DEFAULT (datetime('now'))
);

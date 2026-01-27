const Database = require('better-sqlite3');
const db = new Database('./local.db');

console.log('Creating payment_methods table if not exists...');
db.exec(`
  CREATE TABLE IF NOT EXISTS payment_methods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userEmail TEXT NOT NULL,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    last4 TEXT,
    accountNumber TEXT,
    expiryDate TEXT,
    isDefault BOOLEAN DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
console.log('Done.');

console.log('Verifying tables...');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log(tables);

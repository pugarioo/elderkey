const Database = require('better-sqlite3');
const path = require('path');

// Go up one level to root to find local.db
const dbPath = path.join(__dirname, '..', 'local.db');
const db = new Database(dbPath, { readonly: true });

console.log('Tables:');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log(tables);

tables.forEach(table => {
    console.log(`\nSchema for ${table.name}:`);
    const columns = db.prepare(`PRAGMA table_info(${table.name})`).all();
    console.log(columns);

    console.log(`\nFirst 5 rows of ${table.name}:`);
    const rows = db.prepare(`SELECT * FROM ${table.name} LIMIT 5`).all();
    console.log(rows);
});

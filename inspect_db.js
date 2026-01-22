const Database = require('better-sqlite3');
const db = new Database('./local.db', { readonly: true });

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

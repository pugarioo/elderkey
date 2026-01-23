import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'local.db');

export function getPartners() {
    const db = new Database(dbPath, { readonly: true });
    try {
        return db.prepare('SELECT * FROM partners').all();
    } catch (error) {
        console.error("Error fetching partners:", error);
        return [];
    }
}

export function getPartner(id) {
    const db = new Database(dbPath, { readonly: true });
    try {
        return db.prepare('SELECT * FROM partners WHERE id = ?').get(id);
    } catch (error) {
        console.error("Error fetching partner:", error);
        return null;
    }
}

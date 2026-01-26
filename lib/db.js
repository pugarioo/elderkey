import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'local.db');

// Initialize database with users table
const db = new Database(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    mobileNo TEXT NOT NULL,
    birthDate TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    plan TEXT NOT NULL DEFAULT 'Bronze',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export function createUser(user) {
    const db = new Database(dbPath);
    try {
        const stmt = db.prepare(`
            INSERT INTO users (firstName, lastName, email, mobileNo, birthDate, username, password, plan)
            VALUES (@firstName, @lastName, @email, @mobileNo, @birthDate, @username, @password, @plan)
        `);
        const info = stmt.run(user);
        return { id: info.lastInsertRowid, ...user };
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export function getUserByEmail(email) {
    const db = new Database(dbPath, { readonly: true });
    try {
        return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }
}

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

import Database from 'better-sqlite3';
import path from 'path';
import './seed.js';

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
    seniorId TEXT,
    termsAccepted BOOLEAN DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS payment_methods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userEmail TEXT NOT NULL,
    type TEXT NOT NULL, -- 'card' or 'wallet'
    provider TEXT NOT NULL, -- 'Visa', 'Mastercard', 'GCash', 'Maya'
    last4 TEXT, -- For cards
    accountNumber TEXT, -- For wallets (masked)
    expiryDate TEXT, -- MM/YY for cards
    isDefault BOOLEAN DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userEmail TEXT NOT NULL,
    amount REAL NOT NULL,
    plan TEXT NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT DEFAULT 'SUCCESS',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);



export function createUser(user) {
    const db = new Database(dbPath);
    try {
        const stmt = db.prepare(`
            INSERT INTO users (firstName, lastName, email, mobileNo, birthDate, username, password, plan, seniorId, termsAccepted)
            VALUES (@firstName, @lastName, @email, @mobileNo, @birthDate, @username, @password, @plan, @seniorId, @termsAccepted)
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

export function getUserByUsername(username) {
    const db = new Database(dbPath, { readonly: true });
    try {
        return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    } catch (error) {
        console.error("Error fetching user by username:", error);
        return null;
    }
}

export function getUserByIdentifier(identifier) {
    const db = new Database(dbPath, { readonly: true });
    try {
        return db.prepare('SELECT * FROM users WHERE email = ? OR username = ? OR mobileNo = ?').get(identifier, identifier, identifier);
    } catch (error) {
        console.error("Error fetching user by identifier:", error);
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

export function updateUserPlan(email, newPlan) {
    const db = new Database(dbPath);
    try {
        const stmt = db.prepare('UPDATE users SET plan = ? WHERE email = ?');
        const info = stmt.run(newPlan, email);
        return info.changes > 0;
    } catch (error) {
        console.error("Error updating user plan:", error);
        throw error;
    }
}

export function createPayment(payment) {
    const db = new Database(dbPath);
    try {
        const stmt = db.prepare(`
            INSERT INTO payments (userEmail, amount, plan, currency, status)
            VALUES (@userEmail, @amount, @plan, @currency, @status)
        `);
        const info = stmt.run({
            userEmail: payment.userEmail,
            amount: payment.amount,
            plan: payment.plan,
            currency: payment.currency || 'USD',
            status: payment.status || 'SUCCESS'
        });
        return { id: info.lastInsertRowid, ...payment };
    } catch (error) {
        console.error("Error creating payment:", error);
        throw error;
    }
}

export function getPaymentsByUser(email) {
    const db = new Database(dbPath, { readonly: true });
    try {
        return db.prepare('SELECT * FROM payments WHERE userEmail = ? ORDER BY createdAt DESC').all(email);
    } catch (error) {
        console.error("Error fetching payments:", error);
        return [];
    }
}

// Payment Method Helpers
export function addPaymentMethod(method) {
    const db = new Database(dbPath);
    try {
        // If setting as default, unset others first
        if (method.isDefault) {
            db.prepare('UPDATE payment_methods SET isDefault = 0 WHERE userEmail = ?').run(method.userEmail);
        }

        const stmt = db.prepare(`
            INSERT INTO payment_methods (userEmail, type, provider, last4, accountNumber, expiryDate, isDefault)
            VALUES (@userEmail, @type, @provider, @last4, @accountNumber, @expiryDate, @isDefault)
        `);

        const info = stmt.run({
            userEmail: method.userEmail,
            type: method.type,
            provider: method.provider,
            last4: method.last4 || null,
            accountNumber: method.accountNumber || null,
            expiryDate: method.expiryDate || null,
            isDefault: method.isDefault ? 1 : 0
        });
        return { id: info.lastInsertRowid, ...method };
    } catch (error) {
        console.error("Error adding payment method:", error);
        throw error;
    }
}

export function getPaymentMethods(email) {
    const db = new Database(dbPath, { readonly: true });
    try {
        return db.prepare('SELECT * FROM payment_methods WHERE userEmail = ? ORDER BY isDefault DESC, createdAt DESC').all(email);
    } catch (error) {
        console.error("Error fetching payment methods:", error);
        return [];
    }
}

export function deletePaymentMethod(id, email) {
    const db = new Database(dbPath);
    try {
        const info = db.prepare('DELETE FROM payment_methods WHERE id = ? AND userEmail = ?').run(id, email);
        return info.changes > 0;
    } catch (error) {
        console.error("Error deleting payment method:", error);
        throw error;
    }
}

export function setDefaultPaymentMethod(id, email) {
    const db = new Database(dbPath);
    const setAllZero = db.prepare('UPDATE payment_methods SET isDefault = 0 WHERE userEmail = ?');
    const setOneOne = db.prepare('UPDATE payment_methods SET isDefault = 1 WHERE id = ? AND userEmail = ?');

    const transaction = db.transaction((id, email) => {
        setAllZero.run(email);
        const info = setOneOne.run(id, email);
        return info.changes > 0;
    });

    try {
        return transaction(id, email);
    } catch (error) {
        console.error("Error setting default payment method:", error);
        throw error;
    }
}

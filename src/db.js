import { openDB } from 'idb';

const dbPromise = openDB('financeDB', 1, {
    upgrade(db) {
        db.createObjectStore('records', { keyPath: 'id', autoIncrement: true });
    },
});

export async function saveRecordToDB(record) {
    const db = await dbPromise;
    await db.add('records', record);
}

export async function fetchRecordsFromDB() {
    const db = await dbPromise;
    return await db.getAll('records');
}
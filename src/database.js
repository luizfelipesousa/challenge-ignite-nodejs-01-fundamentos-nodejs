import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath)
            .then(data => {
                this.#database = JSON.parse(data);
            })
            .catch(() => {
                this.#persist();
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(table) {
        const data = this.#database[table] ?? [];
        return data;
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {

            this.#database[table].push(data);

        } else {
            this.#database[table] = [data];
        }

        this.#persist();
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id);

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
            return true;
        }

        return false;
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id == id);

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { ...this.#database[table][rowIndex], updated_at: new Date(), ...data };
            this.#persist();
            return this.#database[table][rowIndex];
        }

        return false;
    }
}

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("notes");

db.execSync(
  `
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        body TEXT,
        type TEXT NOT NULL,
        isFavorite INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY NOT NULL,
        itemId INTEGER NOT NULL,
        title TEXT NOT NULL,
        done INTEGER NOT NULL DEFAULT 0
    );
    `
);
export const addToItems = async (title, body, type = "note") => {
  await db.runAsync(
    `INSERT INTO items (title, body, type) VALUES (?,?,?)`, [title, body, type]
  );
};

export const getItems = async () => {
  const result = await db.getAllAsync(`SELECT * FROM items;`);
  // console.log(result);
  return result;
};

export const editNote = async (id, title, body) => {
  await db.runAsync(
    `UPDATE items SET title = ?, body = ? WHERE id = ?;`, [title, body, id]
  );
};

export const deleteAllItems = async () => {
  await db.runAsync(`DELETE FROM items;`); // Delete all notes
  await db.runAsync(`DELETE FROM tasks;`); // Delete all tasks
};

export const addTask = async (listId, title) => {
  await db.runAsync(
    `INSERT INTO tasks (listId, title) VALUES (? , ?);`, [listId, title]
  );
}

export const getTasks = async (id) => {
  const result = await db.getAllAsync(`SELECT * FROM tasks WHERE listId = ?;`, [id]);
  return result;
}

export const editTaskList = async (id, title) => {
  await db.runAsync(
    `UPDATE items SET title = ? WHERE id = ?;`, [title, id]
  );
}

export const isItDone = async (id) => {
  const result = await db.getAsync(`SELECT done FROM tasks WHERE id = ?;`, [id]);
  return result;
}
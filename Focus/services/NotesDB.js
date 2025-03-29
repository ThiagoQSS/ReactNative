import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("notes");

db.execSync(
  `
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL
    );
    `
);
export const addToNotes = async (title, body) => {
  await db.execAsync(
    `INSERT INTO notes (title, body) VALUES ('${title}', '${body}');`
  );
};

export const getNotes = async () => {
  const result = await db.getAllAsync(`SELECT * FROM notes;`);
  console.log(result);
  return result;
};

export const editNote = async (id, title, body) => {
  await db.runAsync(
    `UPDATE notes SET title = ?, body =? WHERE id = ?;`, [title, body, id]
  );
};

export const deleteAllNotes = async () => {
  await db.execAsync(`DELETE FROM notes;`); // Delete all notes
};

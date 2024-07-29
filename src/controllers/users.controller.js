import { pool } from "../bd.js";

export const getUsers = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM USERS");
  return res.json(rows);
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const { rows } = await pool.query(`SELECT * FROM USERS WHERE id = ${id}`);
  if (rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(rows[0]);
};

export const createUser = async (req, res) => {
  const user = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO USERS (name, email) VALUES ('${user.name}', '${user.email}') RETURNING *`
    );
    console.log(rows);
    return res.json(rows[0]);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query(
    `DELETE FROM USERS WHERE id = ${id} RETURNING *`
  );
  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.sendStatus(204);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  const { rows } = await pool.query(
    `UPDATE USERS SET name = '${user.name}', email = '${user.email}' WHERE id = ${id} RETURNING *`
  );
  res.json(rows[0]);
};

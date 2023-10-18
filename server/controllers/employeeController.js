const mysql = require("mysql2");
require("dotenv").config();
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
console.log("heeel");
//view employe
exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    console.log("COnnected as ID" + connection.threadId);
    connection.query("SELECT * FROM employees", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from employee table:, \n", rows);
    });
  });
};

exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    let searchTerm = req.body.search;

    console.log("COnnected as ID" + connection.threadId);
    connection.query(
      "SELECT * FROM employees WHERE full_name LIKE ?",
      ["%" + searchTerm + "%"],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
        console.log("The data from employee table:, \n", rows);
      }
    );
  });
};
exports.form = (req, res) => {
  res.render("add-employee");
};
exports.create = (req, res) => {
  const {
    full_name,
    job_title,
    phone_number,
    email,
    primary_contact,
    primary_number,
    primary_relation,
    secondary_contact,
    secondary_number,
    secondary_relation,
    employeescol,
  } = req.body;
  const status = "Active";
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "INSERT INTO `employee_management_system_infoware`.`employees` (`full_name`, `job_title`, `phone_number`, `email`, `primary_contact`, `primary_number`, `primary_relation`, `secondary_contact`, `secondary_number`, `secondary_relation`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)",

      [
        full_name,
        job_title,
        phone_number,
        email,
        primary_contact,
        primary_number,
        primary_relation,
        secondary_contact,
        secondary_number,
        secondary_relation,
        status,
      ],
      (err, rows) => {
        if (!err) {
          res.render("add-employee", { alert: "User added successfully." });
        } else {
          console.log(err);
        }
        console.log("The data from user table: \n", rows);
      }
    );
  });
};

exports.edit = (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      "SELECT * FROM employees WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (!err) {
          res.render("edit-employee", { rows });
        } else {
          console.log(err);
        }
        console.log("The data from user table: \n", rows);
      }
    );
  });
};

// Update User
exports.update = (req, res) => {
  const {
    full_name,
    job_title,
    phone_number,
    email,
    primary_contact,
    primary_number,
    primary_relation,
    secondary_contact,
    secondary_number,
    secondary_relation,
    employeescol,
  } = req.body;
  const status = "Active";
  // User the connection
  pool.getConnection((err, connection) => {
    connection.query(
      "UPDATE employees SET full_name = ?, job_title = ?, phone_number = ?, email = ?, primary_contact = ?, primary_number = ? , primary_relation = ? , secondary_contact = ? , secondary_number = ? , secondary_relation = ? , status = ? WHERE (id = ?)",
      [
        full_name,
        job_title,
        phone_number,
        email,
        primary_contact,
        primary_number,
        primary_relation,
        secondary_contact,
        secondary_number,
        secondary_relation,
        status,
        req.params.id,
      ],
      (err, rows) => {
        if (!err) {
          // User the connection
          connection.query(
            "SELECT * FROM employees WHERE id = ?",
            [req.params.id],
            (err, rows) => {
              if (!err) {
                res.render("edit-employee", {
                  rows,
                  alert: `${full_name} has been updated.`,
                });
              } else {
                console.log(err);
              }
              console.log("The data from user table: \n", rows);
            }
          );
        } else {
          console.log(err);
        }
        console.log("The data from user table: \n", rows);
      }
    );
  });
};

exports.delete = (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(
      "DELETE FROM `employee_management_system_infoware`.`employees` WHERE (id = ?)",
      [req.params.id],
      (err, rows) => {
        if (!err) {
          res.redirect("/");
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.viewall = (req, res) => {
  // User the connection
  pool.getConnection((err, connection) => {
    connection.query(
      "SELECT * FROM employees WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (!err) {
          res.render("view-employee", { rows });
        } else {
          console.log(err);
        }
        console.log("The data from user table: \n", rows);
      }
    );
  });
};

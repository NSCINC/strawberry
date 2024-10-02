import sqlite3
import csv
import os

DB_URL = 'investments.db'

def main():
    initialize_database()
    read_csv_data('investors_data.csv')

# Initialize the database and create tables
def initialize_database():
    create_investors_table = """
    CREATE TABLE IF NOT EXISTS Investors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone_number TEXT NOT NULL
    );"""

    create_assets_table = """
    CREATE TABLE IF NOT EXISTS Assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        asset_name TEXT NOT NULL,
        asset_type TEXT NOT NULL,
        total_slots INTEGER NOT NULL,
        annual_return REAL NOT NULL
    );"""

    create_investments_table = """
    CREATE TABLE IF NOT EXISTS Investments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        investor_id INTEGER,
        asset_id INTEGER,
        invested_amount REAL,
        FOREIGN KEY(investor_id) REFERENCES Investors(id),
        FOREIGN KEY(asset_id) REFERENCES Assets(id)
    );"""

    try:
        with sqlite3.connect(DB_URL) as conn:
            cursor = conn.cursor()
            # Execute the SQL statements
            cursor.execute(create_investors_table)
            cursor.execute(create_assets_table)
            cursor.execute(create_investments_table)
            conn.commit()
            print("Database and tables initialized successfully.")
    except sqlite3.Error as e:
        print(f"SQL error: {e}")

# Read investor data from a CSV file and print it
def read_csv_data(file_path):
    if not os.path.exists(file_path):
        print(f"Could not find the file: {file_path}")
        return

    try:
        with open(file_path, mode='r') as csvfile:
            csvreader = csv.reader(csvfile)
            for row in csvreader:
                if len(row) >= 3:
                    name = row[0].strip()
                    email = row[1].strip()
                    phone = row[2].strip()
                    print(f"Name: {name}, Email: {email}, Phone: {phone}")

                    # Here you can insert data into the database
                    # Example:
                    # insert_investor(name, email, phone)
    except Exception as e:
        print(f"Could not open file: {e}")

# Uncomment and implement this method to insert investor data into the database
"""
def insert_investor(name, email, phone):
    insert_investor_sql = "INSERT INTO Investors (name, email, phone_number) VALUES (?, ?, ?)"
    try:
        with sqlite3.connect(DB_URL) as conn:
            cursor = conn.cursor()
            cursor.execute(insert_investor_sql, (name, email, phone))
            conn.commit()
    except sqlite3.Error as e:
        print(f"SQL error: {e}")
"""

if __name__ == '__main__':
    main()

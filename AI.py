import sqlite3
import csv

# Classe para lidar com investidores
class Investor:
    def __init__(self, name, email, phone_number):
        self.name = name
        self.email = email
        self.phone_number = phone_number

    def __repr__(self):
        return f"Investor({self.name}, {self.email}, {self.phone_number})"


# Classe para lidar com o banco de dados SQLite
class InvestorDatabase:
    def __init__(self, db_file):
        self.db_file = db_file
        self.conn = self.connect()
        self.initialize_database()

    # Conectar ao banco de dados
    def connect(self):
        try:
            conn = sqlite3.connect(self.db_file)
            print(f"Conectado ao banco de dados {self.db_file}")
            return conn
        except sqlite3.Error as e:
            print(f"Erro ao conectar ao banco: {e}")
        return None

    # Inicializar tabela de investidores
    def initialize_database(self):
        create_table_sql = """
        CREATE TABLE IF NOT EXISTS Investors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone_number TEXT NOT NULL
        );
        """
        try:
            cursor = self.conn.cursor()
            cursor.execute(create_table_sql)
            self.conn.commit()
        except sqlite3.Error as e:
            print(f"Erro ao criar tabela: {e}")

    # Inserir investidores no banco
    def insert_investor(self, investor):
        insert_sql = "INSERT INTO Investors(name, email, phone_number) VALUES(?, ?, ?)"
        try:
            cursor = self.conn.cursor()
            cursor.execute(insert_sql, (investor.name, investor.email, investor.phone_number))
            self.conn.commit()
        except sqlite3.Error as e:
            print(f"Erro ao inserir investidor: {e}")

    # Ler dados de um arquivo CSV e inserir no banco
    def read_csv_data(self, file_path):
        try:
            with open(file_path, 'r') as csv_file:
                csv_reader = csv.reader(csv_file)
                for row in csv_reader:
                    investor = Investor(row[0], row[1], row[2])
                    self.insert_investor(investor)
                print("Dados inseridos com sucesso.")
        except Exception as e:
            print(f"Erro ao ler o arquivo CSV: {e}")


if __name__ == "__main__":
    # Criação do banco de dados e leitura dos dados CSV
    db = InvestorDatabase("sea_lake_investments.db")
    db.read_csv_data("investors_data.csv")

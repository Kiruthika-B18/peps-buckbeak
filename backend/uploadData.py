import pandas as pd
from pymongo import MongoClient
import os
from dotenv import load_dotenv
try:
	# Load environment variables from .env
	load_dotenv()
	mongo_uri = os.getenv("MONGO_URI")
	if not mongo_uri:
		raise Exception("MONGO_URI not found in .env file.")
	# Use the database name from the URI, or default to 'buckbeak'
	db_name = mongo_uri.split("/")[-1].split("?")[0] if mongo_uri else "buckbeak"

	# 1️⃣ Read the datasets (Excel/CSV)
	worker_details = pd.read_excel("worker_details.xlsx")
	worker_attendance = pd.read_excel("worker_attendance.xlsx")
	production_details = pd.read_excel("production_details.xlsx")
	order_data = pd.read_excel("order_data.xlsx")
	material_inventory = pd.read_excel("material_inventory.xlsx")

	# 2️⃣ Connect to MongoDB using URI from .env
	client = MongoClient(mongo_uri)
	db = client[db_name]

	# 3️⃣ Store datasets as collections
	db.worker_details.delete_many({})
	if not worker_details.empty:
		db.worker_details.insert_many(worker_details.to_dict("records"))

	db.worker_attendance.delete_many({})
	if not worker_attendance.empty:
		db.worker_attendance.insert_many(worker_attendance.to_dict("records"))

	db.production_details.delete_many({})
	if not production_details.empty:
		db.production_details.insert_many(production_details.to_dict("records"))

	db.order_data.delete_many({})
	if not order_data.empty:
		db.order_data.insert_many(order_data.to_dict("records"))

	db.material_inventory.delete_many({})
	if not material_inventory.empty:
		db.material_inventory.insert_many(material_inventory.to_dict("records"))

	print(f"\n✅ All datasets stored successfully in MongoDB '{db_name}' database")
except Exception as e:
	print(f"❌ Error occurred: {e}")

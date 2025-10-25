# from pymongo import MongoClient
# import pandas as pd

# # Your MongoDB Atlas connection string
# uri = "mongodb+srv://support_db_user:jXRh8Tj5eUh0bMlv@cluster0.laq8ugt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# client = MongoClient(uri)

# # Access the database and collection
# db = client["bullgains"]
# collection = db["queries"]  # Replace with your actual collection name

# # Fetch all documents
# data = list(collection.find())

# if not data:
#     print("No data found in MongoDB collection.")
# else:
#     # Convert _id (ObjectId) to string for Excel readability
#     for d in data:
#         d["_id"] = str(d["_id"])

#     # Convert MongoDB documents to DataFrame
#     df = pd.DataFrame(data)

#     # Export to Excel sheet
#     df.to_excel("Bullgains_Queries.xlsx", index=False)

#     print("✅ Data exported successfully to 'Bullgains_Queries.xlsx'")

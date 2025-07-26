import pandas as pd
from pymongo import MongoClient
import numpy as np

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["ecommerce_db"]

# CSV mapping to collections
collections = {
    "distribution_centers": "data/distribution_centers.csv",
    "inventory_items": "data/inventory_items.csv",
    "order_items": "data/order_items.csv",
    "orders": "data/orders.csv",
    "products": "data/products.csv",
    "users": "data/users.csv"
}

# Fix function: handles datetime + NaT errors
def clean_dataframe(df):
    for col in df.columns:
        # If column looks like a date/time field
        if any(word in col.lower() for word in ["date", "at", "created", "shipped", "returned", "delivered"]):
            try:
                df[col] = pd.to_datetime(df[col], errors='coerce')
                df[col] = df[col].apply(lambda x: x.to_pydatetime() if pd.notnull(x) else None)
            except Exception as e:
                print(f"⚠️ Could not convert {col} to datetime: {e}")
    # Convert NaN/NaT/nulls to None for MongoDB compatibility
    df = df.replace({np.nan: None, pd.NaT: None})
    return df

# Load and insert into MongoDB
for name, path in collections.items():
    print(f"⏳ Inserting '{name}' from {path}")
    try:
        df = pd.read_csv(path)
        df = clean_dataframe(df)
        records = df.to_dict(orient="records")
        db[name].delete_many({})  # Optional: clear previous
        db[name].insert_many(records)
        print(f"✅ Inserted {len(records)} records into '{name}' collection.")
    except Exception as e:
        print(f"❌ Failed to insert '{name}': {e}")

print("\n🎉 All CSV files processed successfully.")

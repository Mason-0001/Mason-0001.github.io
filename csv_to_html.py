import os
import pandas as pd

# Get the current working directory
cwd = os.getcwd()

# Define the relative file path to the CSV file
rel_path = "Personal-Repo/Web-Design-Challenge/Resources/cities.csv"

# Join the current working directory and the relative file path to get the absolute file path
abs_path = os.path.join(cwd, rel_path)

# Read CSV file
cities_df = pd.read_csv(abs_path)

# Convert DataFrame to HTML table
cities_html = cities_df.to_html(classes="table table-striped", index=False)

# Write HTML table to file
with open("cities.html", "w") as f:
    f.write(cities_html)

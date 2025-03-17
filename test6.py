import re
import pandas as pd

import pdfplumber

pdf_path = "test6.pdf"  

with pdfplumber.open(pdf_path) as pdf:
    text = "\n".join(page.extract_text() for page in pdf.pages if page.extract_text())



# Initialize list to store extracted table data
data = []

# Define regex pattern to detect table rows
pattern = re.compile(r"(\d{2}\.\w{3}\.\d{4})\s+(\d{2}\.\w{3}\.\d{4})\s+([\w\d]+)\s+([\d,]+)\s*(\d+)?")

# Process each line in OCR text
for line in text:
    match = pattern.search(line)
    if match:
        transaction_date = match.group(1)
        value_date = match.group(2)
        reference = match.group(3)
        amount = match.group(4).replace(",", "")  # Remove commas from numbers
        
        # Ignore extra columns like branch number if they exist
        data.append([transaction_date, value_date, reference, amount])

# Create DataFrame
df = pd.DataFrame(data, columns=["Transaction Date", "Value Date", "Reference", "Amount"])

# Save to Excel
df.to_excel("Extracted_Table 2.xlsx", index=False)

print("Data extracted and saved to 'Extracted_Table.xlsx' successfully!")

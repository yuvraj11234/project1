
 Objective
This tool extracts tabular data from system-generated PDFs without using **Tabula, Camelot, or image conversion** and saves the data as an Excel file.

Features
- Extracts structured financial transaction tables from PDFs.  
- Works with PDFs that have **borderless or irregular** tables.  
- Saves extracted tables to **Excel (.xlsx) format**.  

Installation
Make sure you have **Python 3.7+** installed. Then, install the required libraries:
```bash
pip install pymupdf pandas openpyxl pdfplumber


## SeperateForText6 is used for text extraction instead of table extraction as pdf text6 includes scanned images
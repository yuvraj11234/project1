import fitz  # PyMuPDF
import pandas as pd
import re

def extract_transactions_from_pdf(pdf_path, excel_path):
    """Extracts transaction tables from a bank statement PDF with unstructured tables."""
    doc = fitz.open(pdf_path)
    transactions = []

    # Regular expression to detect transaction rows (Date - Amount - Balance)
    transaction_pattern = re.compile(r'(\d{2}-[A-Za-z]{3}-\d{4})\s+([TC])\s+(.*?)\s+([\d,]+\.\d{2})\s+([\d,]+\.\d{2}[A-Za-z]*)')

    for page in doc:
        text = page.get_text("text")  # Extract text
        for match in transaction_pattern.findall(text):
            date, trans_type, description, amount, balance = match
            transactions.append([date, trans_type, description.strip(), amount, balance])

    if not transactions:
        print("⚠️ No transactions found in the document.")
        return

    # Convert extracted transactions to a DataFrame
    df = pd.DataFrame(transactions, columns=["Date", "Type", "Description", "Amount", "Balance"])

    # Save DataFrame to Excel
    df.to_excel(excel_path, index=False)

    print(f" Transactions extracted and saved to {excel_path}")

# Example Usage
pdf_path = "test3.pdf"  # Ensure the correct file name
excel_path = "Extracted_Transactions General.xlsx"

extract_transactions_from_pdf(pdf_path, excel_path)


# Finance Manager: Your Personal Finance Tracking Tool

Finance Manager is a lightweight, privacy-focused application designed to help you manage your finances effortlessly. With a focus on user data security and privacy, this project encrypts all data stored locally, ensuring complete control over your sensitive financial information.

## Features

1. **Privacy-Focused**  
   - No external databases or servers are used.  
   - All data is stored locally in the user's browser using encrypted local storage.

2. **Secure Data Encryption**  
   - AES encryption is used to secure all stored data.  
   - Your financial records remain private and accessible only to you.

3. **Intuitive Interface**  
   - Simple and user-friendly UI for seamless tracking of expenses and income.  
   - Features like category-based expense filtering and graphical representation of financial data.

4. **Lightweight and Accessible**  
   - Works entirely within the browser—no installation or server setup needed.  
   - Cross-platform support, accessible on any device with a modern web browser.

---

## How It Works

### 1. **Data Storage**  
   - All financial records (income, expenses, categories, and totals) are stored in the browser's local storage.  
   - This ensures the application functions offline and removes reliance on external services.

### 2. **Data Encryption**  
   - Every piece of data stored in the local storage is encrypted using the **AES (Advanced Encryption Standard)**.  
   - Upon entering data, it is encrypted before being saved and decrypted only when displayed to the user.

### 3. **Privacy-Centric Design**  
   - No personal information or financial data is shared with third parties.  
   - The entire application runs locally, leaving no digital footprint.

---

## Installation & Usage

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, etc.).

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/finance-manager.git
   cd finance-manager
   ```
2. Open the `index.html` file in your browser to launch the application.  
3. Start adding income and expenses to track your finances.

---

## Key Features

### **1. Dashboard**
   - Overview of total income, expenses, and balance.  
   - Dynamic updates based on your inputs.

### **2. Add Transactions**  
   - Categorize income and expenses.  
   - Set descriptions and amounts to keep detailed records.

### **3. Encrypted Storage**  
   - All transaction data is encrypted using **AES-256** before being saved in local storage.  
   - Prevents unauthorized access even if local storage is manually accessed.

### **4. Graphical Representation**  
   - View expense trends and category-wise spending with easy-to-understand graphs.

### **5. Offline Availability**  
   - Fully functional offline.  
   - Works as a progressive web app (PWA) when saved to your device.

---

## Technologies Used

- **HTML5**: Structuring the web application.  
- **CSS3**: Styling for an intuitive and modern UI.  
- **JavaScript**: Dynamic interactivity and core functionality.  
- **AES.js**: Data encryption library.

---

## Limitations
1. **No Multi-User Support**  
   - Currently designed for single-user use.  
   - All data is specific to the device and browser it is accessed from.

2. **Device-Specific Storage**  
   - Data stored in local storage is device-specific. Switching devices will not retain previous data.

---

## Roadmap

- Add **multi-user support** with optional cloud storage for data sync.  
- Include budget planning and alerts for overspending.  
- Enhance encryption methods to integrate with hardware security modules (HSM).

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Security & Privacy Statement

This project prioritize your privacy. No external servers or databases are used. All data remains on your device, and encryption ensures that even if unauthorized access occurs, your data stays secure.

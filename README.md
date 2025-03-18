# Spot & Tango | Refurbished Computer Store WebApp

## Overview
This project is a simple e-commerce webpage designed for Spot & Tango, a refurbished computer store. Customers can browse available products, add them to their shopping cart, and manage their selections.

## Tech Stack
- HTML
- CSS
- JavaScript

## Data Source
Product data is fetched from the following JSON endpoint:
- [Product Data](https://s3.us-east-1.amazonaws.com/assets.spotandtango/products.json)

## Features
- **Display Product Listings**: Fetch and display all available products with their details, including Name, Category, MSRP (original price), and Sales Price.
- **Unavailable Products Handling**: Show a "Sold Out" indicator for products that are unavailable.
- **Shopping Cart Functionality**: 
  - Add multiple products to the cart.
  - Choose quantities for each item.
  - Dynamically update the total cost as items are added.
  - Show a cart summary listing selected items.
  - Allow users to remove items from the cart or empty the cart entirely.
- **Category Filter**: Filter products by category (Laptop, Tablet, Mobile, Accessory).
- **Responsive Design**: The layout adjusts to different screen sizes for a better user experience.

## Installation
1. Clone the repository: https://github.com/ragasree30/Refurbished_Computer_Store_WebApp.git
   ```bash
   git clone [repository-url]
2. Open the project folder in your preferred code editor.
3. Open index.html in a web browser.
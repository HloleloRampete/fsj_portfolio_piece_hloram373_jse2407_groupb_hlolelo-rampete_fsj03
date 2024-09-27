# E-Commerce Product Display
## Introduction
Welcome to the E-Commerce Product Display project! This application is designed to display a list of products fetched from an external API. It allows users to browse, navigate through multiple product pages, and view product details with ease. The project features a server-side rendered grid of products with pagination, detailed product views, error handling, and friendly error messages for any failed requests. Additionally, the app is responsive and optimized for seamless user experience across devices.

## This project meets the following criteria:

Fetch the first 20 products and paginate through the next set of 20 products per page.
Display product images, titles, prices, categories, and more in a visually appealing grid format.
Provide a detailed view of individual products, including description, price, availability, and reviews.
Handle errors and display friendly error messages.
Implement loading states and ensure server-side rendering for performance.
Features
Product List Display: Fetches and displays the first 20 products with pagination controls.
Product Detail Page: Shows detailed information for each product, including a gallery for multiple images, reviews, and availability.
Pagination: Users can navigate through different pages to view more products. The app URL updates to reflect the current page.
Error Handling: Friendly error messages are shown if product fetching fails.
Loading States: Displays a loading spinner while fetching product data.
Responsive Design: Ensures the application works well on all devices.
Server-Side Rendering: All product data is rendered on the server for better performance.
Technologies Used
Next.js: Framework for server-side rendering and React-based development.
React.js: JavaScript library for building user interfaces.
Tailwind CSS: Utility-first CSS framework for styling and responsive design.
JavaScript/ES6+: Core programming language used in the project.
Fetch API: Used for making HTTP requests to fetch products.
HTML5 & CSS3: Used for structuring and styling the web pages.
Vercel API (Next E-Commerce API): External API for fetching product data.
Project Setup Instructions
Prerequisites
## To run this project, ensure that you have the following installed:

Node.js (v14 or higher)
npm (v6 or higher) or yarn for package management.
Installation
Clone the Repository

bash
Copy code
git clone https://github.com/your-username/ecommerce-product-display.git
Navigate to the Project Directory

bash
Copy code
cd ecommerce-product-display
Install Dependencies Use npm or yarn to install the required packages.

bash
Copy code
npm install


bash
Copy code
npm run dev
or


## Project Structure
/pages: Contains the Next.js pages for product listing and product details.
/components: Reusable components like the product grid, product card, pagination controls, and the loading spinner.
/lib/products/api.js: API file that handles fetching product data.
/styles: Contains the global styles and custom Tailwind configuration.
## Usage Examples
### Product Listing Page
Upon visiting the home page (http://localhost:3000), users will see a grid displaying the first 20 products. Each product card displays:

Product Image
Product Title
Price
Category
The pagination controls allow users to navigate to the next set of products. When a new page is loaded, the URL updates accordingly.

### Product Detail Page
Clicking on any product will take the user to the product detail page (/products/[id]), where they will see:

A large image or gallery of images (if multiple images exist).
Product Title, Description, Price, and Category.
Product Tags, Stock Availability, and Rating.
Customer Reviews (including the reviewer's name, date, rating, and comment).
Error Handling
If the product list or detail data fails to load (e.g., due to network issues or an invalid product), a friendly error message will be displayed. This ensures the user is informed without breaking the experience.

### Pagination
The pagination component allows users to navigate through multiple pages of products. The app fetches only the necessary product data for the current page and displays 20 products per page.

### Error Handling & Loading States
Loading State: A loading spinner is displayed while the product data is being fetched.
Error Messages: If there is an error during data fetching, users will see a clear error message prompting them to retry or check back later.
Future Enhancements
Implement infinite scrolling for a smoother user experience.
Add product filtering options (by category, price range, etc.).
Enhance the user review section by allowing users to submit their own reviews.
Improve accessibility for users with disabilities by adding ARIA attributes and keyboard navigation support.
### Conclusion
This project demonstrates a well-rounded e-commerce product display application built using modern web technologies like Next.js and Tailwind CSS. The focus on user experience, server-side rendering, and error handling ensures that users can browse and view products seamlessly, regardless of device or connection speed.

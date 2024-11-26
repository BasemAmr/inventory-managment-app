# Inventory Management App

An Inventory Management application comprising a server and a client, designed to streamline product management, sales tracking, and expense monitoring. This project serves as a foundation for further integration into real-world applications, providing essential features that can be expanded upon to suit specific business needs.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Server Setup](#server-setup)
  - [Environment Configuration](#environment-configuration-server)
  - [Running the Server](#running-the-server)
- [Client Setup](#client-setup)
  - [Environment Configuration](#environment-configuration-client)
  - [Running the Client](#running-the-client)
- [Integration](#integration)
- [Skills Learned](#skills-learned)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## Features
- **Product Management**: CRUD operations for managing products.
- **User Management**: Handle user data and permissions.
- **Sales and Purchases Tracking**: Monitor sales and purchase records.
- **Expense Monitoring**: Keep track of expenses by category.
- **Dashboard Metrics**: Visual representation of key metrics.

## Technologies Used

### Server
- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for building APIs.
- **Prisma**: ORM for database interactions.
- **MongoDB**: Database for development and testing.
- **TypeScript**: Typed superset of JavaScript.
- **dotenv**: Manage environment variables.
- **Helmet**: Security middleware.
- **Cors**: Enable CORS.
- **Morgan**: HTTP request logger.

### Client
- **Next.js**: React framework with hybrid static & server rendering.
- **React**: JavaScript library for building user interfaces.
- **Redux Toolkit**: State management.
- **TypeScript**: Typed superset of JavaScript.
- **Tailwind CSS**: Utility-first CSS framework.
- **RTK Query**: Promise-based HTTP client.
- **Chart Libraries**: Data visualization.

## Getting Started

### Prerequisites
- Node.js v14 or higher
- npm v6 or higher
- Git for version control

### Installation
1. Clone the repository:
```bash
git clone https://github.com/BasemAmr/inventory-management-app.git
```

2. Navigate to the project directory:
```bash
cd inventory-management-app
```

## Server Setup

### Environment Configuration (Server)
Create a `.env` file in the server directory and add the following:
```env
DATABASE_URL=" "
PORT=3001
```
*Adjust the DATABASE_URL if using a different database.*

### Running the Server
1. Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

2. Seed the database:
```bash
npm run seed
```

3. Start the server in development mode:
```bash
npm run dev
```
*The server will run on http://localhost:3001.*

## Client Setup

### Environment Configuration (Client)
Create a `.env.local` file in the client directory and add the following:
```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"
```
*Adjust the NEXT_PUBLIC_API_BASE_URL if the server is running on a different host or port.*

### Running the Client
1. Navigate to the client directory and install dependencies:
```bash
cd client
npm install
```

2. Start the client in development mode:
```bash
npm run dev
```
*The client will run on http://localhost:3000.*

## Integration
This application can be integrated into a larger ecosystem by:
- Connecting to a production-grade database.
- Implementing authentication and authorization.
- Integrating with third-party services (e.g., payment gateways).
- Scaling the server with clustering or deploying to cloud platforms.

## Skills Learned
- Full-stack development with React and Node.js.
- State management using Redux Toolkit.
- Building RESTful APIs with Express.
- Database modeling and querying with Prisma.
- Styling with Tailwind CSS.
- Data visualization with chart libraries.
- Managing environment variables and project configurations.

## Future Enhancements
- **Authentication**: Implement user authentication and role-based access control.
- **Testing**: Add unit and integration tests.
- **Performance Optimization**: Improve load times and optimize database queries.
- **Documentation**: Expand documentation for API endpoints and components.
- **UI/UX Improvements**: Enhance the user interface and experience.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.

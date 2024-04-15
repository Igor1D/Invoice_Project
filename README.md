# Invoice Management Application

This application provides a solution for managing invoices. It includes the ability to create, read, update, and delete (CRUD) invoices. The frontend is built with React and Material-UI for a responsive user interface, while the backend (not included in this snippet) would typically involve a server and database to handle data persistence.

## Design

The user interface design for this Invoice Management Application was based on Figma design files provided by [Frontend Mentor](https://www.frontendmentor.io).

## Features

- **View All Invoices**: A comprehensive list of all invoices with status indicators and essential details.
- **Create New Invoices**: Intuitive forms to add new invoices to the system.
- **Invoice Details**: View detailed information for each invoice, including items, totals, taxes, and client information.
- **Edit Invoices**: Modify existing invoices and immediately view the updates.
- **Delete Invoices**: Remove invoices from the system when they are no longer needed.
- **Responsive Design**: Adapts to various screen sizes from desktops to mobile devices.

## Backend Simulation

For the purposes of development and testing, this application uses a "fake" REST API JSON server to simulate backend functionality. This allows for full CRUD capabilities without the need for a live backend environment.

## Components

- `AllInvoices`: Displays all the invoices and handles the layout for different screen sizes.
- `NewInvoice`: Allows the creation of new invoices through a form interface.
- `InvoiceInfo`: Provides detailed views for individual invoices.
- `Home`: The main landing page that aggregates the components and displays invoices.
- `SpanningTable`: A component to display line items of an invoice with subtotal, taxes, and total.

The application should now be running and accessible at: https://invoice-project-six.vercel.app/

## Technologies Used

- React.js
- Material-UI
- Moment.js for date formatting
- React Router for routing
- Figma design files from [Frontend Mentor](https://www.frontendmentor.io)
- Fake REST API JSON server for backend simulation

## Project Management

Throughout the development of this application, [JIRA](https://www.atlassian.com/software/jira) was utilized for task tracking and agile project management. This helped in organizing the development tasks, tracking progress, and maintaining a steady development workflow.

## Contact

If you have any questions or would like to contact the developers, please https://github.com/Igor1D on GitHub.
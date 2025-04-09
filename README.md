Home Crafter - Multi-Vendor Home Service Web Application

Overview

Home Crafter is a comprehensive multi-vendor platform designed to facilitate home service bookings. With distinct roles for users, providers, and admins, the platform allows users to seamlessly book services, manage their favorites, and leave reviews. Providers can offer services, manage their schedule, and track their business performance through a personalized dashboard. Admins can oversee the entire system, ensuring a smooth user experience and provider management.

Features

Responsive Layout: Optimized for all devices, ensuring a smooth user experience on mobile, tablet, and desktop.

Multi-Role Dashboard: Separate dashboards for Users, Providers, and Admins with role-specific functionalities.

Service Booking System: Users can book services with time slot selection and make secure payments via the integrated SslCommerz gateway.

Service Review System: Users can leave reviews for services and providers, enhancing credibility and feedback.

Favorites Management: Users can bookmark favorite services and view them later.

Blog System: Providers can create and manage blog posts, while users can comment and engage.
Provider Dashboard: Providers can manage their services, offers, availability, and combo packs, with real-time statistics on bookings and earnings.

Admin Management: Admins oversee provider approvals, user and review management, and general platform operations.

Email Notifications: Providers receive emails upon approval or rejection, and users receive email notifications for password resets.

Service Search & Filters: Efficient service search, with filters for reviews, ratings, and pagination to easily navigate services.

Dynamic Sections: Additional, related services, similar articles, latest news, and testimonials sections with pagination.

Contact Admin: Users can send messages directly to the admin via the contact page.

Photo Gallery: Service detail pages showcase service images in an engaging, user-friendly gallery.

Accessibility: Features designed to ensure usability for all users.



Technology Stack

Frontend: TypeScript, Next.js,Tailwind, Redux-Toolkit, Axios, HookForm, Yup 

Backend: Express.js,Zod Prisma ,JWT

Authentication: NextAuth.js, JWT Token for session management

Database: Prisma ORM with a relational database (PostgreSQL)

File Storage: Cloudinary for image and media file uploads

Payment Gateway: SslCommerz integration for secure transactions

Email Service: NodeMailer, EmailJS for sending email notifications 

Hosting: Vercel for frontend hosting, backend deployment



Challenges

During the development process, several challenges were encountered and addressed:

Day-wise Slot Creation & Deletion: Implementing a system where providers can create, manage, and delete service slots based on available days was a complex task. This required efficient handling of availability in the database and ensuring flexibility for providers to update schedules on the go.

Combo Pack Service Database Design: Structuring the database to handle combo services (where multiple services are bundled together) proved challenging, as it required creating relationships between individual services, ensuring accurate pricing, and seamless management in the provider dashboard.

Service Creation & Update: Developing the functionality for providers to create and update services involved managing complex forms, validation, and ensuring real-time updates without disrupting the user experience.

Service Details Page - Photo Gallery Design: Designing a user-friendly, responsive photo gallery on service detail pages was tricky, as it required balancing aesthetics with performance, especially when handling multiple images.

Testimonial Slider Design: Creating an interactive, visually appealing testimonial slider while keeping it fully responsive across all device sizes took several iterations to get right, especially with animation and layout synchronization.

On Offer Services Display: Effectively displaying "On Offer" services required implementing dynamic discount calculations and real-time updates, especially when providers could modify offers frequently.

Provider Dashboard - Statistics Section: One of the most challenging aspects was showing real-time statistics, including the last 7 days’ earnings on the provider dashboard. This involved creating a robust backend API to fetch and process booking and payment data in real-time.

Multiple Image Upload: Allowing providers to upload multiple images for their services while ensuring smooth uploads, validations, and preview functionality required both front-end and back-end optimization.

Service Rating Filter on Backend API: Implementing a backend API that could efficiently filter services based on ratings was tricky, as it required the creation of indexes and optimized queries to ensure fast performance even with large datasets.

Future Improvements
Enhance Provider Statistics: Improve the dashboard to show detailed, customizable statistics such as month-wise and year-wise earnings.
User Notifications: Implement push notifications for users to get real-time updates on booking statuses and promotions.
AI-based Service Recommendations: Incorporate machine learning models to recommend services to users based on their previous bookings and preferences.




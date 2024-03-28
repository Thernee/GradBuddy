// Define swaggerDoc schemas for users, schools, scholarships, criteria, and favorites

// User schema
/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       required:
 *         - user_id
 *         - username
 *         - email
 *         - hashed_password
 *         - fullname
 *       properties:
 *         user_id:
 *           type: UUID
 *           description: User id
 *         username:
 *           type: string
 *           description: Username unique to each user
 *         email:
 *           type: string
 *           description: User Email
 *         hashed_password:
 *           type: hashed password
 *           description: Hashed password stored in DB
 *         fullname:
 *           type: string
 *           description: Full name of user
 *         nationality:
 *           type: string
 *           description: Nationality of user
 *       example:
 *         user_id: 12
 *         username: "saniAbu"
 *         email: "kSjWdexample.com"
 *         hashed_password: "$2b$10$4i9Dj3Zg9bYB3w6kL2NQ4eJ9Q1S1Qv3I0xNz6p2Zx0V7VdO7G7D"
 *         fullname: "Sani Abubakar Adam"
 *         nationality: "Nigeria"
 */
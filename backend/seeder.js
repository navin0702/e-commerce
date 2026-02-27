/*
  Run this file with `node seeder.js` to create a default admin user
  Make sure environment variables are loaded (e.g., `node -r dotenv/config seeder.js`)
*/
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existing = await Admin.findOne({ username: 'admin' });
    if (existing) {
      console.log('Admin already exists');
      process.exit();
    }

    await Admin.create({ username: 'admin', password: 'password123' });
    console.log('Admin user created with username=admin password=password123');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
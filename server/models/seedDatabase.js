import mongoose from 'mongoose';
import User from './models/User.js';
import Item from './models/Item.js';
import SwapRequest from './models/SwapRequest.js';
import bcryptjs from 'bcryptjs';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  const users = [
    {
      name: 'Sarah Martinez',
      email: 'sarah@example.com',
      password: await bcryptjs.hash('password123', 12),
      profile: {
        bio: 'Fashion enthusiast who loves sustainable clothing',
        location: { city: 'New York', state: 'NY', country: 'US' },
        preferences: {
          categories: ['clothing', 'accessories'],
          sizes: ['S', 'M']
        }
      },
      points: 150
    },
    {
      name: 'Emma Johnson',
      email: 'emma@example.com',
      password: await bcryptjs.hash('password123', 12),
      profile: {
        bio: 'Vintage clothing collector and eco-friendly fashion advocate',
        location: { city: 'Los Angeles', state: 'CA', country: 'US' },
        preferences: {
          categories: ['clothing', 'shoes'],
          sizes: ['M', 'L']
        }
      },
      points: 200
    },
    {
      name: 'Alex Rodriguez',
      email: 'alex@example.com',
      password: await bcryptjs.hash('password123', 12),
      profile: {
        bio: 'Minimalist wardrobe enthusiast',
        location: { city: 'Chicago', state: 'IL', country: 'US' },
        preferences: {
          categories: ['shoes', 'accessories'],
          sizes: ['L', 'XL']
        }
      },
      points: 120
    },
    {
      name: 'Mike Thompson',
      email: 'mike@example.com',
      password: await bcryptjs.hash('password123', 12),
      profile: {
        bio: 'Outdoor gear and casual wear enthusiast',
        location: { city: 'Austin', state: 'TX', country: 'US' },
        preferences: {
          categories: ['clothing'],
          sizes: ['L', 'XL']
        }
      },
      points: 180
    }
  ];

  await User.deleteMany({});
  const createdUsers = await User.create(users);
  console.log('Users seeded successfully');
  return createdUsers;
};

const seedItems = async (users) => {
  const items = [
    {
      title: 'Vintage Denim Jacket',
      description: 'Classic vintage denim jacket from the 90s. Shows some wear but still in good condition. Perfect for layering.',
      category: 'clothing',
      type: 'jacket',
      size: 'M',
      condition: 'good',
      color: 'Blue',
      brand: "Levi's",
      tags: ['vintage', 'denim', 'casual'],
      images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'],
      owner: users[0]._id,
      location: { city: 'New York', state: 'NY', country: 'US' },
      swapPreferences: {
        lookingFor: [
          { category: 'clothing', size: 'M', description: 'Looking for sweaters or cardigans' }
        ]
      }
    },
    {
      title: 'Summer Floral Dress',
      description: 'Beautiful floral summer dress, perfect for warm weather. Lightweight and comfortable.',
      category: 'clothing',
      type: 'dress',
      size: 'S',
      condition: 'like-new',
      color: 'Pink',
      brand: 'Zara',
      tags: ['floral', 'summer', 'dress'],
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'],
      owner: users[1]._id,
      location: { city: 'Los Angeles', state: 'CA', country: 'US' },
      swapPreferences: {
        lookingFor: [
          { category: 'clothing', size: 'S', description: 'Looking for winter coats' }
        ]
      }
    },
    {
      title: 'Classic Black Boots',
      description: 'Comfortable black leather boots, great for any occasion. Barely worn.',
      category: 'shoes',
      type: 'boots',
      size: '8',
      condition: 'like-new',
      color: 'Black',
      brand: 'Dr. Martens',
      tags: ['leather', 'boots', 'classic'],
      images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400'],
      owner: users[2]._id,
      location: { city: 'Chicago', state: 'IL', country: 'US' },
      swapPreferences: {
        lookingFor: [
          { category: 'shoes', size: '8', description: 'Looking for sneakers' }
        ]
      }
    },
    {
      title: 'Cozy Knit Sweater',
      description: 'Soft knit sweater in excellent condition. Perfect for chilly days.',
      category: 'clothing',
      type: 'sweater',
      size: 'L',
      condition: 'like-new',
      color: 'Cream',
      brand: 'H&M',
      tags: ['knit', 'sweater', 'cozy'],
      images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400'],
      owner: users[3]._id,
      location: { city: 'Austin', state: 'TX', country: 'US' },
      swapPreferences: {
        lookingFor: [
          { category: 'clothing', size: 'L', description: 'Looking for jeans or pants' }
        ]
      }
    },
    {
      title: 'High-Waisted Jeans',
      description: 'Trendy high-waisted jeans with slight wear. Great fit and comfortable.',
      category: 'clothing',
      type: 'jeans',
      size: 'M',
      condition: 'good',
      color: 'Blue',
      brand: 'American Eagle',
      tags: ['jeans', 'high-waisted', 'denim'],
      images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400'],
      owner: users[0]._id,
      location: { city: 'New York', state: 'NY', country: 'US' },
      swapPreferences: {
        lookingFor: [
          { category: 'clothing', size: 'M', description: 'Looking for skirts or dresses' }
        ]
      }
    },
    {
      title: 'Designer Handbag',
      description: 'Elegant leather handbag with beautiful pattern. Rarely used.',
      category: 'bags',
      type: 'handbag',
      size: 'One Size',
      condition: 'like-new',
      color: 'Brown',
      brand: 'Coach',
      tags: ['leather', 'handbag', 'designer'],
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'],
      owner: users[1]._id,
      location: { city: 'Los Angeles', state: 'CA', country: 'US' },
      swapPreferences: {
        lookingFor: [
          { category: 'bags', description: 'Looking for crossbody bags' }
        ]
      }
    }
  ];

  await Item.deleteMany({});
  const createdItems = await Item.create(items);
  console.log('Items seeded successfully');
  return createdItems;
};

const seedSwapRequests = async (users, items) => {
  const swapRequests = [
    {
      requester: users[1]._id,
      itemOwner: users[0]._id,
      requestedItem: items[0]._id, // Vintage Denim Jacket
      swapType: 'item-for-item',
      offeredItem: items[1]._id, // Summer Floral Dress
      message: 'Love your denim jacket! Would you be interested in swapping for my floral dress?',
      status: 'pending'
    },
    {
      requester: users[2]._id,
      itemOwner: users[3]._id,
      requestedItem: items[3]._id, // Cozy Knit Sweater
      swapType: 'points-for-item',
      pointsOffered: 45,
      message: 'Hi! I\'d love to get this sweater. Would you accept points for it?',
      status: 'pending'
    }
  ];

  await SwapRequest.deleteMany({});
  const createdSwapRequests = await SwapRequest.create(swapRequests);
  console.log('Swap requests seeded successfully');
  return createdSwapRequests;
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('Starting database seeding...');
    
    const users = await seedUsers();
    const items = await seedItems(users);
    const swapRequests = await seedSwapRequests(users, items);
    
    console.log('Database seeded successfully!');
    console.log(`Created ${users.length} users`);
    console.log(`Created ${items.length} items`);
    console.log(`Created ${swapRequests.length} swap requests`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();

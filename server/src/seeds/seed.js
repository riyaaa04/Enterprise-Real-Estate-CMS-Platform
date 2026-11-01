import bcrypt from 'bcryptjs';
import { StorageService } from '../services/storage.js';

export const seedInitialData = async () => {
  try {
    // 1. Seed Default Admin User
    const existingAdmin = await StorageService.getUserByEmail('admin@codenameone.com');
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('AdminPassword123!', 10);
      await StorageService.saveUser({
        name: 'Executive Portfolio Director',
        email: 'admin@codenameone.com',
        password: hashedPassword,
        role: 'superadmin'
      });
      console.log('[Seed] Admin user created: admin@codenameone.com / AdminPassword123!');
    }

    // 2. Check if Hero already exists
    const heroSection = await StorageService.getSectionByKey('hero');
    if (!heroSection) {
      // Seed Hero Section matching the exact image
      await StorageService.saveSection('hero', {
        title: 'Hero Landmark Banner',
        subtitle: 'Primary above-the-fold showcase',
        data: {
          tagBadge: '• SUBHASH NAGAR • CHEMBUR • MUMBAI | RERA REGISTERED',
          subtitle: 'CODENAME',
          mainTitle: 'One',
          locationTrack: 'CHEMBUR',
          tagline: 'Where home extends to life.',
          description: 'Ultra-luxury bespoke 3 & 4 BHK landmark residences designed for effortless grandeur and timeless tranquility.',
          primaryCtaText: 'ENQUIRE NOW',
          secondaryCtaText: 'EXPLORE RESIDENCES',
          reraNumber: 'P51800049182'
        }
      }, false, 'System');

      // Seed Signature Highlights Card
      await StorageService.saveSection('highlights', {
        title: 'Signature Highlights Glass Card',
        subtitle: 'Floating glass card with key metrics',
        data: {
          headerTitle: 'SIGNATURE ADDRESS',
          address: 'Subhash Nagar, Chembur',
          stats: [
            { id: 1, value: '40+', label: 'STOREYS ICONIC TOWER', unit: '' },
            { id: 2, value: '25K', label: 'SKY CLUBHOUSE', unit: 'SQ.FT' },
            { id: 3, value: '3 & 4', label: 'GRAND BHK SUITES', unit: '' },
            { id: 4, value: '360°', label: 'HANDCRAFTED DUSK VIEWS', unit: '' }
          ],
          footerLabel: 'Book Exclusive Site Tour',
          actionText: 'SCHEDULE >'
        }
      }, false, 'System');

      // Seed Navigation
      await StorageService.saveSection('navigation', {
        title: 'Navigation Header Bar',
        subtitle: 'Top floating pill bar',
        data: {
          brandSuper: 'CODENAME',
          brandMain: 'ONE',
          brandSub: '',
          navLinks: [
            { label: 'HOME', href: '#home', active: true },
            { label: 'PROJECT', href: '#project' },
            { label: 'CONNECTIVITY', href: '#connectivity' },
            { label: 'GALLERY', href: '#gallery' },
            { label: 'AMENITIES', href: '#amenities' },
            { label: 'RESIDENCES', href: '#residences' },
            { label: 'DEVELOPER', href: '#developer' },
            { label: 'CONTACT', href: '#contact' }
          ],
          brochureText: 'BROCHURE',
          enquireText: 'ENQUIRE NOW'
        }
      }, false, 'System');

      // Seed The Project Overview
      await StorageService.saveSection('project', {
        title: 'The Project Architectural Overview',
        subtitle: 'Curated living vision',
        data: {
          badge: 'ARCHITECTURAL MASTERPIECE',
          heading: 'An Icon Above the Chembur Skyline',
          subheading: 'Engineered for those whose aspirations know no horizon.',
          paragraph1: 'Located in Subhash Nagar, Chembur, this residential redevelopment offers a practical yet elevated living experience. Comprising 1 & 2 BHK residences in Ground-Level Commercial Spaces + 16-Story Habitational Floors, the project is planned with a strong focus on functionality and lifestyle — adding daily convenience, a modern gymnasium/fitness center, and lifestyle amenities, ensuring a well-rounded living environment for residents.',
          paragraph2: '',
          features: [
            { title: '1 & 2 BHK Residences', desc: 'Thoughtfully planned, well-ventilated residences balancing modern comfort and family functionality.' },
            { title: 'Ground-Level Commercial Spaces', desc: 'Integrated retail and commercial zones bringing daily essentials and shopping convenience right downstairs.' },
            { title: '16-Story Habitational Floors', desc: 'Elevated residential floors complemented by a contemporary gymnasium, fitness center, and lifestyle amenities.' }
          ],
          stats: [
            { value: '3.25', label: 'MILLION SQ FT ONGOING' },
            { value: '3.55', label: 'MILLION SQ FT COMPLETED' },
            { value: '2600+', label: 'HAPPY FAMILIES' }
          ]
        }
      }, false, 'System');

      // Seed Residences
      await StorageService.saveSection('residences', {
        title: 'Bespoke Residences & Floor Plans',
        subtitle: 'Luxurious 3 & 4 BHK configurations',
        data: {
          heading: 'Bespoke Configurations',
          subheading: 'Intelligently planned spaces balancing palatial entertainment and private tranquility.',
          units: [
            {
              id: '3bhk-grande',
              type: '3 BHK Grande Suite',
              carpetArea: '1,325 Sq. Ft.',
              balconyArea: '185 Sq. Ft.',
              pricing: '₹ 4.85 Cr* Onwards',
              description: 'Expansive 3-bedroom suite with Italian marble living room, dedicated powder room, and private deck.',
              features: ['Master suite with walk-in wardrobe', 'Separate utility area', 'East-facing sunrise views']
            },
            {
              id: '4bhk-palatial',
              type: '4 BHK Palatial Residence',
              carpetArea: '1,960 Sq. Ft.',
              balconyArea: '260 Sq. Ft.',
              pricing: '₹ 7.25 Cr* Onwards',
              description: 'Double master suites, formal drawing room, state-of-the-art island kitchen layout, and dual balconies.',
              features: ['Private elevator lobby access', 'Servant quarter with private entry', 'Unobstructed 360° dusk vistas']
            },
            {
              id: '4bhk-sky-villa',
              type: '4 BHK Sky Duplex Villa',
              carpetArea: '2,850 Sq. Ft.',
              balconyArea: '420 Sq. Ft.',
              pricing: 'Price on Application',
              description: 'Crown level penthouse with private double-height glass rotunda, private heated plunge pool, and sky terrace.',
              features: ['Private plunge pool & jacuzzi', 'Double-height ceiling in salon', 'Ultra-exclusive 39th & 40th levels']
            }
          ]
        }
      }, false, 'System');

      // Seed Sky Clubhouse & Amenities
      await StorageService.saveSection('amenities', {
        title: 'Sky Clubhouse & Amenities',
        subtitle: '25,000 sq.ft of curated indulgences',
        data: {
          badge: '25,000 SQ. FT. SKY CLUBHOUSE',
          heading: 'Indulgences Elevated 400 Feet High',
          subheading: 'World-class recreational amenities curated for rejuvenation and celebration.',
          categories: [
            {
              category: 'Sky Level Experiences',
              items: [
                { name: 'Sky Infinity Lap Pool', desc: 'Heated infinity edge looking out into the glittering horizon.' },
                { name: 'Dusk Observatory Deck', desc: 'Handcrafted sunset viewing deck equipped with astronomical telescope.' },
                { name: 'Sky Cigar & Wine Lounge', desc: 'Temperature-controlled sommelier cellar with plush leather seating.' }
              ]
            },
            {
              category: 'Wellness & Vitality',
              items: [
                { name: 'TechnoGym Wellness Arena', desc: 'Biometric biomechanical cardio & strength training zones.' },
                { name: 'The Obsidian Spa', desc: 'Swedish sauna, Turkish steam bath, and herbal therapy rooms.' },
                { name: 'Yoga & Zen Meditation Pavilions', desc: 'Tranquil open-air deck surrounded by vertical bamboo gardens.' }
              ]
            },
            {
              category: 'Sports & Social Club',
              items: [
                { name: 'Indoor Badminton & Squash Arena', desc: 'World-Badminton-Federation approved wooden sprung courts.' },
                { name: 'Grand Ballroom & Private Dining', desc: 'Catering kitchen and banquet capacity for 150 guests.' },
                { name: 'Children\'s Cosmic Play Hub', desc: 'Interactive digital learning and soft obstacle wonderland.' }
              ]
            }
          ]
        }
      }, false, 'System');

      // Seed Connectivity
      await StorageService.saveSection('connectivity', {
        title: 'Strategic Connectivity & Location Advantage',
        subtitle: 'Subhash Nagar, Chembur, Mumbai',
        data: {
          badge: 'PRIME CENTRAL CONNECTIVITY',
          heading: 'Minutes from Everywhere That Matters',
          subheading: 'Chembur offers effortless transit to South Mumbai, BKC, Navi Mumbai, and the International Airport.',
          hubs: [
            { name: 'BKC Business District', time: '12 Mins', route: 'Via BKC-Chembur Elevated Connector' },
            { name: 'Eastern Freeway', time: '03 Mins', route: 'Direct signal-free connectivity to Fort & Colaba' },
            { name: 'Chhatrapati Shivaji Intl Airport', time: '22 Mins', route: 'Via Santa Cruz-Chembur Link Road (SCLR)' },
            { name: 'Chembur Monorail & Metro Line 2B', time: '04 Mins', route: 'Walking transit hub connecting East to West' },
            { name: 'Bombay Presidency Golf Club', time: '06 Mins', route: 'Historic 18-hole championship golf course' },
            { name: 'Top Tier Hospitals & Schools', time: '05 Mins', route: 'Surana Sethia Hospital, The Green Acres Academy' }
          ]
        }
      }, false, 'System');

      // Seed Developer Profile
      await StorageService.saveSection('developer', {
        title: 'Developer Legacy & Heritage',
        subtitle: 'Built on uncompromising integrity',
        data: {
          badge: '38 YEARS OF ICONIC LANDMARKS',
          heading: 'Crafting Landmarks That Transcend Time',
          description: 'With four decades of architectural distinction, our developments combine timeless design, structural engineering excellence, and impeccable delivery standards.',
          metrics: [
            { value: '38+', label: 'Years of Excellence' },
            { value: '18M+', label: 'Sq. Ft. Delivered' },
            { value: '24,000+', label: 'Delighted Residents' },
            { value: '100%', label: 'RERA Compliance' }
          ],
          rera: 'MahaRERA Registration No: P51800049182 | Project available at maharera.mahaonline.gov.in'
        }
      }, false, 'System');

      // Seed Gallery
      await StorageService.saveSection('gallery', {
        title: 'Curated Visual Gallery',
        subtitle: 'Glimpse into life at Codename ONE',
        data: {
          categories: ['All', 'Architecture', 'Interiors', 'Clubhouse', 'Dusk Views'],
          images: [
            { id: 1, title: 'Iconic Dusk Tower Facade', category: 'Architecture', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80' },
            { id: 2, title: 'Grand Double-Height Living Room', category: 'Interiors', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
            { id: 3, title: '40th Floor Sky Infinity Pool', category: 'Clubhouse', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80' },
            { id: 4, title: 'Master Bedroom Private Sunset Balcony', category: 'Interiors', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80' },
            { id: 5, title: 'Subhash Nagar 360° Dusk Skyline', category: 'Dusk Views', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80' },
            { id: 6, title: 'Triple-Height Marble Arrival Portico', category: 'Architecture', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80' }
          ]
        }
      }, false, 'System');

      // Seed Sample Inquiries
      await StorageService.createInquiry({
        name: 'Vikramaditya Singhania',
        email: 'vikram.singhania@apexcapital.in',
        phone: '+91 98201 44521',
        bhkPreference: '4 BHK Palatial Residence',
        budget: '₹ 7 - 10 Cr',
        source: 'Hero CTA',
        message: 'Looking for a high floor 4 BHK facing south-west dusk view. Requesting private site presentation.',
        status: 'new'
      });

      await StorageService.createInquiry({
        name: 'Dr. Radhika Merchant',
        email: 'radhika.merchant@lilavati.org',
        phone: '+91 98199 82341',
        bhkPreference: '3 BHK Grande Suite',
        budget: '₹ 5 - 6 Cr',
        source: 'Schedule Site Tour',
        message: 'Interested in touring the show residence this upcoming Saturday afternoon.',
        status: 'scheduled',
        siteTourDate: '2026-11-07 15:30'
      });

      await StorageService.createInquiry({
        name: 'Anand Deshmukh',
        email: 'anand.deshmukh@tcs.com',
        phone: '+91 99203 11842',
        bhkPreference: '3 & 4 BHK',
        budget: '₹ 5 Cr',
        source: 'Brochure Download',
        message: 'Downloaded the project brochure. Please send payment schedule details.',
        status: 'contacted'
      });

      console.log('[Seed] All sections and sample inquiries seeded successfully.');
    }
  } catch (error) {
    console.error('[Seed] Error seeding data:', error);
  }
};

// If run directly from terminal
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  import('../config/db.js').then(async ({ connectDB }) => {
    await connectDB();
    await seedInitialData();
    process.exit(0);
  });
}


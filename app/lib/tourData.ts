export interface Tour {
  id: string;
  city: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  imageUrl: string;
}

export interface OvernightStay {
  id: string;
  city: string;
  name: string;
  description: string;
  pricePerNight: number;
  imageUrl: string;
}

export const tours: Tour[] = [
  {
    id: "t1",
    city: "Istanbul",
    name: "Hagia Sophia & Blue Mosque Tour",
    description: "Visit the iconic Hagia Sophia and Blue Mosque with an expert guide. Learn about the rich history and architecture of these magnificent structures.",
    duration: "4 hours",
    price: 45,
    imageUrl: "/images/hagia-sophia.jpg"
  },
  {
    id: "t2",
    city: "Istanbul",
    name: "Topkapi Palace Tour",
    description: "Explore the opulent Topkapi Palace, home to Ottoman sultans for 400 years. See the imperial treasury, holy relics, and stunning palace kitchens.",
    duration: "3 hours",
    price: 40,
    imageUrl: "/images/topkapi-palace.jpg"
  },
  {
    id: "t3",
    city: "Istanbul",
    name: "Grand Bazaar Shopping Tour",
    description: "Navigate the world's oldest shopping mall with a local guide. Discover authentic Turkish crafts, carpets, and jewelry.",
    duration: "3 hours",
    price: 35,
    imageUrl: "/images/grand-bazaar.jpg"
  },
  {
    id: "t4",
    city: "Cappadocia",
    name: "Hot Air Balloon Ride",
    description: "Experience the magical landscapes of Cappadocia from above in a hot air balloon at sunrise.",
    duration: "3 hours",
    price: 175,
    imageUrl: "/images/cappadocia-balloon.jpg"
  },
  {
    id: "t5",
    city: "Cappadocia",
    name: "Underground City Tour",
    description: "Discover the ancient underground cities of Cappadocia, where early Christians took refuge.",
    duration: "4 hours",
    price: 45,
    imageUrl: "/images/underground-city.jpg"
  },
  {
    id: "t6",
    city: "Cappadocia",
    name: "Red Valley Sunset Tour",
    description: "Hike through the beautiful Red Valley and watch the sunset over the unique rock formations.",
    duration: "3 hours",
    price: 40,
    imageUrl: "/images/red-valley.jpg"
  },
  {
    id: "t7",
    city: "Antalya",
    name: "Old Town Walking Tour",
    description: "Explore the historic Kaleiçi (Old Town) with its narrow streets, ancient harbor, and Ottoman architecture.",
    duration: "3 hours",
    price: 30,
    imageUrl: "/images/antalya-old-town.jpg"
  },
  {
    id: "t8",
    city: "Antalya",
    name: "Düden Waterfalls Tour",
    description: "Visit both the Upper and Lower Düden Waterfalls, including a boat trip to see the falls from the sea.",
    duration: "4 hours",
    price: 45,
    imageUrl: "/images/duden-falls.jpg"
  },
  {
    id: "t9",
    city: "Antalya",
    name: "Perge & Aspendos Tour",
    description: "Discover the ancient cities of Perge and Aspendos, including the best-preserved Roman theater in the world.",
    duration: "6 hours",
    price: 60,
    imageUrl: "/images/aspendos.jpg"
  }
];

export const overnightStays: OvernightStay[] = [
  {
    id: "h1",
    city: "Istanbul",
    name: "Four Seasons Bosphorus",
    description: "Luxury hotel in a 19th-century Ottoman palace on the Bosphorus with stunning views.",
    pricePerNight: 450,
    imageUrl: "/images/four-seasons-bosphorus.jpg"
  },
  {
    id: "h2",
    city: "Istanbul",
    name: "Pera Palace Hotel",
    description: "Historic hotel where Agatha Christie wrote Murder on the Orient Express.",
    pricePerNight: 300,
    imageUrl: "/images/pera-palace.jpg"
  },
  {
    id: "h3",
    city: "Cappadocia",
    name: "Museum Hotel",
    description: "Unique cave hotel with panoramic views of the valley and hot air balloons.",
    pricePerNight: 400,
    imageUrl: "/images/museum-hotel.jpg"
  },
  {
    id: "h4",
    city: "Cappadocia",
    name: "Argos in Cappadocia",
    description: "Restored historical mansion and cave rooms with valley views.",
    pricePerNight: 350,
    imageUrl: "/images/argos-cappadocia.jpg"
  },
  {
    id: "h5",
    city: "Antalya",
    name: "Tuvana Hotel",
    description: "Boutique hotel in restored Ottoman mansion in the heart of Old Town.",
    pricePerNight: 200,
    imageUrl: "/images/tuvana-hotel.jpg"
  },
  {
    id: "h6",
    city: "Antalya",
    name: "Akra Hotel",
    description: "Modern luxury hotel with Mediterranean views and infinity pools.",
    pricePerNight: 250,
    imageUrl: "/images/akra-hotel.jpg"
  }
]; 
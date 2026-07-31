export const productsData = {
  sarees: [
    {
      id: "sar-1",
      name: "Bridal Red Banarasi Silk Saree with Gold Zari",
      price: 4999,
      originalPrice: 6599,
      image: "/products/image copy 134.png",
      rating: 4.9,
      reviews: 128,
      featured: true,
      description: "Exquisite bridal red banarasi silk saree featuring intricate gold zari work, perfect for weddings and grand occasions."
    },
    {
      id: "sar-2",
      name: "Royal Ivory Kalamkari Printed Silk Saree",
      price: 2499,
      originalPrice: 3299,
      image: "/products/image copy 133.png",
      rating: 4.7,
      reviews: 84,
      featured: false,
      description: "Elegant ivory silk saree adorned with traditional Kalamkari prints, offering a blend of heritage and contemporary style."
    },
    {
      id: "sar-3",
      name: "Aqua Blue Floral Organza Printed Saree",
      price: 1899,
      originalPrice: 2499,
      image: "/products/image copy 135.png",
      rating: 4.8,
      reviews: 95,
      featured: false,
      description: "Lightweight and breathable aqua blue organza saree with beautiful floral prints, ideal for day events and summer parties."
    },
    {
      id: "sar-4",
      name: "Deep Rose Striped Linen Silk Saree",
      price: 2199,
      originalPrice: 2899,
      image: "/products/image copy 136.png",
      rating: 4.6,
      reviews: 62,
      featured: false,
      description: "Sophisticated deep rose pink linen silk saree with subtle stripes, providing comfort without compromising on elegance."
    },
    {
      id: "sar-5",
      name: "Emerald Green Cotton Silk Saree with Border",
      price: 1599,
      originalPrice: 2199,
      image: "/products/image copy 137.png",
      rating: 4.5,
      reviews: 47,
      featured: false,
      description: "Classic emerald green cotton silk saree featuring a contrasting traditional border, suitable for festive and daily wear."
    }
  ],
  blouses: [
    {
      id: "blu-1",
      name: "Navy Blue Kalamkari Kantha Embroidered Blouse",
      price: 1299,
      originalPrice: 1699,
      image: "/products/image copy 138.png",
      rating: 4.8,
      reviews: 112,
      featured: false,
      description: "Beautifully stitched navy blue blouse with authentic Kalamkari prints and Kantha embroidery detailing."
    },
    {
      id: "blu-2",
      name: "Bridal Red Full Sleeve Zardosi Blouse",
      price: 1899,
      originalPrice: 2499,
      image: "/products/image copy 139.png",
      rating: 4.9,
      reviews: 88,
      featured: false,
      description: "Stunning bridal red full-sleeve blouse heavily embellished with premium Zardosi and stone work."
    },
    {
      id: "blu-3",
      name: "Brick Red Backless Tie-Up Cotton Blouse",
      price: 899,
      originalPrice: 1199,
      image: "/products/image copy 140.png",
      rating: 4.6,
      reviews: 54,
      featured: false,
      description: "Trendy brick red cotton blouse featuring a stylish backless design with traditional tie-up tassels."
    },
    {
      id: "blu-4",
      name: "Navy Deep V-Back Sleeveless Silk Blouse",
      price: 999,
      originalPrice: 1399,
      image: "/products/image copy 141.png",
      rating: 4.7,
      reviews: 76,
      featured: false,
      description: "Elegant sleeveless silk blouse in navy blue with a deep V-back cut for a modern and chic look."
    },
    {
      id: "blu-5",
      name: "Bridal Red Sequin Heavy Puff Sleeve Blouse",
      price: 1599,
      originalPrice: 2199,
      image: "/products/image copy 142.png",
      rating: 4.8,
      reviews: 91,
      featured: false,
      description: "Glamorous red blouse with heavy sequin work and retro puff sleeves, perfectly pairing with party wear sarees."
    }
  ],
  kids: [
    {
      id: "kid-1",
      name: "White & Teal Gradient Kids Sports Set",
      price: 899,
      originalPrice: 1299,
      image: "/products/image copy 143.png",
      rating: 4.7,
      reviews: 45,
      featured: false,
      description: "Comfortable and stylish gradient sports co-ord set for kids, made from breathable cotton blend fabric."
    }
  ],
  retail: [
    {
      id: "ret-1",
      name: "Multicolor Floral Printed Retail Fashion Rack Display",
      price: 2999,
      originalPrice: 3999,
      image: "/products/image copy 144.png",
      rating: 4.9,
      reviews: 32,
      featured: false,
      description: "Premium retail collection featuring vibrant multicolor floral prints, ideal for boutique display and bulk orders."
    }
  ]
};

export const getAllFeaturedProducts = () => {
  return [
    ...productsData.sarees.filter(p => p.featured),
    ...productsData.blouses.filter(p => p.featured),
    ...productsData.kids.filter(p => p.featured),
    ...productsData.retail.filter(p => p.featured)
  ];
};

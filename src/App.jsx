import React, { useState, useEffect } from 'react';

// Extensive pharmaceutical categories from PT Rayliziie Media Digital's database
const ALL_CATEGORIES = [
  "Popular", "Obat Sakit Kepala", "Obat Asma", "Vitamin C", "Suplemen Daya Tahan Tubuh",
  "Obat Batuk", "Obat Flu", "Obat Masuk Angin", "Obat Sakit Tenggorokan", "Jamu",
  "Vitamin Anak", "Vitamin Ibu Hamil", "Vitamin Kulit", "Obat Pencerah Kulit", "Obat Kulit",
  "Obat Diet", "Obat Jerawat", "Obat Maag", "Cairan Antiseptik", "Balsem",
  "Balsem Bayi", "Bedak Gatal", "Hydrocortisone", "Kasa Steril", "Koyo",
  "Larutan Penyegar", "Obat Alergi", "Obat Ambeien", "Obat Antiaritmia", "Obat Antibiotik",
  "Obat Antidepresan", "Obat Antiemetik", "Obat Antihiperpigmentasi", "Obat Antijamur", "Obat Antijantung", "Obat Antikoagulan",
  "Obat Antimuntah", "Obat Antiparasit", "Obat Antiperdarahan", "Obat Antipsikotik", "Obat Antiseptik",
  "Obat Antivirus", "Obat Asam Urat", "Obat Batuk Herbal", "Obat Bronkodilator", "Obat Cacing",
  "Obat Darah Tinggi", "Obat Diabetes", "Obat Diare", "Obat Diuretik", "Obat Epilepsi",
  "Obat Flu dan Batuk", "Obat Gatal", "Obat Ginjal", "Obat Gosok", "Obat Haid",
  "Obat Hormon", "Obat Jantung", "Obat Kolesterol", "Obat Kortikosteroid", "Obat Kuat",
  "Obat Luka", "Obat Mata", "Obat Mata Kering", "Obat Mata Merah", "Obat Mukolitik",
  "Obat Neurotropik", "Obat Nyeri Otot dan Sendi", "Obat Oles", "Obat Panas Dalam", "Obat Pembuluh Darah",
  "Obat Pencahar", "Obat Pengencer Darah", "Obat Penghancur Batu", "Obat Prostat", "Obat Relaksan Otot",
  "Obat Rematik", "Obat Sakit Perut", "Obat Sakit Pinggang", "Obat Sariawan", "Obat Tetes Telinga",
  "Obat Tidur", "Obat Tifus", "Obat Vasodilator", "Obat Vertigo", "P3K",
  "Pembersih Vagina", "Pil KB", "Probiotik", "Suplemen", "Suplemen Diet",
  "Suplemen Herbal", "Suplemen Ibu Hamil", "Suplemen Ibu Menyusui", "Suplemen Jantung", "Suplemen Kalsium",
  "Suplemen Mineral", "Suplemen Penambah Stamina", "Suplemen Sistem Imun", "Vitamin COVID-19", "Skincare",
  "Vitamin Otot dan Saraf", "Vitamin Penambah Darah", "Obat Antiinflamasi", "Vitamin Kecantikan", "Obat Demam",
  "Obat Antinyeri", "Obat Sakit Gigi", "Multivitamin", "Alas Toilet", "Alat Kesehatan",
  "Alat Tes Gula Darah", "Alat Tes Kehamilan", "Alat Tes Kolesterol", "Alat Tes Masa Subur", "Alat Tes Ovulasi",
  "Ankle Support", "Bantal Traveling", "Bedak", "Bedak Antijamur", "Bedak Bayi",
  "Bedak Biang Keringat", "Benang Gigi", "Body Support", "Breast Pad", "Cairan Elektrolit",
  "Cairan Pembersih Lensa Kontak", "Cairan Pembersih Softlens", "Cairan Softlens", "Camilan", "Celana Dalam",
  "Conditioner", "Cotton Buds", "Deodorant", "Dot Bayi", "Ear Plug",
  "Foundation", "Garam Mandi", "Gel Jerawat", "Gel Kompres", "Gel Kuku",
  "Gula", "Gunting Kuku", "Hand Sanitizer", "Inhaler", "Jamu Kewanitaan",
  "Kacamata Terapi", "Kacang", "Kantong Urine", "Kapas Bayi", "Kapas Wajah",
  "Kertas Minyak", "Knee Support", "Kompres", "Kondom",
  "Kontrasepsi", "Kosmetik", "Krim Antinyeri", "Krim Cukur", "Krim Jerawat",
  "Krim Wajah", "Kutek", "Lem Bulu Mata", "Lem Gigi Palsu", "Lipstik",
  "Lubricant", "Lulur", "Madu", "Makanan dan Minuman", "Manicure Set",
  "Masker", "Masker Mata", "Masker Rambut", "Masker Wajah", "Mesin Nebulizer",
  "Minuman Energi", "Minuman Kesehatan", "Minyak Antiserangga", "Minyak Gosok", "Minyak Oles",
  "Minyak Pijat", "Minyak Urut", "Minyak Wangi Bayi", "Mouth Spray", "Mulitvitamin",
  "Multivitamin Anak", "Multivitamin Tulang", "Multivitamin dan Mineral", "Multivitamin dan Mineral Anak", "Obat Anestetik",
  "Obat Antiemetik-Antimuntah", "Obat Antiserangga", "Obat Antitiroid", "Obat Batuk & Flu", "Obat Batuk Berdahak",
  "Obat Cacingan", "Obat Demam Herbal", "Obat Diare Anak", "Obat Flu dan Pilek", "Obat Glaukoma",
  "Obat Herbal", "Obat Herbal Anak", "Obat Herbal Keputihan", "Obat Herbal Penambah Darah", "Obat Herbal Pilek & Hidung Tersumbat Anak",
  "Obat Herbal Sinusitis", "Obat Jerawat Herbal", "Obat Kanker", "Obat Kanker Herbal", "Obat Kumur",
  "Obat Mata Ikan", "Obat Nyeri", "Obat Nyeri Otot", "Obat Nyeri Sendi", "Obat Pelancar Haid Herbal",
  "Obat Pelangsing Herbal", "Obat Pemecah Batu", "Obat Perut Kembung", "Obat Pijat", "Obat Pilek Bayi",
  "Obat Sembelit", "Obat Tetes Mata", "Obat Tipes", "Obat Urut", "Obat-obatan",
  "Oksigen Portable", "Parfum", "Pasta Gigi", "Pelembap Bayi", "Pelembap Bibir",
  "Pelembap Kaki", "Pelembap Kulit", "Pelembap Wajah", "Pemanis Buatan", "Pembalut",
  "Pembersih Kontak Lensa", "Pembersih Kutek", "Pembersih Lidah", "Pembersih Make Up", "Pembersih Softlens",
  "Pembersih Wajah", "Pencerah Kulit", "Pencukur Alis", "Penghilang Bekas Jerawat", "Penghilang Bekas Luka",
  "Penghilang Komedo", "Pengukur Tekanan Darah", "Penjepit Bulu Mata", "Pensil Alis", "Perawatan Kuku",
  "Perlak", "Permen", "Pewarna Rambut", "Pill Reminder", "Pisau Cukur",
  "Plester Jerawat", "Plester Penutup Luka", "Plester Penutup Mata", "Pompa ASI", "Popok",
  "Primer Wajah", "Sabun", "Sabun Bayi", "Sabun Kaki", "Sabun Mandi",
  "Sabun Wajah", "Salep Antiseptik", "Sarung Tangan", "Scrub", "Scrub Wajah",
  "Serum Wajah", "Shampoo", "Shampoo Bayi", "Shower Cap", "Sikat Gigi",
  "Sikat Mandi", "Softlens", "Spons Make Up", "Spons Mandi", "Spray Antiseptik",
  "Spray Wajah", "Stocking", "Strip Pengangkat Komedo", "Styling Rambut", "Sunscreen",
  "Suplemen Anak", "Suplemen Daya Tahan Tubuh Anak", "Suplemen Hati", "Suplemen Hipertensi", "Suplemen Kecantikan",
  "Suplemen Kesehatan", "Suplemen Kesehatan Hati", "Suplemen Kesehatan Kulit", "Suplemen Kesehatan Tubuh", "Suplemen Kulit",
  "Suplemen Kulit dan Rambut", "Suplemen Lambung", "Suplemen Makanan", "Suplemen Mata", "Suplemen Otak",
  "Suplemen Penambah Nafsu Makan", "Suplemen Penurun Kolesterol", "Suplemen Sendi", "Suplemen Tulang dan Otot", "Suplemen Tulang dan Sendi",
  "Suplemen pelancar ASI", "Susu", "Tabir Surya", "Teh", "Terapi Pelengkap Obat Diare Anak",
  "Termometer", "Tetes Mata", "Tetes Mata Lensa Kontak", "Tisu", "Tisu Basah",
  "Tisu Basah Bayi", "Toner Rambut", "Toner Wajah", "Tusuk Gigi", "Vibrator",
  "Vitamin Daya Tahan Tubuh", "Vitamin Ibu Menyusui", "Vitamin Mata", "Vitamin Otak", "Vitamin Rambut",
  "Vitamin Tulang", "Vitamin Tulang dan Sendi", "Vitamin Zat Besi"
];

const DEFAULT_PREMIUM_ARTICLES = [
  {
    id: "premium-1",
    title: "MENGUASAI NUTRISI DIET: Kunci Kesehatan dan Transformasi Tubuh yang Berkelanjutan",
    category: "GIZI",
    summary: "Memahami makronutrisi, mikronutrisi, dan membangun pola makan yang sehat untuk hidup lebih baik secara konsisten dan ilmiah.",
    author: "Sinta andini",
    image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "premium-2",
    title: "Pentingnya Diet Kaya Serat untuk Kesehatan Mikrobioma Usus",
    category: "Sains Pencernaan",
    summary: "Penelitian terbaru membuktikan bahwa konsumsi serat pangan tidak hanya membantu melancarkan sistem pencernaan, melainkan juga menutrisi bakteri usus baik yang berperan dalam memperkuat daya tahan tubuh.",
    author: "Tim Nutrisi",
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "premium-3",
    title: "Membongkar Mitos Diet Rendah Karbohidrat: Tinjauan Medis Fakta vs Fiksi",
    category: "Dietetika Klinis",
    summary: "Apakah benar karbohidrat adalah penyebab utama kenaikan berat badan? Artikel ini membahas proses metabolisme karbohidrat secara empiris serta menguji efektivitas jangka panjang dari diet ketogenik.",
    author: "Tim Gizi",
    image_url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "premium-4",
    title: "Bagaimana Dehidrasi Ringan Mempengaruhi Fungsi Kognitif dan Fokus Kerja",
    category: "Hidrasi Tubuh",
    summary: "Sering merasa lelah dan sulit konsentrasi di siang hari? Uji klinis membuktikan bahwa kekurangan air sebanyak 1% dari total berat tubuh dapat menurunkan daya ingat dan fokus secara signifikan.",
    author: "Ulasan Medis",
    image_url: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&auto=format&fit=crop&q=80"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' or 'shop'
  const [shopView, setShopView] = useState('main'); // 'main' | 'all-categories' | 'products'
  const [selectedCategory, setSelectedCategory] = useState('Obat Maag');
  const [searchQuery, setSearchQuery] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [selectedPortfolio, setSelectedPortfolio] = useState(null); // 'syuhada' or 'andina'
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // Advanced Cart System states
  const [cartItems, setCartItems] = useState([]); // Array of { product, quantity }
  const [showCartModal, setShowCartModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transfer Bank');

  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [activeConsultationProduct, setActiveConsultationProduct] = useState(null);

  const [articles, setArticles] = useState(DEFAULT_PREMIUM_ARTICLES);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const fetchArticlesSilently = async () => {
    setLoadingArticles(true);
    try {
      const supabaseUrl = "https://harpdcqmrqdgckcuhxfr.supabase.co";
      const supabaseAnonKey = "sb_publishable_ppzSXi7DuN7v0racT9l98A_JxK5-MGG";
      
      const headers = {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      };

      let success = false;
      let fetchedData = [];

      // Attempt standard Table Query
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/articles?select=*`, { headers });
        if (res.ok) {
          fetchedData = await res.json();
          success = true;
        }
      } catch (e) {
        console.warn("Retrying fetch with fallback table...");
      }

      // Try fallback Table if needed
      if (!success || !Array.isArray(fetchedData) || fetchedData.length === 0) {
        try {
          const res = await fetch(`${supabaseUrl}/rest/v1/posts?select=*`, { headers });
          if (res.ok) {
            fetchedData = await res.json();
            success = true;
          }
        } catch (e) {
          console.error("Database connection exception:", e);
        }
      }

      if (success && Array.isArray(fetchedData) && fetchedData.length > 0) {
        const mappedData = fetchedData
          .filter(item => item !== null && typeof item === 'object')
          .map(item => {
            const rawCover = String(item.image_url || item.cover || item.thumbnail || item.img || '');
            const isCoverInvalid = !rawCover || rawCover.trim() === '' || rawCover.toLowerCase() === 'cover';
            
            return {
              id: item.id || Math.random().toString(),
              title: item.title || item.judul || "Artikel Nutrisi Baru",
              category: item.category || item.kategori || "Gizi & Diet",
              summary: item.summary || item.content || item.isi || item.deskripsi || "Informasi sains gizi tervalidasi.",
              author: item.author || item.penulis || "Tim Redaksi",
              status: item.status || 'published',
              approved: item.approved !== undefined ? item.approved : (item.is_approved !== undefined ? item.is_approved : true),
              image_url: isCoverInvalid 
                ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
                : rawCover
            };
          });

        const approvedOnly = mappedData.filter(item => {
          const statusVal = String(item.status || '').toLowerCase();
          return statusVal === 'approved' || 
                 statusVal === 'published' || 
                 statusVal === 'approve' ||
                 item.approved === true;
        });

        if (approvedOnly.length > 0) {
          setArticles(approvedOnly);
        } else {
          setArticles(DEFAULT_PREMIUM_ARTICLES);
        }
      }
    } catch (err) {
      console.log("Background synchronization is active in standby mode.");
      setArticles(DEFAULT_PREMIUM_ARTICLES);
    } finally {
      setLoadingArticles(false);
    }
  };

  useEffect(() => {
    fetchArticlesSilently();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscribedEmail) {
      triggerToast(`Terima kasih! Email ${subscribedEmail} berhasil didaftarkan.`);
      setSubscribedEmail('');
    }
  };

  const getProductsForCategory = (categoryName) => {
    const cleanCat = String(categoryName || 'Obat Maag').trim();
    
    // Exact match for Obat Maag matching image_049b9b.jpg
    if (cleanCat.toLowerCase() === 'obat maag') {
      return [
        {
          id: 'maag-1',
          name: 'Episan 500 Mg Suspensi 100 ml',
          unit: 'Per Botol',
          price: 96278,
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
          needDoctor: true
        },
        {
          id: 'maag-2',
          name: 'Sucralfate Suspensi 100 ml Meprofarm',
          unit: 'Per Botol',
          price: 36864,
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
          needDoctor: true
        },
        {
          id: 'maag-3',
          name: 'Inpepsa Suspensi 200 ml',
          unit: 'Per Botol',
          price: 205298,
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
          needDoctor: true
        },
        {
          id: 'maag-4',
          name: 'Nexium Mups 20 Mg 10 Tablet',
          unit: 'Per Strip',
          price: 368471,
          image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300&auto=format&fit=crop&q=80',
          needDoctor: true
        },
        {
          id: 'maag-5',
          name: 'Sanmag Suspensi 120 ml',
          unit: 'Per Botol',
          price: 53227,
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
          needDoctor: false
        },
        {
          id: 'maag-6',
          name: 'Ranivel 75 Mg Sirup 60 ml',
          unit: 'Per Botol',
          price: 116336,
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
          needDoctor: true
        }
      ];
    }

    // Exact matches for Strip Pengangkat Komedo from image_04985d.jpg
    if (cleanCat.toLowerCase().includes('komedo') || cleanCat.toLowerCase() === 'strip pengangkat komedo') {
      return [
        {
          id: 'komedo-1',
          name: 'Biore Pore Pack Black',
          unit: 'Per Pack',
          price: 15400,
          image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300&auto=format&fit=crop&q=80',
          needDoctor: false
        },
        {
          id: 'komedo-2',
          name: 'Lanbena Nose Plants Pore Strip',
          unit: 'Per Botol',
          price: 45000,
          image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&auto=format&fit=crop&q=80',
          needDoctor: false
        },
        {
          id: 'komedo-3',
          name: 'Breylee Blackhead Mask & Strip Pack',
          unit: 'Per Pack',
          price: 59000,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80',
          needDoctor: false
        },
        {
          id: 'komedo-4',
          name: 'Hanasui Naturgo Peel Off Mask 10g',
          unit: 'Per Sachet',
          price: 6500,
          image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&auto=format&fit=crop&q=80',
          needDoctor: false
        }
      ];
    }

    // Dynamic generated category mockups
    return [
      {
        id: `${cleanCat}-1`,
        name: `${cleanCat} Utama Plus 200ml`,
        unit: 'Per Botol',
        price: 48500,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
        needDoctor: false
      },
      {
        id: `${cleanCat}-2`,
        name: `Generik ${cleanCat} Forte 10 Tablet`,
        unit: 'Per Strip',
        price: 18900,
        image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300&auto=format&fit=crop&q=80',
        needDoctor: true
      },
      {
        id: `${cleanCat}-3`,
        name: `${cleanCat} Premium Herbal Organik`,
        unit: 'Per Pack',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&auto=format&fit=crop&q=80',
        needDoctor: false
      },
      {
        id: `${cleanCat}-4`,
        name: `Sediaan ${cleanCat} Pediatric Cair`,
        unit: 'Per Botol',
        price: 24700,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
        needDoctor: false
      }
    ];
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    triggerToast(`🛒 Berhasil menambahkan "${product.name}" ke Keranjang.`);
  };

  const updateCartQuantity = (productId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    triggerToast("🗑️ Produk dihapus dari keranjang.");
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!shippingName || !shippingAddress || !shippingPhone) {
      triggerToast("⚠️ Mohon lengkapi semua kolom pengiriman.");
      return;
    }
    setCheckoutStep('success');
  };

  const clearCart = () => {
    setCartItems([]);
    setCheckoutStep('cart');
    setShowCartModal(false);
    triggerToast("✨ Pembelian sukses! Kami akan segera mengirimkan pesanan Anda.");
  };

  const calculateGrandTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const shippingFee = 15000; // Flat 15.000 IDR shipping
    return { subtotal, shippingFee, total: subtotal + shippingFee };
  };

  const handleCategorySelection = (cat) => {
    setSelectedCategory(cat);
    setShopView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const PREVIEW_CATEGORIES = [
    { name: "Obat Maag", icon: "🍵", color: "bg-blue-50 text-blue-600" },
    { name: "Obat Sakit Kepala", icon: "💆", color: "bg-orange-50 text-orange-600" },
    { name: "Obat Asma", icon: "🫁", color: "bg-teal-50 text-teal-600" },
    { name: "Vitamin C", icon: "🍊", color: "bg-amber-50 text-amber-600" },
    { name: "Suplemen Daya Tahan Tubuh", icon: "🛡️", color: "bg-indigo-50 text-indigo-600" },
    { name: "Obat Batuk", icon: "🗣️", color: "bg-rose-50 text-rose-600" },
    { name: "Obat Flu", icon: "🦠", color: "bg-emerald-50 text-emerald-600" },
    { name: "Obat Masuk Angin", icon: "💨", color: "bg-violet-50 text-violet-600" },
    { name: "Obat Sakit Tenggorokan", icon: "🧣", color: "bg-red-50 text-red-600" },
    { name: "Jamu", icon: "🍵", color: "bg-green-50 text-green-600" },
    { name: "Vitamin Anak", icon: "👶", color: "bg-cyan-50 text-cyan-600" },
    { name: "Vitamin Ibu Hamil", icon: "🤰", color: "bg-pink-50 text-pink-600" }
  ];

  const filteredAllCategories = ALL_CATEGORIES.filter(cat => 
    cat.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const portfolios = {
    syuhada: {
      name: "Muhammad Syuhada Ar'rayyan",
      role: "Komite Editorial & Reviewer Gizi",
      institution: "Universitas Islam Negeri Sumatera Utara",
      avatarBg: "from-blue-600 to-[#1C3D5A]",
      bio: "Muhammad Syuhada Ar'rayyan menjabat sebagai Komite Editorial & Reviewer Gizi untuk lini media NutrisiDietMu di bawah naungan PT Rayliziie Media Digital. Memiliki spesialisasi dalam mengkaji keakuratan data riset gizi klinis untuk publikasi digital.",
      education: [
        "S1 Ilmu Kesehatan Masyarakat (Peminatan Gizi Kesehatan) - Universitas Islam Negeri Sumatera Utara"
      ],
      focus: [
        "Evaluasi Dietetika dan Nutrisi Preventif",
        "Edukasi Pola Makan Berbasis Bukti Ilmiah (Evidence-Based)",
        "Telaah Artikel Ilmiah & Jurnal Pangan Kesehatan"
      ],
      verifications: "Telah mengulas dan memverifikasi puluhan publikasi sains gizi agar memenuhi standar akurasi yang diwajibkan oleh PT Rayliziie Media Digital."
    },
    andina: {
      name: "Andina Putri, S.Gz",
      role: "Komite Editorial & Reviewer Gizi",
      institution: "Universitas Negeri Medan",
      avatarBg: "from-teal-500 to-emerald-700",
      bio: "Andina Putri, S.Gz merupakan seorang pakar gizi lulusan Universitas Negeri Medan yang berdedikasi memformulasikan pola makan sehat untuk pencegahan penyakit metabolik. Menjabat sebagai penelaah klinis utama di lini NutrisiDietMu.",
      education: [
        "S1 Gizi (S.Gz) - Universitas Negeri Medan"
      ],
      focus: [
        "Terapi Gizi Medis & Pengelolaan Berat Badan",
        "Intervensi Gizi Komunitas & Pencegahan Defisiensi Gizi",
        "Standarisasi Edukasi Pangan Nasional"
      ],
      verifications: "Memverifikasi dosis nutrisi mikro, keamanan klaim kesehatan, serta standarisasi produk gizi terdaftar pada PT Rayliziie Media Digital."
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A365D] font-sans selection:bg-teal-500 selection:text-white flex flex-col justify-between relative">
      
      {/* ==================== TOAST NOTIFICATION ==================== */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-teal-950 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-teal-600 animate-bounce">
          <div className="p-1 bg-teal-500 rounded-full text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* ==================== HEADER ==================== */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo / Home Brand */}
          <div 
            onClick={() => { setActiveTab('home'); setShopView('main'); window.scrollTo({top:0, behavior:'smooth'}); }}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <span className="bg-[#1C3D5A] p-2 rounded-xl text-white transition-all duration-300 group-hover:bg-teal-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
            <span className="text-2xl font-black tracking-tight text-[#1C3D5A]">
              Nutrisi<span className="text-teal-600 font-medium">DietMu</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-[#4A5568]">
            <button 
              onClick={() => { setActiveTab('home'); setShopView('main'); }}
              className={`hover:text-teal-600 transition-colors py-2 relative ${activeTab === 'home' ? 'text-[#1C3D5A] border-b-2 border-teal-600' : ''}`}
            >
              Beranda
            </button>
            
            <button 
              onClick={() => { setActiveTab('shop'); setShopView('main'); }}
              className={`hover:text-teal-600 transition-colors py-2 relative ${activeTab === 'shop' ? 'text-[#1C3D5A] border-b-2 border-teal-600' : ''}`}
            >
              Toko Nutrisi Dietmu (RayliziieShop)
            </button>
          </nav>

          {/* CTA Action Header */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                const element = document.getElementById('newsletter-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActiveTab('home');
                  setTimeout(() => {
                    document.getElementById('newsletter-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="bg-[#2CB1BC] hover:bg-teal-700 text-white font-bold py-2.5 px-5 rounded-full text-sm shadow-md shadow-teal-600/25 transition-all active:scale-95"
            >
              Berlangganan
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">

        {/* ==================== VIEW 1: BERANDA ==================== */}
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-50 text-teal-700 rounded-full text-xs font-bold tracking-wide uppercase">
                  <span>🔬 Berbasis Bukti Ilmiah</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C3D5A] leading-tight tracking-tight">
                  Edukasi Nutrisi Berbasis <br />
                  <span className="relative inline-block text-teal-600">
                    Sains yang Dapat Anda Percayai.
                    <span className="absolute left-0 bottom-1 w-full h-1 bg-teal-600/30 rounded"></span>
                  </span>
                </h1>
                <p className="text-lg text-[#4A5568] leading-relaxed max-w-2xl font-normal">
                  NutrisiDietMu menerjemahkan riset klinis yang mendalam menjadi panduan yang jelas dan jujur. Kami membantu pembaca awam maupun profesional kesehatan mengambil keputusan yang tepat seputar makanan.
                </p>
                <div className="pt-4 flex flex-wrap gap-4 items-center">
                  <button 
                    onClick={() => document.getElementById('artikel-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-[#1C3D5A] hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-full inline-flex items-center gap-2 group shadow-lg shadow-[#1C3D5A]/10 transition-all active:scale-95 text-base"
                  >
                    Baca Artikel Terbaru 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => document.getElementById('editorial-standards')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-[#4A5568] hover:text-[#1C3D5A] font-bold px-4 py-2 transition-colors border-b-2 border-transparent hover:border-[#1C3D5A]"
                  >
                    Standar Editorial Kami
                  </button>
                </div>
              </div>

              {/* Cover Graphic Card */}
              <div className="lg:col-span-5 relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-teal-100 to-indigo-100 rounded-3xl blur-2xl opacity-70 -z-10"></div>
                <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">Jurnal Minggu Ini</span>
                    <span className="text-xs text-[#718096]">Terbitan Juli 2026</span>
                  </div>
                  <div className="h-44 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-medium overflow-hidden relative border border-slate-200">
                    <img 
                      src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&auto=format&fit=crop&q=80" 
                      alt="Healthy scientific diet" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <p className="text-white font-bold text-sm leading-snug">Metode Diet Mediterania Baru Hasil Uji Klinis</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex gap-3 items-start">
                      <div className="p-1 bg-green-100 text-green-700 rounded-full mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-[#4A5568] font-medium">Uji klinis acak tersamar ganda pada 5.200 partisipan.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="p-1 bg-green-100 text-green-700 rounded-full mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-[#4A5568] font-medium">Bebas konflik kepentingan industri produk gizi komersial.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust Pillars Section */}
            <section className="bg-slate-50 py-20 border-y border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
                  
                  {/* Pillar 1 */}
                  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-3 bg-teal-50 text-teal-600 rounded-xl inline-block mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#1C3D5A] mb-3">Sumber Telaah Sejawat (Peer-Reviewed)</h3>
                    <p className="text-[#4A5568] leading-relaxed text-sm">
                      Setiap klaim yang kami tulis wajib merujuk langsung pada literatur primer dan pedoman klinis resmi — tanpa opini tanpa dasar.
                    </p>
                  </div>

                  {/* Pillar 2 */}
                  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-3 bg-teal-50 text-teal-600 rounded-xl inline-block mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#1C3D5A] mb-3">Ditinjau oleh Ahli Gizi</h3>
                    <p className="text-[#4A5568] leading-relaxed text-sm">
                      Setiap artikel diperiksa secara ketat oleh Ahli Gizi (Dietitian) terdaftar sebelum diterbitkan demi menjaga akurasi standar medis.
                    </p>
                  </div>

                  {/* Pillar 3 */}
                  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-3 bg-teal-50 text-teal-600 rounded-xl inline-block mb-6">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#1C3D5A] mb-3">Ditulis untuk Kejelasan</h3>
                    <p className="text-[#4A5568] leading-relaxed text-sm">
                      Sains yang rumit dan membingungkan kami terjemahkan menjadi panduan praktis yang jujur dan mudah dipahami oleh masyarakat awam.
                    </p>
                  </div>

                </div>
              </div>
            </section>

            {/* Pilihan Editor Section */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <span className="text-xs font-extrabold text-teal-600 uppercase tracking-widest block mb-1">ULASAN PILIHAN</span>
                <h2 className="text-3xl font-black text-[#1C3D5A] tracking-tight">Pilihan Editor</h2>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-center bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="lg:col-span-6 h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80" 
                    alt="Omega-3 Salmon Avocado" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="lg:col-span-6 space-y-6 lg:pl-4">
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">ULASAN UTAMA</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1C3D5A] leading-snug">
                    Bukti Ilmiah di Balik Omega-3: Apa yang Sebenarnya Diungkap oleh Riset?
                  </h3>
                  <p className="text-[#4A5568] leading-relaxed text-base">
                    Tinjauan kritis terhadap uji klinis acak terkontrol mengenai asam lemak esensial ini pada kesehatan kardiovaskular dan kognisi otak. Memilah mana fakta empiris murni dan mana klaim pemasaran suplemen.
                  </p>
                  <div className="pt-2 flex items-center gap-4">
                    <button 
                      onClick={() => {
                        const mainArticle = (Array.isArray(articles) && articles.find(a => a.id.includes("premium-1"))) || DEFAULT_PREMIUM_ARTICLES[0];
                        setSelectedArticle(mainArticle);
                        triggerToast(`Membuka artikel "${mainArticle.title}"...`);
                      }}
                      className="bg-[#1C3D5A] hover:bg-teal-700 text-white font-bold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all text-sm"
                    >
                      Baca Ulasan Lengkap 
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Artikel Terbaru Section */}
            <section id="artikel-section" className="py-20 bg-slate-50 border-t border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                  <div>
                    <span className="text-xs font-extrabold text-teal-600 uppercase tracking-widest block mb-1">PUSTAKA ILMIAH</span>
                    <h2 className="text-3xl font-black text-[#1C3D5A] tracking-tight">Artikel Terbaru</h2>
                    <p className="text-[#718096] text-sm mt-1">
                      Kumpulan konten sains gizi terbaru yang telah disetujui dan diterbitkan secara live dari database pusat.
                    </p>
                  </div>
                </div>

                {loadingArticles ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="bg-white rounded-3xl p-6 border border-gray-100 space-y-4 animate-pulse">
                        <div className="h-48 bg-slate-200 rounded-2xl w-full"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                        <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-200 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.isArray(articles) && articles.map((article, idx) => (
                      <div 
                        key={article.id || idx} 
                        onClick={() => {
                          setSelectedArticle(article);
                        }}
                        className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:translate-y-[-4px]"
                      >
                        <div>
                          <div className="h-56 bg-slate-100 overflow-hidden relative">
                            <img 
                              src={article.image_url} 
                              alt={article.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-6 space-y-3">
                            <span className="text-xs font-extrabold text-teal-600 tracking-wider uppercase">
                              {article.category}
                            </span>
                            <h3 className="text-xl font-bold text-[#1C3D5A] group-hover:text-teal-600 transition-colors leading-snug line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-[#4A5568] text-sm line-clamp-3">
                              {article.summary}
                            </p>
                          </div>
                        </div>
                        <div className="p-6 pt-0 flex justify-between items-center border-t border-slate-50 mt-4">
                          <button 
                            className="text-teal-600 font-bold text-sm inline-flex items-center gap-1 hover:underline"
                          >
                            Baca Selengkapnya 
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase">
                            Oleh {article.author}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Editorial Standards Section */}
            <section id="editorial-standards" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-10"></div>
                
                <div className="space-y-4">
                  <span className="text-xs font-extrabold text-teal-600 uppercase tracking-widest block font-sans">STANDAR EDITORIAL KAMI</span>
                  <blockquote className="text-xl sm:text-2xl font-medium text-[#1C3D5A] leading-relaxed italic font-sans">
                    “Kami hanya mempublikasikan apa yang didukung oleh pembuktian sains yang kuat. Jika bukti ilmiah di lapangan masih belum pasti, kami akan mengatakannya secara jujur — karena kepercayaan dibangun atas dasar kejujuran fakta, bukan sekadar sensasi pemasaran.”
                  </blockquote>
                </div>

                {/* Editorial Team Cards */}
                <div className="pt-8 border-t border-slate-100 grid sm:grid-cols-2 gap-8">
                  
                  {/* Profile Card 1 */}
                  <div 
                    onClick={() => setSelectedPortfolio('syuhada')}
                    className="p-4 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 cursor-pointer transition-all flex items-start gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#1C3D5A] to-blue-600 text-white flex items-center justify-center font-extrabold text-lg shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                      MS
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[#1C3D5A] font-extrabold text-lg group-hover:text-teal-600 transition-colors flex items-center gap-1.5">
                        {"Muhammad Syuhada Ar'rayyan"}
                        <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full uppercase">Reviewer</span>
                      </h4>
                      <p className="text-[#718096] text-sm">Komite Editorial & Reviewer Gizi</p>
                      <p className="text-teal-600 text-xs font-medium">Universitas Islam Negeri Sumatera Utara</p>
                      <span className="text-[11px] font-bold text-slate-400 group-hover:text-teal-600 inline-flex items-center gap-1 pt-1 transition-colors">
                        Lihat Portofolio 
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Profile Card 2 */}
                  <div 
                    onClick={() => setSelectedPortfolio('andina')}
                    className="p-4 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 cursor-pointer transition-all flex items-start gap-4 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-700 text-white flex items-center justify-center font-extrabold text-lg shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                      AP
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[#1C3D5A] font-extrabold text-lg group-hover:text-teal-600 transition-colors flex items-center gap-1.5">
                        {"Andina Putri, S.Gz"}
                        <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full uppercase">Reviewer</span>
                      </h4>
                      <p className="text-[#718096] text-sm">Komite Editorial & Reviewer Gizi</p>
                      <p className="text-teal-600 text-xs font-medium">Universitas Negeri Medan</p>
                      <span className="text-[11px] font-bold text-slate-400 group-hover:text-teal-600 inline-flex items-center gap-1 pt-1 transition-colors">
                        Lihat Portofolio 
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>

                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#A0AEC0] tracking-wider uppercase">
                  <span>LINI MEDIA RESMI • PT RAYLIZIIE MEDIA DIGITAL</span>
                  <span className="bg-slate-50 px-3 py-1 rounded border text-[10px]">VERIFIED TRUSTED RESOURCE</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== VIEW 2: TOKO NUTRISI DIETMU ==================== */}
        {activeTab === 'shop' && (
          <div className="animate-fadeIn">
            
            {shopView === 'main' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
                
                {/* Shop Banner */}
                <div className="bg-[#1C3D5A] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg shadow-blue-900/10">
                  <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden lg:block">
                    <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  
                  <div className="max-w-3xl space-y-6">
                    <nav className="text-xs text-teal-200 flex items-center gap-2">
                      <span className="hover:underline cursor-pointer" onClick={() => setActiveTab('home')}>Home</span>
                      <span>/</span>
                      <span className="font-semibold text-white">RayliziieShop</span>
                    </nav>
                    
                    <div className="space-y-2">
                      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Toko Nutrisi Dietmu (RayliziieShop)</h2>
                      <p className="text-teal-100 font-medium">Solusi Nutrisi Aman, Legal, dan Terpercaya oleh PT Rayliziie Media Digital</p>
                    </div>

                    <div className="inline-flex items-center gap-2 bg-[#2B6CB0]/40 border border-teal-400/30 px-3 py-1.5 rounded-full text-xs font-semibold">
                      <span>📍</span>
                      <span>Alamat Pengiriman:</span>
                      <span className="text-amber-200 cursor-pointer" onClick={() => triggerToast("Penambahan alamat akan tersedia pada pembaruan akun.")}>Tambah Alamat</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>

                    {/* Shop Search Input */}
                    <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl shadow-xl max-w-2xl">
                      <div className="flex-grow flex items-center px-3 gap-2.5">
                        <svg className="text-slate-400 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                          type="text" 
                          placeholder="Cari obat, vitamin, produk kesehatan lainnya" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full py-2.5 text-slate-900 placeholder-slate-400 font-medium focus:outline-none text-sm sm:text-base"
                        />
                      </div>
                      <button 
                        onClick={() => {
                          if (searchQuery) {
                            setSelectedCategory(searchQuery);
                            setShopView('products');
                          } else {
                            triggerToast("Silakan ketik nama obat atau produk.");
                          }
                        }}
                        className="bg-teal-600 hover:bg-[#1C3D5A] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
                      >
                        Cari
                      </button>
                    </div>
                  </div>
                </div>

                {/* Categories Grid Overview */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1C3D5A]">Kategori Pilihan</h3>
                    <button 
                      onClick={() => setShopView('all-categories')}
                      className="text-teal-600 hover:text-teal-700 font-extrabold text-sm sm:text-base flex items-center gap-1 hover:underline"
                    >
                      Lihat Semua 
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {PREVIEW_CATEGORIES.map((cat, index) => (
                      <div 
                        key={index}
                        onClick={() => handleCategorySelection(cat.name)}
                        className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center space-y-4 group"
                      >
                        <div className={`w-14 h-14 ${cat.color} rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                          {cat.icon}
                        </div>
                        <span className="text-sm font-bold text-[#2D3748] leading-tight group-hover:text-teal-600 transition-colors">
                          {cat.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="p-2 bg-teal-600 rounded-full text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1C3D5A]">Ketersediaan Produk Terkurasi</h4>
                    <p className="text-sm text-[#4A5568] mt-0.5">
                      Semua produk herbal, multivitamin, dan suplemen diet yang masuk katalog kami menjalani verifikasi uji lab dan berada di bawah pengawasan tim gizi PT Rayliziie Media Digital.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* ==================== VIEW 3: ALL CATEGORIES ==================== */}
            {shopView === 'all-categories' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
                
                {/* Breadcrumbs */}
                <div className="space-y-4">
                  <nav className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="hover:underline cursor-pointer" onClick={() => { setActiveTab('home'); setShopView('main'); }}>Home</span>
                    <span>/</span>
                    <span className="hover:underline cursor-pointer" onClick={() => setShopView('main')}>RayliziieShop</span>
                    <span>/</span>
                    <span className="font-semibold text-slate-700">Pilih Kategori</span>
                  </nav>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C3D5A]">Pilih Kategori Obat</h2>
                    <button 
                      onClick={() => setShopView('main')}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border px-3 py-1.5 rounded-full transition-all"
                    >
                      ← Kembali ke RayliziieShop
                    </button>
                  </div>
                </div>

                {/* Category Search Filter */}
                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl flex items-center gap-3 max-w-lg shadow-sm">
                  <svg className="text-slate-400 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Cari Kategori..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="w-full bg-transparent border-none text-slate-900 focus:outline-none font-medium placeholder-slate-400 text-sm sm:text-base"
                  />
                  {categorySearch && (
                    <button 
                      onClick={() => setCategorySearch('')}
                      className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Multi-Column Grid Layout */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm">
                  {Array.isArray(filteredAllCategories) && filteredAllCategories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3.5">
                      {filteredAllCategories.map((item, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => handleCategorySelection(item)}
                          className="py-1.5 border-b border-dashed border-slate-100 hover:border-teal-300 group cursor-pointer flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm font-semibold text-[#4A5568] group-hover:text-teal-600 transition-colors">
                            {item}
                          </span>
                          <svg className="w-3.5 h-3.5 text-slate-300 group-hover:text-teal-600 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-400">
                      <p className="font-semibold">Kategori "{categorySearch}" tidak ditemukan.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ==================== VIEW 4: PRODUCTS DIRECTORY ==================== */}
            {shopView === 'products' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
                
                {/* Breadcrumbs */}
                <div className="space-y-4">
                  <nav className="text-sm text-teal-600 flex items-center gap-1.5 font-medium">
                    <span className="hover:underline cursor-pointer" onClick={() => { setActiveTab('home'); setShopView('main'); }}>Home</span>
                    <span className="text-slate-400">/</span>
                    <span className="hover:underline cursor-pointer" onClick={() => setShopView('main')}>RayliziieShop</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-slate-500 font-normal">Cari Obat</span>
                  </nav>

                  {/* Standard Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-3 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm max-w-4xl">
                    <div className="flex-grow flex items-center px-4 gap-3">
                      <svg className="text-slate-400 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input 
                        type="text" 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        placeholder="Cari obat atau kategori..." 
                        className="w-full py-3 text-slate-900 placeholder-slate-400 font-semibold focus:outline-none text-base"
                      />
                    </div>
                    <button 
                      onClick={() => triggerToast(`Mencari produk kesehatan untuk "${selectedCategory}"`)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-8 py-3.5 rounded-xl transition-colors text-base flex items-center justify-center gap-2"
                    >
                      Cari
                    </button>
                  </div>
                </div>

                {/* Sub-text header */}
                <div className="flex items-center justify-between border-b pb-4 border-slate-100">
                  <p className="text-slate-600 font-medium">
                    Menampilkan <span className="font-extrabold text-[#1C3D5A]">{getProductsForCategory(selectedCategory).length} produk</span> terkait <span className="font-bold text-orange-500">"{selectedCategory}"</span>
                  </p>
                  <button 
                    onClick={() => setShopView('all-categories')}
                    className="text-sm font-bold text-teal-600 hover:underline flex items-center gap-1"
                  >
                    ← Pilih Kategori Lain
                  </button>
                </div>

                {/* Medicine / Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {getProductsForCategory(selectedCategory).map((product, idx) => (
                    <div 
                      key={product.id || idx}
                      className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-4">
                        {/* Image wrapper */}
                        <div className="h-44 bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center relative p-4">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="max-h-full object-contain"
                          />
                          {product.needDoctor && (
                            <span className="absolute top-3 left-3 bg-red-50 text-red-600 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-red-100">
                              Resep Dokter
                            </span>
                          )}
                        </div>

                        {/* Metadata */}
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-[#2D3748] text-sm sm:text-base leading-tight min-h-[44px] line-clamp-2">
                            {product.name}
                          </h4>
                          <p className="text-slate-400 text-xs font-semibold">
                            {product.unit}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4 pt-2">
                        {/* Price rendering */}
                        <p className="text-xl font-black text-orange-500">
                          Rp{product.price.toLocaleString('id-ID')}
                        </p>

                        {/* Interactive Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => {
                              setActiveConsultationProduct(product);
                              setShowDoctorModal(true);
                            }}
                            className="border border-orange-500 hover:bg-orange-50 text-orange-500 font-extrabold text-xs py-2.5 rounded-xl transition-all text-center"
                          >
                            Chat Dokter
                          </button>
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className="bg-white border border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 font-extrabold text-xs py-2.5 rounded-xl transition-all text-center"
                          >
                            + Tambah
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
        )}

        {/* ==================== SECTION: NEWSLETTER ==================== */}
        <section id="newsletter-section" className="bg-[#1D324F] py-20 text-white border-t border-[#1a2d48]">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Intisari Sains Nutrisi Langsung di Email Anda
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
              Satu email edukatif berbasis bukti ilmiah setiap minggu. Tanpa tren diet ekstrem, tanpa penyebaran rasa takut — murni edukasi yang jelas.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 bg-transparent p-1 max-w-xl mx-auto">
              <div className="flex-grow bg-white rounded-full flex items-center px-4 py-2.5 shadow-md border border-slate-700/30">
                <span className="text-slate-400 mr-2.5">✉️</span>
                <input 
                  type="email" 
                  required
                  placeholder="masukkan@email.com" 
                  value={subscribedEmail}
                  onChange={(e) => setSubscribedEmail(e.target.value)}
                  className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-sm sm:text-base font-medium"
                />
              </div>
              <button 
                type="submit"
                className="bg-[#2CB1BC] hover:bg-[#228e97] active:scale-95 text-white font-bold py-3.5 px-8 rounded-full transition-all text-sm sm:text-base shadow-md shrink-0"
              >
                Berlangganan
              </button>
            </form>
            <p className="text-xs text-slate-400">
              Anda dapat berhenti berlangganan kapan saja. Kami menjaga privasi data Anda.
            </p>
          </div>
        </section>

      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Brand Info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="bg-[#1C3D5A] p-1.5 rounded-lg text-white">
                  🔬
                </span>
                <span className="text-xl font-bold tracking-tight text-[#1C3D5A]">
                  NutrisiDietMu
                </span>
              </div>
              <p className="text-[#718096] text-sm leading-relaxed max-w-sm">
                Jurnalisme nutrisi berbasis sains yang ditinjau oleh ahli gizi terdaftar dan berakar kuat pada riset ilmiah berskala klinis.
              </p>
            </div>

            {/* Nav Links Column */}
            <div className="md:col-span-7 grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold tracking-wider text-[#A0AEC0] uppercase">JELAJAH</h4>
                <ul className="space-y-2 text-sm font-semibold text-[#4A5568]">
                  <li>
                    <button 
                      onClick={() => { setActiveTab('home'); window.scrollTo({top:0, behavior:'smooth'}); }}
                      className="hover:text-teal-600 transition-colors text-left"
                    >
                      Artikel
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveTab('home'); document.getElementById('editorial-standards')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="hover:text-teal-600 transition-colors text-left"
                    >
                      Tentang Kami
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => triggerToast("Formulir Kontak akan segera aktif.")}
                      className="hover:text-teal-600 transition-colors text-left"
                    >
                      Kontak
                    </button>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-extrabold tracking-wider text-[#A0AEC0] uppercase">KORPORASI</h4>
                <ul className="space-y-2 text-sm font-semibold text-[#4A5568]">
                  <li>
                    <button 
                      onClick={() => triggerToast("Kebijakan Editorial disiapkan oleh Komite Reviewer Gizi.")}
                      className="hover:text-teal-600 transition-colors text-left"
                    >
                      Kebijakan Editorial
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => triggerToast("Layanan Hubungan Media PT Rayliziie Media Digital.")}
                      className="hover:text-teal-600 transition-colors text-left"
                    >
                      Hubungan Media
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => triggerToast("Ketentuan privasi & perlindungan data.")}
                      className="hover:text-teal-600 transition-colors text-left"
                    >
                      Privasi & Hukum
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 sm:p-8">
            <p className="text-xs text-[#718096] leading-relaxed">
              <strong className="text-[#4A5568] font-bold">Sanggahan Medis (Medical Disclaimer):</strong> Seluruh konten yang diterbitkan pada NutrisiDietMu disediakan murni hanya untuk tujuan informasi dan edukasi umum, serta tidak dapat digunakan sebagai pengganti saran medis profesional, diagnosis, atau perawatan klinis dari dokter. Selalu berkonsultasi dengan dokter spesialis atau ahli gizi terdaftar yang berkualifikasi sebelum melakukan modifikasi radikal pada pola makan atau rasi kesehatan Anda.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A0AEC0] font-medium">
            <span>
              © 2026 NutrisiDietMu. Hak Cipta Dilindungi Undang-Undang. Lini Media Resmi dari <strong className="text-slate-500 font-bold">PT Rayliziie Media Digital</strong>.
            </span>
            <span className="text-[#2CB1BC] font-bold italic tracking-wide">
              Science-based nutrition, honestly reported.
            </span>
          </div>

        </div>
      </footer>

      {/* ==================== PORTFOLIO INTERACTIVE MODAL ==================== */}
      {selectedPortfolio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
            
            {/* Modal Title bar */}
            <div className={`p-8 bg-gradient-to-r ${portfolios[selectedPortfolio].avatarBg} text-white flex items-center justify-between relative`}>
              <div className="space-y-1.5 pr-8">
                <span className="bg-white/20 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider block w-fit">
                  Komite Reviewer & Editorial
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-none">
                  {portfolios[selectedPortfolio].name}
                </h3>
                <p className="text-slate-200 text-sm font-medium">{portfolios[selectedPortfolio].institution}</p>
              </div>
              <button 
                onClick={() => setSelectedPortfolio(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors active:scale-95"
              >
                ✕
              </button>
            </div>

            {/* Modal Content Scroll */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[70vh]">
              
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 font-sans">
                  Profil Singkat
                </h4>
                <p className="text-[#4A5568] leading-relaxed text-sm sm:text-base font-normal">
                  {portfolios[selectedPortfolio].bio}
                </p>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 font-sans">
                  Latar Belakang Pendidikan
                </h4>
                <ul className="space-y-2">
                  {Array.isArray(portfolios[selectedPortfolio]?.education) && portfolios[selectedPortfolio].education.map((edu, index) => (
                    <li key={index} className="flex gap-2.5 items-start text-sm font-semibold text-[#1C3D5A]">
                      <span className="p-1 bg-teal-50 text-teal-600 rounded-md mt-0.5 shrink-0">
                        ✓
                      </span>
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 font-sans">
                  Fokus Bidang Kajian
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(portfolios[selectedPortfolio]?.focus) && portfolios[selectedPortfolio].focus.map((foc, index) => (
                    <span key={index} className="bg-slate-50 border text-slate-700 text-xs font-bold py-1.5 px-3 rounded-xl">
                      {foc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 flex gap-3.5 items-start">
                <div className="p-2 bg-teal-100 text-teal-700 rounded-xl shrink-0 mt-0.5">
                  🛡️
                </div>
                <div className="space-y-0.5">
                  <h5 className="font-bold text-teal-900 text-sm">Reviewer Kesehatan Terverifikasi</h5>
                  <p className="text-teal-800 text-xs leading-relaxed">
                    {portfolios[selectedPortfolio].verifications}
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Bottom bar */}
            <div className="p-6 bg-slate-50 border-t flex justify-between items-center gap-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Lini Media Resmi PT Rayliziie Media Digital
              </span>
              <button 
                onClick={() => setSelectedPortfolio(null)}
                className="bg-[#1C3D5A] hover:bg-teal-700 text-white font-extrabold py-2 px-5 rounded-full text-xs transition-colors active:scale-95"
              >
                Tutup Portofolio
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================== ARTICLE DETAIL MODAL ==================== */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh] animate-scaleUp">
            
            {/* Header Image & Close Button */}
            <div className="relative h-64 sm:h-80 bg-slate-100 shrink-0">
              <img 
                src={selectedArticle.image_url} 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors active:scale-95 z-10"
              >
                ✕
              </button>
              
              {/* Category & Title Overlaid */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs font-extrabold text-teal-300 bg-teal-950/60 px-3 py-1 rounded-full uppercase tracking-wider block w-fit border border-teal-500/30">
                  {selectedArticle.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                  {selectedArticle.title}
                </h3>
              </div>
            </div>

            {/* Scrollable Article Body Content */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-grow">
              
              {/* Reading Metadata */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-slate-400 border-b border-slate-100 pb-4">
                <span className="flex items-center gap-1.5">
                  👤 Oleh {selectedArticle.author}
                </span>
                <span className="flex items-center gap-1.5">
                  📅 20 Juli 2026
                </span>
                <span className="flex items-center gap-1.5">
                  ⏱️ 5 Menit Baca
                </span>
              </div>

              {/* Parsed paragraphs */}
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                <p className="font-bold text-slate-900 text-base border-l-4 border-teal-500 pl-3 font-sans">
                  {selectedArticle.summary}
                </p>
                
                <p>
                  Nutrisi yang seimbang merupakan fondasi utama dari kesehatan jangka panjang dan pencegahan berbagai penyakit metabolik. Pemenuhan zat gizi makro (karbohidrat kompleks, protein serat tinggi, dan lemak esensial sehat) serta zat gizi mikro (vitamin, mineral, dan antioksidan alami) secara optimal akan menutrisi sel-sel tubuh agar bekerja maksimal.
                </p>
                <p>
                  Berdasarkan hasil uji klinis empiris yang dikaji oleh para pakar gizi kami, pendekatan diet terbaik bukanlah dengan metode ekstrem yang membatasi asupan secara menyiksa, melainkan dengan menerapkan kebiasaan sadar pangan (mindful eating) dan berfokus pada keragaman makanan utuh berbasis pangan lokal (whole foods).
                </p>
                <p>
                  Setiap metabolisme tubuh manusia memiliki profil genetik dan klinis yang sangat unik. Oleh karena itu, konsultasi tatap muka dengan dietitian atau praktisi gizi terakreditasi sebelum menerapkan modifikasi pola makan ekstrem adalah langkah bijak yang sangat direkomendasikan. Lini media resmi PT Rayliziie Media Digital berkomitmen penuh menghadirkan informasi sains terverifikasi klinis bagi Anda.
                </p>
              </div>

              {/* Editorial Certification Stamp */}
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 flex gap-3.5 items-start">
                <div className="p-2 bg-teal-100 text-teal-700 rounded-xl shrink-0 mt-0.5">
                  🛡️
                </div>
                <div className="space-y-1">
                  <h5 className="font-extrabold text-teal-900 text-sm">Telah Ditinjau & Disetujui</h5>
                  <p className="text-teal-800 text-xs leading-relaxed">
                    Artikel ilmiah ini telah melewati proses telaah sejawat (peer-review) yang ketat oleh Komite Reviewer Gizi NutrisiDietMu (<strong>Muhammad Syuhada Ar'rayyan</strong> & <strong>Andina Putri, S.Gz</strong>) dan dinyatakan memenuhi standar akurasi medis PT Rayliziie Media Digital.
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Bottom bar */}
            <div className="p-6 bg-slate-50 border-t flex justify-between items-center gap-4 shrink-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                PT Rayliziie Media Digital • Verified Article
              </span>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="bg-[#1C3D5A] hover:bg-teal-700 text-white font-extrabold py-2 px-6 rounded-full text-xs transition-colors active:scale-95"
              >
                Selesai Membaca
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================== FLOATING CART BUTTON ==================== */}
      {cartItems.length > 0 && (
        <button 
          onClick={() => {
            setCheckoutStep('cart');
            setShowCartModal(true);
          }}
          className="fixed bottom-6 right-6 z-30 bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-full shadow-2xl flex items-center justify-center border-4 border-white transition-transform active:scale-90 animate-bounce"
          title="Keranjang Belanja"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-black px-2.5 py-1 rounded-full border border-white">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        </button>
      )}

      {/* ==================== INTERACTIVE SHOPPING CART MODAL ==================== */}
      {showCartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh] animate-scaleUp">
            
            {/* Header */}
            <div className="p-6 bg-slate-50 border-b flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛒</span>
                <h3 className="text-xl font-bold text-[#1C3D5A]">Keranjang Belanja RayliziieShop</h3>
              </div>
              <button 
                onClick={() => setShowCartModal(false)}
                className="text-slate-400 hover:text-slate-600 font-extrabold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-grow space-y-6">
              
              {checkoutStep === 'cart' && (
                <div className="space-y-4">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center justify-between p-3 border border-slate-100 rounded-2xl">
                      <div className="w-16 h-16 bg-slate-50 rounded-xl p-2 shrink-0 flex items-center justify-center">
                        <img src={item.product.image} alt={item.product.name} className="max-h-full object-contain" />
                      </div>
                      <div className="flex-grow space-y-1">
                        <h4 className="font-bold text-[#2D3748] text-sm leading-tight line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-slate-400 font-medium">{item.product.unit}</p>
                        <p className="text-sm font-extrabold text-orange-500">Rp{item.product.price.toLocaleString('id-ID')}</p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-extrabold text-sm"
                        >
                          -
                        </button>
                        <span className="text-sm font-extrabold text-[#2D3748] w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-extrabold text-sm"
                        >
                          +
                        </button>
                        
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-xl ml-2 transition-colors"
                          title="Hapus"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Summary Box */}
                  <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100">
                    <div className="flex justify-between text-sm font-semibold text-slate-600">
                      <span>Subtotal Produk</span>
                      <span>Rp{calculateGrandTotal().subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-slate-600">
                      <span>Ongkos Kirim (Flat)</span>
                      <span>Rp{calculateGrandTotal().shippingFee.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="border-t border-slate-200 my-2 pt-2 flex justify-between text-base font-black text-[#1C3D5A]">
                      <span>Total Biaya</span>
                      <span className="text-orange-500">Rp{calculateGrandTotal().total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 rounded-2xl transition-all shadow-md shadow-orange-500/20 text-center text-sm"
                  >
                    Lanjutkan ke Pengiriman
                  </button>
                </div>
              )}

              {checkoutStep === 'checkout' && (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <h4 className="font-extrabold text-[#1C3D5A] text-base border-b pb-2">Informasi Alamat Pengiriman</h4>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nama Penerima</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Masukkan nama lengkap" 
                      value={shippingName} 
                      onChange={(e) => setShippingName(e.target.value)} 
                      className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-teal-500 font-medium text-sm text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nomor WhatsApp Aktif</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Contoh: 08123456789" 
                      value={shippingPhone} 
                      onChange={(e) => setShippingPhone(e.target.value)} 
                      className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-teal-500 font-medium text-sm text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                    <textarea 
                      required
                      placeholder="Masukkan nama jalan, nomor rumah, RT/RW, kelurahan, dan kota" 
                      value={shippingAddress} 
                      onChange={(e) => setShippingAddress(e.target.value)} 
                      className="w-full border border-slate-200 rounded-xl p-3 h-24 focus:outline-none focus:border-teal-500 font-medium text-sm text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Metode Pembayaran</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('Transfer Bank')}
                        className={`p-3 border rounded-xl text-xs font-bold transition-all text-center ${paymentMethod === 'Transfer Bank' ? 'border-teal-600 bg-teal-50/50 text-teal-700' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                      >
                        🏦 Transfer Bank
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('E-Wallet (Gopay/OVO)')}
                        className={`p-3 border rounded-xl text-xs font-bold transition-all text-center ${paymentMethod === 'E-Wallet (Gopay/OVO)' ? 'border-teal-600 bg-teal-50/50 text-teal-700' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                      >
                        📱 E-Wallet / QRIS
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm py-3 rounded-xl transition-all text-center"
                    >
                      Kembali ke Detail
                    </button>
                    <button 
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm py-3 rounded-xl transition-all shadow-md shadow-teal-500/20 text-center"
                    >
                      Konfirmasi Pembelian
                    </button>
                  </div>
                </form>
              )}

              {checkoutStep === 'success' && (
                <div className="text-center py-8 space-y-4 animate-fadeIn">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto border-4 border-green-50">
                    ✓
                  </div>
                  <h4 className="text-2xl font-black text-[#1C3D5A]">Pesanan Berhasil Dibuat!</h4>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Terima kasih <strong>{shippingName}</strong>, pembayaran melalui <strong>{paymentMethod}</strong> sedang diproses aman oleh PT Rayliziie Media Digital.
                  </p>
                  
                  <div className="bg-slate-50 p-4 rounded-2xl text-left border text-xs text-slate-600 max-w-sm mx-auto space-y-1">
                    <p><strong>Penerima:</strong> {shippingName}</p>
                    <p><strong>Alamat:</strong> {shippingAddress}</p>
                    <p><strong>Nomor Telp:</strong> {shippingPhone}</p>
                    <p><strong>Total Transfer:</strong> Rp{calculateGrandTotal().total.toLocaleString('id-ID')}</p>
                  </div>

                  <button 
                    onClick={clearCart}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-3 px-8 rounded-full text-sm transition-all"
                  >
                    Kembali Belanja
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* ==================== DOCTOR CONSULTATION MODAL ==================== */}
      {showDoctorModal && activeConsultationProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1C3D5A]">Konsultasi Dokter Ahli</h3>
              <button 
                onClick={() => { setShowDoctorModal(false); setActiveConsultationProduct(null); }}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3.5 items-start">
                <span className="text-xl">🩺</span>
                <div className="space-y-1">
                  <h4 className="font-bold text-orange-900 text-sm">Prasyarat Resep Dokter</h4>
                  <p className="text-orange-800 text-xs leading-relaxed">
                    Produk <strong>{activeConsultationProduct.name}</strong> membutuhkan pengawasan resep medis sebelum diserahkan oleh kurir mitra kami.
                  </p>
                </div>
              </div>

              <p className="text-sm text-[#4A5568] leading-relaxed">
                Kami akan menghubungkan Anda dengan salah satu dokter mitra RayliziieShop yang saat ini aktif untuk memverifikasi kelayakan dosis penggunaan Anda secara gratis.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={() => { setShowDoctorModal(false); setActiveConsultationProduct(null); }}
                className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm py-3 rounded-xl transition-all"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  setShowDoctorModal(false);
                  setActiveConsultationProduct(null);
                  triggerToast("📞 Membuka percakapan aman RayliziieShop dengan Dokter Mitra Anda...");
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm py-3 rounded-xl transition-all shadow-md shadow-orange-500/20"
              >
                Mulai Konsultasi
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

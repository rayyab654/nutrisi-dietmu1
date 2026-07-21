import React, { useState, useEffect, useRef } from 'react';

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
    image_url: "https://cdn.phototourl.com/free/2026-07-19-57505859-4f61-4f2c-8f6f-ccbff3cea499.jpg"
  },
  {
    id: "premium-2",
    title: "Pentingnya Diet Kaya Serat untuk Kesehatan Mikrobioma Usus",
    category: "SAINS PENCERNAAN",
    summary: "Penelitian terbaru membuktikan bahwa konsumsi serat pangan tidak hanya membantu melancarkan sistem pencernaan, melainkan juga menutrisi bakteri usus baik yang berperan dalam memperkuat daya tahan tubuh.",
    author: "Tim Nutrisi",
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "premium-3",
    title: "Membongkar Mitos Diet Rendah Karbohidrat: Tinjauan Medis Fakta vs Fiksi",
    category: "DIETETIKA KLINIS",
    summary: "Apakah benar karbohidrat adalah penyebab utama kenaikan berat badan? Artikel ini membahas proses metabolisme karbohidrat secara empiris serta menguji efektivitas jangka panjang dari diet ketogenik.",
    author: "Tim Gizi",
    image_url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "premium-4",
    title: "Bagaimana Dehidrasi Ringan Mempengaruhi Fungsi Kognitif dan Fokus Kerja",
    category: "HIDRASI TUBUH",
    summary: "Sering merasa lelah dan sulit konsentrasi di siang hari? Uji klinis membuktikan bahwa kekurangan air sebanyak 1% dari total berat tubuh dapat menurunkan daya ingat dan fokus secara signifikan.",
    author: "Ulasan Medis",
    image_url: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&auto=format&fit=crop&q=80"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'shop'
  const [shopView, setShopView] = useState('main'); // 'main' | 'all-categories' | 'products'
  const [selectedCategory, setSelectedCategory] = useState('Obat Maag');
  const [searchQuery, setSearchQuery] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastAction, setToastAction] = useState(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // Mobile Header Dropdown Toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Advanced Cart & Checkout System states
  const [cartItems, setCartItems] = useState([]); 
  const [showCartModal, setShowCartModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transfer Bank (BCA / Mandiri)');
  const [courierMethod, setCourierMethod] = useState('Kurir Instant Apotek (Gojek / Grab) - Rp15.000');
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  // Live Doctor Chat System States
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [isDoctorChatOpen, setIsDoctorChatOpen] = useState(false);
  const [activeConsultationProduct, setActiveConsultationProduct] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userChatInput, setUserChatInput] = useState('');
  const chatBottomRef = useRef(null);

  const [articles, setArticles] = useState(DEFAULT_PREMIUM_ARTICLES);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const triggerToast = (msg, actionBtn = null) => {
    setToastMessage(msg);
    setToastAction(actionBtn);
    setTimeout(() => {
      setToastMessage('');
      setToastAction(null);
    }, 5000);
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

      let fetchedData = [];
      let success = false;

      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/rayliziie_articles?select=*`, { headers });
        if (res.ok) {
          fetchedData = await res.json();
          success = true;
        }
      } catch (e) {
        console.warn("Direct fetch failed, standby mode engaged.");
      }

      if (success && Array.isArray(fetchedData) && fetchedData.length > 0) {
        const mappedData = fetchedData
          .filter(item => item !== null && typeof item === 'object')
          .map((item, idx) => {
            const rawCover = String(item.image_url || item.cover || item.thumbnail || item.img || '').trim();
            const isArticleOne = idx === 0 || (item.title && item.title.toUpperCase().includes("MENGUASAI"));

            let finalImageUrl = rawCover;
            if (!rawCover || rawCover === '' || rawCover.toLowerCase() === 'cover' || isArticleOne) {
              finalImageUrl = "https://cdn.phototourl.com/free/2026-07-19-57505859-4f61-4f2c-8f6f-ccbff3cea499.jpg";
            }

            return {
              id: item.id || Math.random().toString(),
              title: item.title || item.judul || "Artikel Nutrisi Baru",
              category: item.category || item.kategori || "GIZI",
              summary: item.summary || item.content || item.isi || item.deskripsi || "Informasi sains gizi tervalidasi.",
              author: item.author || item.penulis || "Sinta andini",
              status: item.status || 'published',
              approved: item.approved !== undefined ? item.approved : (item.is_approved !== undefined ? item.is_approved : true),
              image_url: finalImageUrl
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
      } else {
        setArticles(DEFAULT_PREMIUM_ARTICLES);
      }
    } catch (err) {
      setArticles(DEFAULT_PREMIUM_ARTICLES);
    } finally {
      setLoadingArticles(false);
    }
  };

  useEffect(() => {
    fetchArticlesSilently();
  }, []);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isDoctorChatOpen]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscribedEmail) {
      triggerToast(`Terima kasih! Email ${subscribedEmail} berhasil didaftarkan.`);
      setSubscribedEmail('');
    }
  };

  const getProductsForCategory = (categoryName) => {
    const cleanCat = String(categoryName || 'Obat Maag').trim();
    
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

    triggerToast(
      `🛒 "${product.name}" ditambahkan ke keranjang.`,
      <button 
        onClick={() => {
          setCheckoutStep('cart');
          setShowCartModal(true);
        }}
        className="ml-2 bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-3 py-1 rounded-lg text-xs"
      >
        Lihat Keranjang →
      </button>
    );
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

  const calculateGrandTotal = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const shippingFee = courierMethod.includes('Gojek') ? 15000 : 20000;
    return { subtotal, shippingFee, total: subtotal + shippingFee };
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!shippingName || !shippingAddress || !shippingPhone) {
      triggerToast("⚠️ Mohon lengkapi semua kolom pengiriman.");
      return;
    }

    const orderId = `RD-SHOP-${Math.floor(100000 + Math.random() * 900000)}`;
    const grandTotal = calculateGrandTotal();

    const orderSummary = {
      orderId,
      name: shippingName,
      phone: shippingPhone,
      address: shippingAddress,
      payment: paymentMethod,
      courier: courierMethod,
      items: [...cartItems],
      subtotal: grandTotal.subtotal,
      shippingFee: grandTotal.shippingFee,
      total: grandTotal.total,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    setLastOrderDetails(orderSummary);
    setCheckoutStep('success');
  };

  const sendOrderToWhatsApp = () => {
    if (!lastOrderDetails) return;
    const itemsList = lastOrderDetails.items
      .map(item => `• ${item.product.name} (x${item.quantity}) - Rp${(item.product.price * item.quantity).toLocaleString('id-ID')}`)
      .join('\n');

    const textMsg = 
`*PESANAN BARU RAYLIZIIESHOP* 🛍️
----------------------------------
*No. Pesanan:* ${lastOrderDetails.orderId}
*Tanggal:* ${lastOrderDetails.date}

*NAMA PEMBELI:* ${lastOrderDetails.name}
*NO. WHATSAPP:* ${lastOrderDetails.phone}
*ALAMAT PENGIRIMAN:*
${lastOrderDetails.address}

*DAFTAR OBAT / NUTRITION:*
${itemsList}

----------------------------------
*Subtotal:* Rp${lastOrderDetails.subtotal.toLocaleString('id-ID')}
*Ongkos Kirim:* Rp${lastOrderDetails.shippingFee.toLocaleString('id-ID')}
*TOTAL BAYAR:* Rp${lastOrderDetails.total.toLocaleString('id-ID')}
*METODE BAYAR:* ${lastOrderDetails.payment}
*KURIR:* ${lastOrderDetails.courier}
----------------------------------
Mohon segera diproses dan dikirim dari Apotek terdekat! Terima Kasih.`;

    const encodedText = encodeURIComponent(textMsg);
    window.open(`https://wa.me/6285762552898?text=${encodedText}`, '_blank');
  };

  const clearCart = () => {
    setCartItems([]);
    setCheckoutStep('cart');
    setShowCartModal(false);
    triggerToast("✨ Pembelian sukses! Kami akan segera mengirimkan pesanan Anda.");
  };

  const handleStartDoctorChat = (product) => {
    setShowDoctorModal(false);
    setIsDoctorChatOpen(true);
    
    setChatMessages([
      {
        id: 1,
        sender: 'doctor',
        text: `Halo, selamat datang di Layanan Konsultasi Dokter RayliziieShop! 🩺\n\nSaya Dr. Hendra, Sp.GK. Saya siap memberikan panduan medis mengenai ${product ? product.name : 'keluhan kesehatan Anda'}.\n\nApa gejala atau pertanyaan yang ingin Anda tanyakan hari ini?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!userChatInput.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userChatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const promptText = userChatInput.toLowerCase();
    setUserChatInput('');

    setTimeout(() => {
      let docReply = "Terima kasih atas penjelasannya. Untuk memastikan keamanan penggunaan obat, pastikan diminum sesuai petunjuk kemasan. Apakah ada gejala lain yang dirasakan?";
      
      if (promptText.includes('maag') || promptText.includes('lambung') || promptText.includes('perut') || promptText.includes('perih')) {
        docReply = "Untuk keluhan maag atau asam lambung perih:\n• Minum obat antasida atau suspensi 30 menit sebelum makan.\n• Hindari makanan pedas, santan kental, serta kopi selama pemulihan.\n\nApakah Anda ingin menambahkan obat maag ini ke keranjang belanja?";
      } else if (promptText.includes('pusing') || promptText.includes('sakit kepala') || promptText.includes('migrain')) {
        docReply = "Untuk pusing atau sakit kepala ringan:\n• Istirahat di ruangan redup dan konsumsi air putih secukupnya.\n• Jika mengganggu, parasetamol 500mg setelah makan dapat meredakan nyeri.\n\nBila pusing terus menerus >3 hari, harap diperiksakan langsung ya.";
      } else if (promptText.includes('flu') || promptText.includes('batuk') || promptText.includes('pilek') || promptText.includes('demam')) {
        docReply = "Untuk flu dan batuk:\n• Perbanyak istirahat dan konsumsi air hangat serta Vitamin C.\n• Sediaan sirup/tablet flu efektif meredakan hidung tersumbat.\n\nApakah ingin memesan sediaan obat flu untuk dikirim dari Apotek terdekat?";
      } else if (promptText.includes('beli') || promptText.includes('pesan') || promptText.includes('obat')) {
        docReply = "Tentu! Anda dapat langsung menekan tombol '+ Beli' pada daftar produk obat atau membuka Keranjang Belanja untuk langsung memesan.";
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'doctor',
          text: docReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
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
      bio: "Muhammad Syuhada Ar'rayyan menjabat sebagai Komite Editorial & Reviewer Gizi untuk lini media NutrisiDietMu di bawah naungan PT Rayliziie Media Digital. Memiliki spesialisasi dalam mengkaji keakuratan data riset gizi klinis untuk publikasi digital."
    },
    andina: {
      name: "Andina Putri, S.Gz",
      role: "Komite Editorial & Reviewer Gizi",
      institution: "Universitas Negeri Medan",
      avatarBg: "from-teal-500 to-emerald-700",
      bio: "Andina Putri, S.Gz merupakan seorang pakar gizi lulusan Universitas Negeri Medan yang berdedikasi memformulasikan pola makan sehat untuk pencegahan penyakit metabolik. Menjabat sebagai penelaah klinis utama di lini NutrisiDietMu."
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-[#1A365D] font-sans selection:bg-teal-500 selection:text-white flex flex-col justify-between relative pb-20 md:pb-0">
      
      {/* ==================== TOAST NOTIFICATION ==================== */}
      {toastMessage && (
        <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 z-50 bg-teal-950 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-teal-600 animate-bounce">
          <div className="p-1 bg-teal-500 rounded-full text-white shrink-0">
            ✓
          </div>
          <span className="font-medium text-xs sm:text-sm">{toastMessage}</span>
          {toastAction}
        </div>
      )}

      {/* ==================== HEADER ==================== */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo / Home Brand */}
          <div 
            onClick={() => { setActiveTab('home'); setShopView('main'); window.scrollTo({top:0, behavior:'smooth'}); }}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <span className="bg-[#1C3D5A] p-2 rounded-xl text-white transition-all duration-300 group-hover:bg-teal-600">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1C3D5A]">
              Nutrisi<span className="text-teal-600 font-medium">DietMu</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
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

          {/* Header Action Buttons (Cart + Subscribe) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Header Cart Button - ALWAYS ACCESSIBLE */}
            <button 
              onClick={() => {
                setCheckoutStep('cart');
                setShowCartModal(true);
              }}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm flex items-center gap-2 border border-blue-200 transition-all active:scale-95 relative"
              title="Keranjang Belanja"
            >
              <span className="text-base sm:text-lg">🛒</span>
              <span className="hidden sm:inline">Keranjang</span>
              {totalCartCount > 0 && (
                <span className="bg-orange-500 text-white text-[10px] sm:text-xs font-black px-1.5 py-0.5 rounded-full">
                  {totalCartCount}
                </span>
              )}
            </button>

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
              className="bg-[#2CB1BC] hover:bg-teal-700 text-white font-bold py-2 px-3 sm:py-2.5 sm:px-5 rounded-full text-xs sm:text-sm shadow-md shadow-teal-600/25 transition-all active:scale-95"
            >
              Berlangganan
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1C3D5A] hover:bg-slate-50 rounded-xl border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2 animate-fadeIn">
            <button 
              onClick={() => { setActiveTab('home'); setShopView('main'); setMobileMenuOpen(false); }}
              className={`w-full text-left py-2.5 px-4 rounded-xl font-bold text-sm ${activeTab === 'home' ? 'bg-teal-50 text-teal-700' : 'text-[#4A5568]'}`}
            >
              🏡 Beranda Edukasi
            </button>
            <button 
              onClick={() => { setActiveTab('shop'); setShopView('main'); setMobileMenuOpen(false); }}
              className={`w-full text-left py-2.5 px-4 rounded-xl font-bold text-sm ${activeTab === 'shop' ? 'bg-teal-50 text-teal-700' : 'text-[#4A5568]'}`}
            >
              💊 Toko Obat (RayliziieShop)
            </button>
            <button 
              onClick={() => { setIsDoctorChatOpen(true); setMobileMenuOpen(false); }}
              className="w-full text-left py-2.5 px-4 rounded-xl font-bold text-sm text-orange-600 bg-orange-50"
            >
              🩺 Live Konsultasi Dokter
            </button>
            <button 
              onClick={() => { setShowCartModal(true); setCheckoutStep('cart'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2.5 px-4 rounded-xl font-bold text-sm text-blue-600 bg-blue-50 flex items-center justify-between"
            >
              <span>🛒 Keranjang Belanja</span>
              {totalCartCount > 0 && (
                <span className="bg-orange-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                  {totalCartCount} Produk
                </span>
              )}
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">

        {/* ==================== VIEW 1: BERANDA ==================== */}
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-12 sm:pb-20 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-50 text-teal-700 rounded-full text-xs font-bold tracking-wide uppercase">
                  <span>🔬 Berbasis Bukti Ilmiah</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C3D5A] leading-tight tracking-tight">
                  Edukasi Nutrisi Berbasis <br />
                  <span className="relative inline-block text-teal-600">
                    Sains yang Dapat Anda Percayai.
                    <span className="absolute left-0 bottom-1 w-full h-1 bg-teal-600/30 rounded"></span>
                  </span>
                </h1>
                <p className="text-sm sm:text-lg text-[#4A5568] leading-relaxed max-w-2xl font-normal">
                  NutrisiDietMu menerjemahkan riset klinis yang mendalam menjadi panduan yang jelas dan jujur. Kami membantu pembaca awam maupun profesional kesehatan mengambil keputusan yang tepat seputar makanan.
                </p>
                <div className="pt-2 sm:pt-4 flex flex-wrap gap-3 sm:gap-4 items-center">
                  <button 
                    onClick={() => document.getElementById('artikel-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-[#1C3D5A] hover:bg-teal-700 text-white font-bold py-3 px-5 sm:py-3.5 sm:px-6 rounded-full inline-flex items-center gap-2 group shadow-lg shadow-[#1C3D5A]/10 transition-all active:scale-95 text-sm sm:text-base"
                  >
                    Baca Artikel Terbaru 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('shop'); setShopView('main'); }}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-5 sm:py-3.5 sm:px-6 rounded-full inline-flex items-center gap-2 transition-all active:scale-95 text-sm sm:text-base"
                  >
                    🛒 Beli Obat di RayliziieShop
                  </button>
                </div>
              </div>

              {/* Cover Graphic Card */}
              <div className="lg:col-span-5 relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-teal-100 to-indigo-100 rounded-3xl blur-2xl opacity-70 -z-10"></div>
                <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="text-xs sm:text-sm font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">Jurnal Minggu Ini</span>
                    <span className="text-[10px] sm:text-xs text-[#718096]">Terbitan Juli 2026</span>
                  </div>
                  <div className="h-44 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-medium overflow-hidden relative border border-slate-200">
                    <img 
                      src="https://cdn.phototourl.com/free/2026-07-19-57505859-4f61-4f2c-8f6f-ccbff3cea499.jpg" 
                      alt="Salmon avocado lemon water healthy scientific diet" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <p className="text-white font-bold text-xs sm:text-sm leading-snug">Metode Diet Mediterania Baru Hasil Uji Klinis</p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-6 space-y-3">
                    <div className="flex gap-3 items-start">
                      <div className="p-1 bg-green-100 text-green-700 rounded-full mt-0.5 shrink-0">
                        ✓
                      </div>
                      <p className="text-xs sm:text-sm text-[#4A5568] font-medium">Uji klinis acak tersamar ganda pada 5.200 partisipan.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust Pillars Section */}
            <section className="bg-slate-50 py-12 sm:py-20 border-y border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-6 sm:gap-12">
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1C3D5A] mb-2">Sumber Telaah Sejawat (Peer-Reviewed)</h3>
                    <p className="text-[#4A5568] leading-relaxed text-xs sm:text-sm">
                      Setiap klaim yang kami tulis wajib merujuk langsung pada literatur primer dan pedoman klinis resmi.
                    </p>
                  </div>
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1C3D5A] mb-2">Ditinjau oleh Ahli Gizi</h3>
                    <p className="text-[#4A5568] leading-relaxed text-xs sm:text-sm">
                      Setiap artikel diperiksa secara ketat oleh Ahli Gizi (Dietitian) terdaftar sebelum diterbitkan.
                    </p>
                  </div>
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1C3D5A] mb-2">Ditulis untuk Kejelasan</h3>
                    <p className="text-[#4A5568] leading-relaxed text-xs sm:text-sm">
                      Sains yang rumit kami terjemahkan menjadi panduan praktis yang jujur dan mudah dipahami.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Artikel Terbaru Section */}
            <section id="artikel-section" className="py-12 sm:py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                  <span className="text-xs font-extrabold text-teal-600 uppercase tracking-widest block mb-1">PUSTAKA ILMIAH</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#1C3D5A] tracking-tight">Artikel Terbaru</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {Array.isArray(articles) && articles.map((article, idx) => (
                    <div 
                      key={article.id || idx} 
                      onClick={() => setSelectedArticle(article)}
                      className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="h-48 sm:h-56 bg-slate-100 overflow-hidden relative">
                          <img 
                            src={article.image_url} 
                            alt={article.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-5 sm:p-6 space-y-2">
                          <span className="text-[10px] sm:text-xs font-extrabold text-teal-600 tracking-wider uppercase">
                            {article.category}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-[#1C3D5A] leading-snug line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-[#4A5568] text-xs sm:text-sm line-clamp-3">
                            {article.summary}
                          </p>
                        </div>
                      </div>
                      <div className="p-5 sm:p-6 pt-0 flex justify-between items-center border-t border-slate-50 mt-4">
                        <span className="text-teal-600 font-bold text-xs sm:text-sm">
                          Baca Selengkapnya →
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">
                          Oleh {article.author}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================== VIEW 2: TOKO NUTRISI DIETMU (RAYLIZIIESHOP) ==================== */}
        {activeTab === 'shop' && (
          <div className="animate-fadeIn">
            {shopView === 'main' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-10">
                <div className="bg-[#1C3D5A] rounded-3xl p-6 sm:p-12 text-white relative overflow-hidden shadow-lg shadow-blue-900/10">
                  <div className="max-w-3xl space-y-4 sm:space-y-6">
                    <nav className="text-xs text-teal-200 flex items-center gap-2">
                      <span className="hover:underline cursor-pointer" onClick={() => setActiveTab('home')}>Home</span>
                      <span>/</span>
                      <span className="font-semibold text-white">RayliziieShop</span>
                    </nav>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Toko Nutrisi Dietmu (RayliziieShop)</h2>
                      <p className="text-teal-100 font-medium text-xs sm:text-base">Solusi Nutrisi & Obat Terdekat Aman, Legal, dan Terpercaya</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 bg-white p-2 rounded-2xl shadow-xl max-w-2xl">
                      <div className="flex-grow flex items-center px-3 gap-2.5">
                        <svg className="text-slate-400 w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                          type="text" 
                          placeholder="Cari obat, vitamin, resep dokter..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full py-2 text-slate-900 placeholder-slate-400 font-medium focus:outline-none text-sm sm:text-base"
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
                        className="bg-teal-600 hover:bg-[#1C3D5A] text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                      >
                        Cari Obat
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-2xl font-bold text-[#1C3D5A]">Kategori Pilihan</h3>
                    <button 
                      onClick={() => setShopView('all-categories')}
                      className="text-teal-600 hover:text-teal-700 font-extrabold text-xs sm:text-base flex items-center gap-1 hover:underline"
                    >
                      Lihat Semua ({ALL_CATEGORIES.length}) →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {PREVIEW_CATEGORIES.map((cat, index) => (
                      <div 
                        key={index}
                        onClick={() => handleCategorySelection(cat.name)}
                        className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center space-y-3 group"
                      >
                        <div className={`w-12 h-12 ${cat.color} rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                          {cat.icon}
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-[#2D3748] leading-tight group-hover:text-teal-600 transition-colors">
                          {cat.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {shopView === 'all-categories' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-xl sm:text-3xl font-extrabold text-[#1C3D5A]">Pilih Kategori Obat</h2>
                  <button 
                    onClick={() => setShopView('main')}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full"
                  >
                    ← Kembali ke RayliziieShop
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex items-center gap-3 max-w-lg shadow-sm">
                  <input 
                    type="text" 
                    placeholder="Cari Kategori Obat..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="w-full bg-transparent border-none text-slate-900 focus:outline-none font-medium text-sm"
                  />
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-12 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
                    {filteredAllCategories.map((item, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => handleCategorySelection(item)}
                        className="py-1 border-b border-dashed border-slate-100 hover:border-teal-300 group cursor-pointer flex items-center justify-between"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-[#4A5568] group-hover:text-teal-600">
                          {item}
                        </span>
                        <span className="text-slate-300 group-hover:text-teal-600">→</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {shopView === 'products' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-4 border-slate-100">
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Menampilkan obat untuk <span className="font-bold text-orange-500">"{selectedCategory}"</span>
                  </p>
                  <button 
                    onClick={() => setShopView('all-categories')}
                    className="text-xs sm:text-sm font-bold text-teal-600 hover:underline"
                  >
                    ← Pilih Kategori Lain
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                  {getProductsForCategory(selectedCategory).map((product, idx) => (
                    <div 
                      key={product.id || idx}
                      className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 p-3 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-3">
                        <div className="h-32 sm:h-44 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center relative p-2">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="max-h-full object-contain"
                          />
                          {product.needDoctor && (
                            <span className="absolute top-2 left-2 bg-red-50 text-red-600 text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-red-100">
                              Resep Dokter
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-extrabold text-[#2D3748] text-xs sm:text-base leading-tight line-clamp-2">
                            {product.name}
                          </h4>
                          <p className="text-slate-400 text-[10px] sm:text-xs font-semibold">
                            {product.unit}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-1">
                        <p className="text-sm sm:text-xl font-black text-orange-500">
                          Rp{product.price.toLocaleString('id-ID')}
                        </p>

                        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                          <button 
                            onClick={() => {
                              setActiveConsultationProduct(product);
                              setShowDoctorModal(true);
                            }}
                            className="border border-orange-500 hover:bg-orange-50 text-orange-500 font-extrabold text-[10px] sm:text-xs py-2 rounded-xl transition-all text-center"
                          >
                            Chat Dokter
                          </button>
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-[10px] sm:text-xs py-2 rounded-xl transition-all text-center shadow-sm"
                          >
                            + Beli
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

        {/* ==================== NEWSLETTER ==================== */}
        <section id="newsletter-section" className="bg-[#1D324F] py-12 sm:py-20 text-white border-t border-[#1a2d48]">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Intisari Sains Nutrisi Langsung di Email Anda
            </h2>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 bg-transparent p-1 max-w-xl mx-auto">
              <input 
                type="email" 
                required
                placeholder="masukkan@email.com" 
                value={subscribedEmail}
                onChange={(e) => setSubscribedEmail(e.target.value)}
                className="w-full bg-white rounded-full px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none text-sm font-medium"
              />
              <button 
                type="submit"
                className="bg-[#2CB1BC] hover:bg-[#228e97] text-white font-bold py-3 px-8 rounded-full text-sm shadow-md shrink-0"
              >
                Berlangganan
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* ==================== BOTTOM MOBILE NAVIGATION BAR (ALWAYS ACCESSIBLE) ==================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex justify-around items-center py-2 px-1 shadow-2xl">
        <button 
          onClick={() => { setActiveTab('home'); setShopView('main'); window.scrollTo({top:0, behavior:'smooth'}); }}
          className={`flex flex-col items-center gap-1 text-[11px] font-extrabold ${activeTab === 'home' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <span className="text-lg">🏡</span>
          <span>Beranda</span>
        </button>

        <button 
          onClick={() => { setActiveTab('shop'); setShopView('main'); window.scrollTo({top:0, behavior:'smooth'}); }}
          className={`flex flex-col items-center gap-1 text-[11px] font-extrabold ${activeTab === 'shop' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <span className="text-lg">💊</span>
          <span>Toko Obat</span>
        </button>

        <button 
          onClick={() => setIsDoctorChatOpen(true)}
          className="flex flex-col items-center gap-1 text-[11px] font-extrabold text-orange-500"
        >
          <span className="text-lg">🩺</span>
          <span>Chat Dokter</span>
        </button>

        <button 
          onClick={() => { setShowCartModal(true); setCheckoutStep('cart'); }}
          className="flex flex-col items-center gap-1 text-[11px] font-extrabold text-blue-600 relative"
        >
          <span className="text-lg">🛒</span>
          <span>Keranjang</span>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 right-2 bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-white border-t border-slate-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-xs text-[#A0AEC0]">
          <p>© 2026 NutrisiDietMu. Hak Cipta Dilindungi Undang-Undang. Lini Media Resmi dari PT Rayliziie Media Digital.</p>
        </div>
      </footer>

      {/* ==================== FLOATING DESKTOP CART BUTTON ==================== */}
      {totalCartCount > 0 && (
        <button 
          onClick={() => {
            setCheckoutStep('cart');
            setShowCartModal(true);
          }}
          className="hidden md:flex fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl items-center justify-center border-4 border-white transition-transform active:scale-95 animate-bounce"
          title="Buka Keranjang Belanja"
        >
          <span className="text-2xl">🛒</span>
          <span className="ml-2 font-black text-sm">Keranjang Belanja</span>
          <span className="ml-2 bg-orange-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
            {totalCartCount}
          </span>
        </button>
      )}

      {}
      {/* ==================== INTERACTIVE REAL LIVE CHAT DOKTER MODAL ==================== */}
      {isDoctorChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col h-[85vh] max-h-[650px]">
            
            {/* Chat Header */}
            <div className="p-4 bg-[#1C3D5A] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg border-2 border-white">
                  🩺
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base leading-tight">Dr. Hendra, Sp.GK</h3>
                  <p className="text-[11px] text-teal-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span>
                    Aktif • Dokter Spesialis Gizi Klinis
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsDoctorChatOpen(false)}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="p-4 overflow-y-auto flex-grow space-y-3.5 bg-slate-50">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm font-medium shadow-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-teal-600 text-white rounded-br-none' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Direct WhatsApp Call Banner */}
            <div className="p-2.5 bg-green-50 border-t border-green-100 flex items-center justify-between text-xs text-green-800 shrink-0">
              <span className="font-bold">Butuh balasan instan via WA?</span>
              <button 
                onClick={() => window.open('https://wa.me/6285762552898?text=Halo%20Dokter%20RayliziieShop%2C%20saya%20ingin%20konsultasi%20resep%20obat', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-3 py-1 rounded-full text-[11px]"
              >
                Chat WhatsApp Dokter
              </button>
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendChatMessage} className="p-3 bg-white border-t flex items-center gap-2 shrink-0">
              <input 
                type="text" 
                placeholder="Tulis keluhan (contoh: obat maag, pusing, flu)..." 
                value={userChatInput}
                onChange={(e) => setUserChatInput(e.target.value)}
                className="flex-grow border border-slate-200 rounded-full px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
              />
              <button 
                type="submit"
                className="bg-[#1C3D5A] hover:bg-teal-700 text-white p-2.5 rounded-full shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>

          </div>
        </div>
      )}

      {/* ==================== PRE-CONSULTATION MODAL ==================== */}
      {showDoctorModal && activeConsultationProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold text-[#1C3D5A]">Konsultasi Resep Dokter</h3>
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
                    Produk <strong>{activeConsultationProduct.name}</strong> membutuhkan konfirmasi dokter mitra sebelum pengiriman.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={() => { setShowDoctorModal(false); setActiveConsultationProduct(null); }}
                className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm py-3 rounded-xl transition-all"
              >
                Batal
              </button>
              <button 
                onClick={() => handleStartDoctorChat(activeConsultationProduct)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-md shadow-orange-500/20"
              >
                Mulai Chat Live
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== E-COMMERCE CHECKOUT MODAL ==================== */}
      {showCartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-slate-50 border-b flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛍️</span>
                <h3 className="text-base sm:text-xl font-bold text-[#1C3D5A]">
                  {checkoutStep === 'cart' && 'Keranjang Belanja RayliziieShop'}
                  {checkoutStep === 'checkout' && 'Form Pengiriman & Pembayaran'}
                  {checkoutStep === 'success' && 'Faktur Pesanan Apotek'}
                </h3>
              </div>
              <button 
                onClick={() => setShowCartModal(false)}
                className="text-slate-400 hover:text-slate-600 font-extrabold text-lg"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-grow space-y-6">
              
              {checkoutStep === 'cart' && (
                <div className="space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-10 space-y-3">
                      <span className="text-4xl">🛒</span>
                      <p className="text-slate-500 font-medium text-sm">Keranjang belanja Anda masih kosong.</p>
                      <button 
                        onClick={() => {
                          setShowCartModal(false);
                          setActiveTab('shop');
                          setShopView('main');
                        }}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-6 rounded-full text-xs"
                      >
                        Mulai Belanja Obat
                      </button>
                    </div>
                  ) : (
                    <>
                      {cartItems.map((item, idx) => (
                        <div key={idx} className="flex gap-3 sm:gap-4 items-center justify-between p-3 border border-slate-100 rounded-2xl">
                          <div className="w-14 h-14 bg-slate-50 rounded-xl p-1.5 shrink-0 flex items-center justify-center">
                            <img src={item.product.image} alt={item.product.name} className="max-h-full object-contain" />
                          </div>
                          <div className="flex-grow space-y-0.5">
                            <h4 className="font-bold text-[#2D3748] text-xs sm:text-sm leading-tight line-clamp-1">{item.product.name}</h4>
                            <p className="text-[10px] text-slate-400 font-medium">{item.product.unit}</p>
                            <p className="text-xs sm:text-sm font-extrabold text-orange-500">Rp{item.product.price.toLocaleString('id-ID')}</p>
                          </div>
                          
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, -1)}
                              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-extrabold text-xs"
                            >
                              -
                            </button>
                            <span className="text-xs font-extrabold text-[#2D3748] w-5 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, 1)}
                              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-extrabold text-xs"
                            >
                              +
                            </button>
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded-lg ml-1"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}

                      <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100 text-xs sm:text-sm">
                        <div className="flex justify-between font-semibold text-slate-600">
                          <span>Subtotal Produk</span>
                          <span>Rp{calculateGrandTotal().subtotal.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-slate-600">
                          <span>Estimasi Ongkir</span>
                          <span>Rp{calculateGrandTotal().shippingFee.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="border-t border-slate-200 my-2 pt-2 flex justify-between text-sm sm:text-base font-black text-[#1C3D5A]">
                          <span>Total Biaya</span>
                          <span className="text-orange-500">Rp{calculateGrandTotal().total.toLocaleString('id-ID')}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => setCheckoutStep('checkout')}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 rounded-2xl transition-all shadow-md text-center text-xs sm:text-sm"
                      >
                        Lanjutkan Beli Obat (Checkout)
                      </button>
                    </>
                  )}
                </div>
              )}

              {checkoutStep === 'checkout' && (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs sm:text-sm">
                  <h4 className="font-extrabold text-[#1C3D5A] border-b pb-2">Informasi Alamat & Pengiriman</h4>
                  
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase text-[10px]">Nama Lengkap Penerima</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Masukkan nama lengkap" 
                      value={shippingName} 
                      onChange={(e) => setShippingName(e.target.value)} 
                      className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-teal-500 font-medium text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase text-[10px]">Nomor WhatsApp Aktif</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Contoh: 08123456789" 
                      value={shippingPhone} 
                      onChange={(e) => setShippingPhone(e.target.value)} 
                      className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-teal-500 font-medium text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase text-[10px]">Alamat Lengkap Pengiriman</label>
                    <textarea 
                      required
                      placeholder="Nama jalan, nomor rumah, RT/RW, kecamatan, kota" 
                      value={shippingAddress} 
                      onChange={(e) => setShippingAddress(e.target.value)} 
                      className="w-full border border-slate-200 rounded-xl p-2.5 h-20 focus:outline-none focus:border-teal-500 font-medium text-slate-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase text-[10px]">Pilih Metode Pengiriman (Kurir)</label>
                    <select 
                      value={courierMethod}
                      onChange={(e) => setCourierMethod(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl p-2.5 bg-white font-medium text-slate-900 focus:outline-none"
                    >
                      <option value="Kurir Instant Apotek (Gojek / Grab) - Rp15.000">🛵 Kurir Instant Apotek (Gojek / Grab) - Rp15.000</option>
                      <option value="Reguler SiCepat / JNE / J&T - Rp20.000">🚚 Reguler (SiCepat / JNE) - Rp20.000</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase text-[10px]">Pilih Metode Pembayaran</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('Transfer Bank (BCA / Mandiri)')}
                        className={`p-2.5 border rounded-xl text-xs font-bold transition-all text-center ${paymentMethod.includes('Bank') ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-600'}`}
                      >
                        🏦 Transfer Bank
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod('COD (Bayar di Tempat Saat Obat Sampai)')}
                        className={`p-2.5 border rounded-xl text-xs font-bold transition-all text-center ${paymentMethod.includes('COD') ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-600'}`}
                      >
                        💵 COD (Bayar di Tempat)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <button 
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 rounded-xl transition-all text-center"
                    >
                      Kembali
                    </button>
                    <button 
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold py-3 rounded-xl transition-all shadow-md text-center"
                    >
                      Buat Pesanan Obat
                    </button>
                  </div>
                </form>
              )}

              {checkoutStep === 'success' && lastOrderDetails && (
                <div className="text-center py-4 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto border-4 border-green-50">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-[#1C3D5A]">Pesanan Berhasil Dibuat!</h4>
                    <p className="text-xs text-slate-500 mt-1">No. Invoice: <strong className="text-teal-600">{lastOrderDetails.orderId}</strong></p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-200 text-xs space-y-2 text-slate-700">
                    <div className="flex justify-between border-b pb-2 font-bold">
                      <span>Penerima: {lastOrderDetails.name}</span>
                      <span>{lastOrderDetails.phone}</span>
                    </div>
                    <p><strong>Alamat:</strong> {lastOrderDetails.address}</p>
                    <p><strong>Metode Bayar:</strong> {lastOrderDetails.payment}</p>
                    <p><strong>Pengiriman:</strong> {lastOrderDetails.courier}</p>
                    <div className="border-t pt-2 flex justify-between font-extrabold text-sm text-[#1C3D5A]">
                      <span>Total Tagihan:</span>
                      <span className="text-orange-500">Rp{lastOrderDetails.total.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button 
                      onClick={sendOrderToWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-3 px-6 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>💬 Send Order Receipt to WhatsApp Admin</span>
                    </button>
                    <button 
                      onClick={clearCart}
                      className="w-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold py-2.5 px-6 rounded-2xl text-xs transition-all"
                    >
                      Selesai & Kembali Belanja
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ==================== PORTFOLIO MODAL ==================== */}
      {selectedPortfolio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4">
            <h3 className="text-xl font-bold text-[#1C3D5A]">{portfolios[selectedPortfolio].name}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{portfolios[selectedPortfolio].bio}</p>
            <button 
              onClick={() => setSelectedPortfolio(null)}
              className="bg-[#1C3D5A] text-white font-bold py-2 px-4 rounded-full text-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* ==================== ARTICLE DETAIL MODAL ==================== */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="h-48 sm:h-64 relative bg-slate-100">
              <img src={selectedArticle.image_url} alt={selectedArticle.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full text-xs"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
              <h3 className="text-lg sm:text-xl font-bold text-[#1C3D5A]">{selectedArticle.title}</h3>
              <p className="font-semibold text-teal-700">{selectedArticle.summary}</p>
              <p>Artikel ini telah ditinjau dan disetujui oleh Komite Editorial & Reviewer Gizi NutrisiDietMu (Muhammad Syuhada Ar'rayyan & Andina Putri, S.Gz).</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

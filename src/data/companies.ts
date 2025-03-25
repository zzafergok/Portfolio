// Şirketler veri yapısı
export interface Company {
  id: number;
  name: string;
  logo: string;
  subsidiaries: string[];
}

export interface Sector {
  id: number;
  name: string;
  companies: Company[];
}

export interface CompaniesDataType {
  sectors: Sector[];
}

// JSON verisi
export const companiesData: CompaniesDataType = {
  sectors: [
    {
      id: 1,
      name: 'İnşaat ve Altyapı',
      companies: [
        {
          id: 101,
          name: 'Kalyon Holding',
          logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQHZgUwmunNIyQ/company-logo_200_200/company-logo_200_200/0/1711697863118/kalyonholding_logo?e=2147483647&v=beta&t=nocFtqgkrUzrpJ_IQtMOEpRnHT0wwaVwZTLKuQjcz30',
          subsidiaries: [
            'Kalyon İnşaat',
            'Kalyon Enerji',
            'Kalyon Gayrimenkul',
            'Kalyon Havacılık',
            'Kalyon Stadyum',
          ],
        },
        {
          id: 102,
          name: 'Cengiz Holding',
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaaVvcdm18XJoTE78IXLamAkv-GCOmI8jm59LPwfzBqeL0GGI3HWXcYIU2h4EaQEwpu98&usqp=CAU',
          subsidiaries: [
            'Cengiz İnşaat',
            'Eti Bakır',
            'Eti Alüminyum',
            'Cengiz Enerji',
            'Cengiz Elektrik',
          ],
        },
        {
          id: 103,
          name: 'Limak Holding',
          logo: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0019/5583/brand.gif?itok=jJ-QGqSg',
          subsidiaries: [
            'Limak İnşaat',
            'Limak Enerji',
            'Limak Çimento',
            'Limak Elektrik',
            'Limak Turizm',
          ],
        },
        {
          id: 104,
          name: 'Kolin İnşaat',
          logo: 'https://www.tekbirkarotbetonkesmedelme.com.tr/uploads/refs/kolin-insaat.png',
          subsidiaries: [
            'Kolin Enerji',
            'Kolin Turizm',
            'Konut İnşaat',
            'Kolin Tarım',
          ],
        },
        {
          id: 105,
          name: 'MNG Holding',
          logo: 'https://cdn.webtekno.com/media/cache/content_detail_v2/article/27160/mng-holding-turkiye-nin-en-pahali-alan-adi-satin-alimini-gerceklestirdi-1490706424.jpg',
          subsidiaries: [
            'MNG İnşaat',
            'MNG Kargo',
            'MNG Havayolları',
            'MNG Faktoring',
            'MNG Turizm',
          ],
        },
        {
          id: 106,
          name: 'IC İçtaş',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/On-icholding-logo.png',
          subsidiaries: ['İçtaş İnşaat', 'İçtaş Enerji', 'İçtaş Ulaşım'],
        },
        {
          id: 107,
          name: 'Makyol İnşaat',
          logo: 'https://makyol.com.tr/images/makyol-logo.png',
          subsidiaries: ['Makyol Enerji', 'Makyol Gayrimenkul'],
        },
        {
          id: 108,
          name: 'Rönesans Holding',
          logo: 'https://images.seeklogo.com/logo-png/40/1/ronesans-holding-logo-png_seeklogo-406827.png',
          subsidiaries: [
            'Rönesans İnşaat',
            'Rönesans Gayrimenkul',
            'Rönesans Endüstri',
            'Rönesans Enerji',
            'Rönesans Sağlık Yatırım',
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Enerji',
      companies: [
        {
          id: 201,
          name: 'Albayrak Grubu',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Albayrak_Grubu_Logo.png',
          subsidiaries: [
            'Albayrak İnşaat',
            'Yeşil Adamlar',
            'Tümosan',
            'Platform Turizm',
            'Ereğli Tekstil',
            'Yeni Şafak',
            'TVNET',
          ],
        },
        {
          id: 202,
          name: 'Çalık Holding',
          logo: 'https://upload.wikimedia.org/wikipedia/tr/7/7b/%C3%87al%C4%B1k_Holding_logosu.jpg',
          subsidiaries: [
            'Çalık Enerji',
            'Gap İnşaat',
            'Aktif Bank',
            'Çalık Denim',
            'Çalık Cotton',
            'Gap Pazarlama',
          ],
        },
        {
          id: 203,
          name: 'Bereket Enerji',
          logo: 'https://enerjimagazin.com/resimler/bereketenerji.png',
          subsidiaries: [
            'Bereket Jeotermal',
            'Kayseri Elektrik',
            'Aydem Elektrik',
          ],
        },
        {
          id: 204,
          name: 'Aksa Enerji',
          logo: 'https://www.petroturk.com/wp-content/uploads/2024/09/aksa-enerji-full.jpg',
          subsidiaries: ['Aksa Doğalgaz', 'Aksa Elektrik'],
        },
        {
          id: 205,
          name: 'United Group',
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZhIHBUc8QFHyE3biP5bwf94papzBOQMEKWA&s',
          subsidiaries: ['Unit Elektrik', 'Unit İnşaat'],
        },
        {
          id: 206,
          name: 'Fernas Holding',
          logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQHRSCozG-k7oA/company-logo_200_200/company-logo_200_200/0/1630567240708/mim_mhendislik_inaat_elik_end_san_tic_a_logo?e=2147483647&v=beta&t=RWvTyYwRE51Clcuo4KPt6cW9jT31dZ-xCWRMkr2l4l8',
          subsidiaries: ['Fernas İnşaat', 'Fernas Enerji'],
        },
      ],
    },
    {
      id: 3,
      name: 'Medya & Eğlence',
      companies: [
        {
          id: 801,
          name: 'TRT',
          logo: 'https://www.trt.net.tr/logos/our-logos/corporate/trt.png',
          subsidiaries: [
            'TRT Kanalları',
            'TRT Radyo',
            'TRT Dijital Platformları',
            'TRT Yayın Prodüksiyon',
          ],
        },
        {
          id: 802,
          name: 'TGRT',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Tgrt.png',
          subsidiaries: [
            'TGRT Haber',
            'TGRT Belgesel',
            'TGRT Online Yayın Platformu',
          ],
        },
        {
          id: 301,
          name: 'Demirören Holding',
          logo: 'https://upload.wikimedia.org/wikipedia/tr/0/03/Demir%C3%B6ren_Holding_logo.png',
          subsidiaries: [
            'Demirören Medya (Milliyet, Hürriyet, CNN Türk, Kanal D)',
            'Milangaz',
            'Likidgaz',
            'Moil',
            'Total Oil Türkiye',
            'Demirören Gayrimenkul',
            'Milli Piyango işletmesi',
            'Spor Toto işletmesi',
          ],
        },
        {
          id: 302,
          name: 'Turkuvaz Medya',
          logo: 'https://iaahbr.tmgrup.com.tr/6b14fb/660/310/0/30/890/448?u=https://iahbr.tmgrup.com.tr/2024/06/13/futbolun-heyecani-yine-turvuvazda-1718289370409.jpg',
          subsidiaries: [
            'Sabah Gazetesi',
            'ATV',
            'A Haber',
            'A Spor',
            'A Para',
            'Takvim Gazetesi',
            'Yeni Asır',
            'Günaydın',
          ],
        },
        {
          id: 303,
          name: 'Doğuş Grubu',
          logo: 'https://upload.wikimedia.org/wikipedia/tr/d/d0/Do%C4%9Fu%C5%9F_Grubu_logosu.png',
          subsidiaries: [
            'Garanti BBVA (kısmi)',
            'Doğuş Otomotiv',
            'Doğuş İnşaat',
            'D-Marin',
            'Doğuş Yayın Grubu (NTV, Star TV)',
            'NetWork, Machka',
            'Doğuş Turizm',
            'Doğuş Yeme-İçme Grubu',
          ],
        },
        {
          id: 304,
          name: 'İhlas Holding',
          logo: 'https://www.ihlas.com.tr/wp-content/uploads/2017/07/ihlas-holding-logo-1.png',
          subsidiaries: [
            'İhlas Gazetecilik (Türkiye Gazetesi)',
            'TGRT Haber',
            'İhlas Yapı',
            'İhlas Ev Aletleri',
          ],
        },
        {
          id: 804,
          name: 'misli.com',
          logo: 'https://www.spor41.com/upload/images/49781.jpg',
          subsidiaries: [
            'Misli Online Bahis Platformu',
            'Misli Mobil Uygulamaları',
            'Misli Pazarlama Hizmetleri',
          ],
        },
        {
          id: 805,
          name: 'iddia.com',
          logo: 'https://images.seeklogo.com/logo-png/6/2/iddaa-logo-png_seeklogo-69720.png',
          subsidiaries: [
            'İddia Online Bahis Platformu',
            'Spor Bahis Sistemleri',
            'İddia Mobil Uygulamaları',
          ],
        },
      ],
    },
    {
      id: 4,
      name: 'Perakende ve Gıda',
      companies: [
        {
          id: 401,
          name: 'Yıldız Holding (Ülker)',
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8pIITe4t4X_66U4Iq99vlmvXl1-xV2uwlcQ&s',
          subsidiaries: [
            'Ülker',
            'Bizim Toptan',
            'Şok Marketler',
            'Godiva',
            "McVitie's",
            'Pladis Global',
          ],
        },
        {
          id: 402,
          name: 'BİM',
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROopz62HW2PGlSKa-gQ2pPX1v3y5NeqKZWhA&s',
          subsidiaries: ['File Market'],
        },
      ],
    },
    {
      id: 5,
      name: 'Perakende ve Kültür',
      companies: [
        {
          id: 701,
          name: 'EspressoLab',
          logo: 'https://images.seeklogo.com/logo-png/53/1/espressolab-logo-png_seeklogo-533965.png',
          subsidiaries: [
            'EspressoLab Cafe Zinciri',
            'EspressoLab Online Satış Platformu',
            'EspressoLab Franchise Sistemleri',
          ],
        },
        {
          id: 702,
          name: 'D&R',
          logo: 'https://www.mngavm.com/wp-content/uploads/2022/12/d-r-logo-png-transparent.png',
          subsidiaries: [
            'D&R Kitap Mağazaları',
            'D&R Online Satış Platformu',
            'D&R Müzik ve Dijital İçerik Platformu',
          ],
        },
        {
          id: 703,
          name: 'İdefix',
          logo: 'https://magenty.com/wp-content/uploads/idefix-logo.jpg',
          subsidiaries: [
            'İdefix Online Kitap Satış',
            'İdefix Yayın Platformu',
            'İdefix Dijital İçerik Hizmetleri',
          ],
        },
        {
          id: 704,
          name: 'Kilim Mobilya',
          logo: 'https://logowik.com/content/uploads/images/826_kilimmobilya.jpg',
          subsidiaries: [
            'Kilim Mobilya Mağazaları',
            'Kilim Online Satış Platformu',
            'Kilim Mobilya Üretim Tesisleri',
          ],
        },
        {
          id: 705,
          name: 'Türk Petrol',
          logo: 'https://play-lh.googleusercontent.com/50vdlu9WzHAj9tyoM9f7UXKdFGyzft-YLwpFtDN8v-Ki1tCrNY9jAm1wm42uQtXDAQ=w600-h300-pc0xffffff-pd',
          subsidiaries: [
            'Total Akaryakıt İstasyonları',
            'Total Madeni Yağ Üretimi',
            'Total Lojistik Hizmetleri',
          ],
        },
      ],
    },
    {
      id: 6,
      name: 'Sağlık',
      companies: [
        {
          id: 501,
          name: 'Acıbadem Sağlık Grubu',
          logo: 'https://logowik.com/content/uploads/images/acibadem-saglik-grubu1686.logowik.com.webp',
          subsidiaries: [
            'Acıbadem Hastaneleri',
            'Acıbadem Üniversitesi',
            'Acıbadem Sigorta',
          ],
        },
        {
          id: 502,
          name: 'Medical Park',
          logo: 'https://yt3.googleusercontent.com/RElTEmqYNTWZ5y2rC-RoY6q2ZAeucbsV44-nOKYGSrthoMimMrXXhG-iaykrHDDu58E6IkHk8G4=s900-c-k-c0x00ffffff-no-rj',
          subsidiaries: ['Liv Hospital', 'VM Medical Park'],
        },
        {
          id: 503,
          name: 'Memorial Sağlık Grubu',
          logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJo5cdsI4WZkiHjev1K62I-NvEEBtuknRtHg&s',
          subsidiaries: ['Memorial Hastaneleri', 'Memorial SLMC'],
        },
      ],
    },
    {
      id: 7,
      name: 'Turizm ve Seyahat',
      companies: [
        {
          id: 901,
          name: 'ETS Tur',
          logo: 'https://images.seeklogo.com/logo-png/20/1/etstur-logo-png_seeklogo-202731.png',
          subsidiaries: [
            'ETS Seyahat Acentası',
            'ETS Online Bilet Platformu',
            'ETS Turizm Danışmanlık',
          ],
        },
      ],
    },
    {
      id: 8,
      name: 'Ünlü İsimler ve İşletmeleri',
      companies: [
        {
          id: 601,
          name: 'Acun Ilıcalı',
          logo: 'https://media.fenerbahce.org/getmedia/4df26e47-3502-4a22-8074-77640fe8dd39/acunilicali_kapakfoto.jpg?width=1200&height=675&ext=.jpg',
          subsidiaries: [
            'Acun Medya',
            'TV8, TV8 Buçuk, TV8 INT',
            'Exxen',
            'Hull City A.F.C.',
          ],
        },
        {
          id: 602,
          name: 'İbrahim Tatlıses',
          logo: 'https://image.hurimg.com/i/hurriyet/75/0x0/630734284e3fe0175ce87e26.jpg',
          subsidiaries: [
            'Tatlıses Holding',
            'Tatlıses İnşaat',
            'Tatlıses Gıda',
            'Tatlıses Turizm',
            'Tatlıses Translift',
            'İdo Film',
          ],
        },
        {
          id: 603,
          name: 'Necati Şaşmaz',
          logo: 'https://img.piri.net/mnresize/720/-/piri/upload/3/2024/2/7/62c31c05-d25e17f9-7ac4-ee11-b163-a0369f7d1d8e.jpg',
          subsidiaries: ['Pana Film', 'NS Medya'],
        },
        {
          id: 604,
          name: 'Yavuz Bingöl',
          logo: 'https://static.daktilo.com/sites/1178/uploads/2024/10/26/yavuz-bingol.webp',
          subsidiaries: [
            'Yavuz Bingöl Sanat Merkezi',
            'Yavuz Bingöl Müzik Üretim',
          ],
        },
        {
          id: 605,
          name: 'Hasan Kaçan',
          logo: 'https://i12.haber7.net//haber/haber7/photos/2025/02/aTMV6_1736662094_6142.jpg',
          subsidiaries: ['Hek Film Yapım'],
        },
        {
          id: 606,
          name: 'Alişan',
          logo: 'https://static.daktilo.com/sites/1445/uploads/2025/01/22/large/alisan.webp',
          subsidiaries: ['AS Organizasyon', 'Alişan Yapı'],
        },
        {
          id: 607,
          name: 'Hidayet Türkoğlu',
          logo: 'https://image.hurimg.com/i/hurriyet/75/0x0/673c9790357c44635abfeed2.jpg',
          subsidiaries: ['HTR Yatırım', 'Basketbol akademileri'],
        },
        {
          id: 608,
          name: 'Arda Turan',
          logo: 'https://galeri13.uludagsozluk.com/719/arda-turan-in-yeni-imaji_1141269.jpg',
          subsidiaries: [
            'Bomber İstanbul (restoran)',
            'ATX Management',
            'Gayrimenkul yatırımları',
          ],
        },
        {
          id: 609,
          name: 'Ethem Sancak',
          logo: 'https://static.birgun.net/resim/haber-detay-resim/2022/06/15/ethem-sancak-erdogan-ile-ataturk-u-kiyaslamaya-calisti-1028580-5.jpg',
          subsidiaries: ['ES Yatırım', 'ES Mali Yatırım', 'BMC'],
        },
        {
          id: 610,
          name: 'Orhan Gencebay',
          logo: 'https://www.timeturk.com/resim/detay/180/1802592.jpg',
          subsidiaries: ['Kervan Plakçılık', 'Kervan Müzik Film Yapım'],
        },
      ],
    },
  ],
};

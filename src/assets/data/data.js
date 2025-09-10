export const data = {
    bride: {
        L: {
            id: 1,
            alias: 'Faiz',
            name: 'Muhammad Faiz bin Mazlan',
            child: 'Putera Pertama',
            father: 'Mazlan bin Mahmud',
            mother: 'Tuan Nurlaili binti Tuan Mat',
            image: './src/assets/images/groom.jpeg'
        },
        P: {
            id: 2,
            alias: 'Nabila',
            name: 'Nabila Suraya binti Zuaini',
            child: 'Puteri Pertama',
            father: 'Allahyarham Zuaini bin Akin',
            mother: 'Norazan binti Sidek',
            image: './src/assets/images/bride.jpeg'
        },

        couple: './src/assets/images/couple.jpeg'
    },

    time: {
        marriage: {
            year: '2025',
            month: 'Mei',
            date: '3hb',
            day: 'Sabtu',
            hours: {
                start: '9:00 AM',
                finish: '11:00 AM'
            }
        },
        reception: {
            year: '2025',
            month: 'Mei',
            date: '3hb',
            day: 'Sabtu',
            hours: {
                start: '7:30 malam',
                finish: '11:00 malam'
            }
        },
        address: 'Premiera Hotel Kuala Lumpur'
    },

    link: {
        calendar: 'https://calendar.app.google/oSVLRMYC79GzuA4f9',
        map: {
            waze : 'https://waze.com/ul/hw283fnusu',
            googlemap : 'https://maps.app.goo.gl/G75Fj1X2ThC4C7u39',
        }
    },

    galeri: [
        {
            id: 1,
            image: './src/assets/images/1.png'
        },
        {
            id: 2,
            image: './src/assets/images/2.png'
        },
        {
            id: 3,
            image: './src/assets/images/3.png'
        },
        {
            id: 4,
            image: './src/assets/images/4.png'
        },
        {
            id: 5,
            image: './src/assets/images/5.png'
        }
    ],

    bank: [
        {
            id: 1,
            name: 'Lorem Ipsum',
            icon: './src/assets/images/bca.png',
            rekening: '12345678'
        },
        {
            id: 2,
            name: 'Ipsum Lorem',
            icon: './src/assets/images/bri.png',
            rekening: '12345678'
        },
    ],

    audio: './src/assets/audio/wedding.mp3',
    api: 'https://script.google.com/macros/s/AKfycbyiAYy_Dagj5W6snDp7yD7MFKFRE_Kb8y0l33cn8h473tH9MrUP2jLcOJDvk4ssEDnAPA/exec',

    navbar: [
        {
            id: 1,
            teks: 'Utama',
            icon: 'bx bxs-home-heart',
            path: '#home',
        },
        {
            id: 2,
            teks: 'Pengantin',
            icon: 'bx bxs-group',
            path: '#bride',
        },
        {
            id: 3,
            teks: 'Lokasi',
            icon: 'bx bxs-map-pin',
            path: '#time',
        },
        {
            id: 4,
            teks: 'RSVP',
            icon: 'bx bxs-message-rounded-dots',
            path: '#wishes',
        },
    ],
}

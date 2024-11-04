// Ganti dengan ID properti Google Analytics Anda
const GA_PROPERTY_ID = 'G-7THNLDPDVK'; // Untuk Universal Analytics
// const GA_PROPERTY_ID = 'G-XXXXXXXXXX'; // Untuk Google Analytics 4

// Fungsi untuk mengambil data dari Google Analytics
async function fetchAnalyticsData() {
    const accessToken = 'G-7THNLDPDVK'; // Ganti dengan token akses Anda
    const response = await fetch(`https://analytics.googleapis.com/v3/data/ga?ids=ga:${GA_PROPERTY_ID}&metrics=ga:users,ga:sessions,ga:pageviews,ga:uniquePageviews&dimensions=ga:date&access_token=${accessToken}`);

    if (!response.ok) {
        console.error('Error fetching data from Google Analytics:', response.statusText);
        return;
    }

    const data = await response.json();
    updateWidgetData(data);
}

// Fungsi untuk memperbarui widget dengan data yang diambil
function updateWidgetData(data) {
    if (data.rows && data.rows.length > 0) {
        // Ambil total data dari response
        const totals = data.rows[0]; // Ambil data hari ini
        const totalVisitor = totals[0]; // Total Visitor
        const totalView = totals[1]; // Total View
        const onlineCount = 0; // Logika untuk online count bisa ditambahkan sesuai kebutuhan
        const todayVisits = totals[2]; // Kunjungan hari ini, jika tersedia
        const uniqueVisitors = totals[3]; // Pengunjung Unik

        // Memperbarui data statistik di widget
        updateStats(totalVisitor, onlineCount, totalView, todayVisits, uniqueVisitors);
    } else {
        console.warn('No data found in Google Analytics response.');
    }
}

// Fungsi untuk memperbarui data statistik
function updateStats(totalVisitor, onlineCount, totalView, todayVisits, uniqueVisitors) {
    document.getElementById('totalVisitor').innerText = totalVisitor || 0;
    document.getElementById('onlineCount').innerText = onlineCount || 0;
    document.getElementById('totalView').innerText = totalView || 0;
    document.getElementById('todayVisits').innerText = todayVisits || 0;
    document.getElementById('uniqueVisitors').innerText = uniqueVisitors || 0;
}

// Mengelola tampilan widget
function toggleWidget() {
    const icon = document.getElementById('infoIcon');
    const widget = document.getElementById('infoWidget');

    if (widget.style.display === 'block') {
        widget.style.display = 'none';
        icon.style.display = 'flex'; // Tampilkan kembali ikon
    } else {
        widget.style.display = 'block';
        icon.style.display = 'none'; // Sembunyikan ikon
        fetchAnalyticsData(); // Ambil data saat widget dibuka
    }
}

// Menyembunyikan widget
function closeWidget() {
    const icon = document.getElementById('infoIcon');
    const widget = document.getElementById('infoWidget');

    widget.style.display = 'none'; // Sembunyikan widget
    icon.style.display = 'flex'; // Tampilkan kembali ikon
}

// Menghitung jumlah pengunjung
//let visitorCount = localStorage.getItem('visitorCount') || 0;
//visitorCount++;
//localStorage.setItem('visitorCount', visitorCount);

// Tampilkan total pengunjung di widget
document.getElementById('totalVisitor').innerText = visitorCount;


async function fetchVisitorData() {
    const response = await fetch('https://analyticsreporting.googleapis.com/v4/reports:batchGet', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer G-P92YV7B8CJ', // Ganti dengan token akses yang valid
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reportRequests: [{
                "viewId": "9854075714", // Ganti dengan View ID Anda
                "dateRanges": [{
                    "startDate": "7daysAgo",
                    "endDate": "today"
                }],
                "metrics": [{
                    "expression": "ga:activeUsers" // Menggunakan metrik active users
                }]
            }]
        })
    });

    if (response.ok) {
        const data = await response.json();
        const visitorCount = data.reports[0].data.totals[0].values[0];
        document.getElementById('totalVisitor').innerText = `🟢 Online: ${visitorCount}`;
    } else {
        console.error('Error fetching data:', response.statusText);
    }
}

async function fetchAnalyticsData() {
    const propertyId = 'G-KS6811L339'; // Ganti dengan ID property Anda
    const apiKey = 'AIzaSyAiYW3BCbFCwKSoN5uhx__44X7d_4imw8U'; // Ganti dengan API Key yang Anda buat
    

    const url = `https://analyticsdata.googleapis.com/v1beta/properties/${G-KS6811L339}:runReport?key=${AIzaSyAiYW3BCbFCwKSoN5uhx__44X7d_4imw8U}`;

    const requestBody = {
        "dateRanges": [{ "startDate": "30daysAgo", "endDate": "today" }],
        "metrics": [{ "name": "activeUsers" }, { "name": "screenPageViews" }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        
        // Ambil data dari response dan tampilkan
        const activeUsers = data.rows[0].metricValues[0].value;
        const pageViews = data.rows[0].metricValues[1].value;

        document.getElementById('totalVisitorCount').innerText = activeUsers;
        document.getElementById('totalViewCount').innerText = pageViews;
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
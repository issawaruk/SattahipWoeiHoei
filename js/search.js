/**
 * js/search.js
 * โค้ดสำหรับจัดการการค้นหาบทความด้วย Fuse.js และแสดงผลในรูปแบบ Card UI
 */

// 1. ข้อมูลบทความ (สำคัญ: ข้อมูลนี้ต้องอยู่ในไฟล์ search.js)
const articlesData = [
    {
        title: "RoV (อาร์โอวี) คืออะไร?",
        category: "Game",
        excerpt: "",
        image: "",
        date: "24 พ.ย. 2025",
        link: ""
    }
];

// 2. ตั้งค่า Fuse.js
const fuseOptions = {
    keys: ['title', 'category', 'excerpt'],
    threshold: 0.1,
    includeScore: true
};
// Fuse Object จะต้องสร้างหลังจากที่โหลด Fuse.js library ใน HTML แล้ว
const fuse = new Fuse(articlesData, fuseOptions);

// 3. ดึง DOM Elements
const searchInput = document.getElementById('searchInput');
const articleList = document.getElementById('articleList');
const searchResults = document.getElementById('searchResults');
const sectionTitle = document.querySelector('.section-header h2');
const viewAllLink = document.querySelector('.section-header a');

// 4. ฟังก์ชันสร้าง Card HTML
function createCardHTML(article) {
    return `
        <article class="article-card">
            <div class="card-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
            </div>
            <div class="card-content">
                <span class="card-tag">${article.category}</span>
                <h3 class="card-title"><a href="${article.link || '#'}">${article.title}</a></h3>
                <p class="card-excerpt">${article.excerpt}</p>
                <div class="card-footer">
                    <span><i class="far fa-clock"></i> ${article.date}</span>
                    <a href="${article.link || '#'}" style="color: var(--primary-color); font-weight:500;">อ่านต่อ</a>
                </div>
            </div>
        </article>
    `;
}

// 5. ฟังก์ชันแสดงผลบทความ
function renderArticles(data, container) {
    if (data.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 3rem;">
            <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
            <p>ไม่พบข้อมูลที่ค้นหา</p>
        </div>`;
        return;
    }

    const html = data.map(item => {
        const article = item.item || item;
        return createCardHTML(article);
    }).join('');
    container.innerHTML = html;
}

// 6. Initial Render & Search Event
document.addEventListener('DOMContentLoaded', () => {
    // แสดงบทความล่าสุด 3 ตัวแรกเมื่อโหลดหน้าครั้งแรก
    renderArticles(articlesData.slice(0, 3), articleList);
    searchResults.style.display = 'none';

    // Event Listener สำหรับการค้นหา
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        if (query.length > 0) {
            const results = fuse.search(query);

            articleList.style.display = 'none';
            searchResults.style.display = 'grid';
            if (viewAllLink) viewAllLink.style.display = 'none';

            sectionTitle.innerHTML = `ผลการค้นหา (${results.length} รายการ) สำหรับ: "<span style="color: var(--primary-color)">${query}</span>"`;

            renderArticles(results, searchResults);
        } else {
            articleList.style.display = 'grid';
            searchResults.style.display = 'none';
            if (viewAllLink) viewAllLink.style.display = 'inline-block';

            sectionTitle.innerText = 'บทความล่าสุด';
            searchResults.innerHTML = '';
        }
    });
});
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("admin123", 12);
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: { username: "admin", password: hash },
  });

  const workGalleries = [
    { slug: "2022-2024", nameEn: "2022 — 2024", nameVi: "2022 — 2024", order: 1 },
    { slug: "2020-2021", nameEn: "2020 — 2021", nameVi: "2020 — 2021", order: 2 },
    { slug: "2018-2019", nameEn: "2018 — 2019", nameVi: "2018 — 2019", order: 3 },
    { slug: "2015-2017", nameEn: "2015 — 2017", nameVi: "2015 — 2017", order: 4 },
    { slug: "some-other-works", nameEn: "Some Other Works", nameVi: "Các Tác Phẩm Khác", order: 5 },
    { slug: "still-life", nameEn: "Still Life", nameVi: "Tĩnh Vật", order: 6 },
  ];

  for (const g of workGalleries) {
    await prisma.gallery.upsert({
      where: { slug: g.slug },
      update: {},
      create: { ...g, category: "work" },
    });
  }

  const exhibitionGalleries = [
    { slug: "mong-anh", nameEn: '"Mong Anh" Solo Exhibition', nameVi: 'Triển lãm cá nhân "Mộng Ảnh"', order: 1 },
    { slug: "heat-2024", nameEn: '"Heat" Exhibition 2024', nameVi: 'Triển lãm "Nhiệt" 2024', order: 2 },
    { slug: "vn-fine-arts-2023", nameEn: "Vietnam Fine Arts Competition and Exhibition 2023", nameVi: "Cuộc thi và Triển lãm Mỹ thuật Việt Nam 2023", order: 3 },
    { slug: "young-artists-2020", nameEn: "Vietnamese Young Artists Exhibition 2020", nameVi: "Triển lãm Mỹ thuật Trẻ Việt Nam 2020", order: 4 },
    { slug: "duyen-son-2017", nameEn: "Duyen Son Exhibition – Vietnam Contemporary Art at Shanghai – China 2017", nameVi: "Triển lãm Duyên Sơn – Nghệ thuật Đương đại VN tại Thượng Hải 2017", order: 5 },
    { slug: "laos-wind-2017", nameEn: "Exhibition of Laos Wind Group at Vietnam Fine Arts Museum 2017", nameVi: "Triển lãm nhóm Gió Lào tại Bảo tàng Mỹ thuật Việt Nam 2017", order: 6 },
    { slug: "young-fine-arts-2017", nameEn: "The Young Fine Arts Festival 2017", nameVi: "Festival Mỹ Thuật Trẻ Việt Nam 2017", order: 7 },
    { slug: "viet-art-today-2016", nameEn: "Viet Art Today 2016", nameVi: "Viet Art Today 2016", order: 8 },
    { slug: "dogma-prize-2015", nameEn: "The Dogma Prize in Self Portraiture 2015", nameVi: "Dogma Prize – Chân dung tự họa 2015", order: 9 },
  ];

  for (const g of exhibitionGalleries) {
    await prisma.gallery.upsert({
      where: { slug: g.slug },
      update: {},
      create: { ...g, category: "exhibition" },
    });
  }

  console.log("✓ Seed complete. Admin: admin / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

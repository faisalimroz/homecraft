import { cookies } from 'next/headers'


let BASE_URL:string
if (process.env.NODE_ENV === 'development') {
    // Development environment
    BASE_URL = 'http://localhost:6060/api/v1'; // Replace with your localhost URL
  } else {
    // Production environment
    BASE_URL = 'https://home-crafter-backend.vercel.app/api/v1';
  }
export async function getAllBlog() {
    const cookieStore = cookies()
    const res = await fetch(`${BASE_URL}/blogs`, { next: { tags: ['blogs'] } });

    if (!res.ok) throw new Error("Failed To Fetch Data");
    return res.json();
}
export async function getAllService() {
    const cookieStore = cookies()
    const res = await fetch(`${BASE_URL}/services`, { next: { tags: ['services'] } });

    if (!res.ok) throw new Error("Failed To Fetch Data");
    return res.json();
}
export async function getAllCategories() {
    const cookieStore = cookies()
    const res = await fetch(`${BASE_URL}/categories`, { next: { tags: ['category'] } });

    if (!res.ok) throw new Error("Failed To Fetch Data");
    return res.json();
}
export async function getAllFaqs() {
    const cookieStore = cookies()
    const res = await fetch(`${BASE_URL}/faqs`, { next: { tags: ['faqs'] } });

    if (!res.ok) throw new Error("Failed To Fetch Data");
    return res.json();
}
export async function getAllReviews() {
    const cookieStore = cookies()
    const res = await fetch(`${BASE_URL}/review`, { next: { tags: ['reviews'] } });

    if (!res.ok) throw new Error("Failed To Fetch Data");
    return res.json();
}
//Type Definition
export type HeroSlidesTypes = {
    id: number;
    img: string;
    heading: string;
    subheading: string;
    ctaText: string;
    ctaLink: string;
};

export const heroSlides: HeroSlidesTypes[] = [
    {
        id: 1,
        img: "/src/assets/fashion.jpg",
        heading: "Style That Moves You",
        subheading: "Shop the latest fashion trends and elevate your wardrobe.",
        ctaText: "Shop Fashion",
        ctaLink: "/products/fashion",
    },
    {
        id: 2,
        img: "/src/assets/tech.jpg",
        heading: "Upgrade Your Tech Life",
        subheading: "Discover gadgets that make everyday smarter.",
        ctaText: "Explore Tech",
        ctaLink: "/products/tech",
    },
    {
        id: 3,
        img: "/src/assets/home.jpg",
        heading: "Comfort Meets Class",
        subheading: "Modern home essentials to cozy up your space.",
        ctaText: "Shop Home",
        ctaLink: "/products/home",
    },
    {
        id: 4,
        img: "/src/assets/fitness.jpg",
        heading: "Live Active, Live Bold",
        subheading: "Performance wear and fitness gear for every goal.",
        ctaText: "Shop Fitness",
        ctaLink: "/products/fitness",
    },
    {
        id: 5,
        img: "/src/assets/beauty.jpg",
        heading: "Glow Inside & Out",
        subheading: "Skincare and beauty picks curated for your routine.",
        ctaText: "Shop Beauty",
        ctaLink: "/products/beauty",
    },
];
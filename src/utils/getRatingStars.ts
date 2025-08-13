export function getRatingStars(rating: number): ("yellow" | "white")[] {
    const stars: ("yellow" | "white")[] =[];
    const filledStars = Math.round(rating);

    for (let i = 0; i < 5; i++) {
        stars.push (i < filledStars ? "yellow" : "white");
    }

    return stars;
}
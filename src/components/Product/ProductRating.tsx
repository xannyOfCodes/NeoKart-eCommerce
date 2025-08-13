import yellowStar from "../../assets/star-yellow.png"
import whiteStar from "../../assets/star-white.png"
import { getRatingStars } from "../../utils/getRatingStars";


type Props = {
    rating: number;
};

const ProductRating: React.FC<Props> = ({ rating }) => {
    const stars = getRatingStars(rating);
  return (
    <div className="flex items-center gap-x-0.5">
        {
            stars.map((star, index) => (
                <img
                key={index}
                src={star === "yellow" ? yellowStar : whiteStar}
                alt={`${star} star`}
                className="w-4 h-4 object-cover"/>
            ))
        }
    </div>
  )
}

export default ProductRating

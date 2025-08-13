import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const SearchIcon = () => {

    const navigate = useNavigate();
    const handleSearchClick = () => {
        navigate("/search");
    }

  return (
    <div>
        <button onClick={handleSearchClick}
        className='text-xl font-bold h-[2.5rem] w-[2.5rem] text-zinc-900 bg-white rounded-full flex items-center justify-center'>
            <Search className='inline'/>
        </button>
    </div>
  )
}

export default SearchIcon

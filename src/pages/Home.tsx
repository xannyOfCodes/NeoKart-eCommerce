import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import CategorySection from '../components/Category/CategorySection'
import SpecialForYou from '../components/Product/SpecialForYou'


const Home = () => {
  return (
    <div>
        <Header showSearch={true} showCart={true}/>
        <Hero/>
        <CategorySection/>
        <SpecialForYou/>
    </div>
  )
}

export default Home

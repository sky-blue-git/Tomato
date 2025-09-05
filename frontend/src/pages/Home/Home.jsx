import React from 'react'
import './Home.css'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { assets } from '../../assets/assets'

const Home = () => {
  const [category, setCategory] = React.useState('All');

  return (
    <div className="home">
      {/* Premium Hero */}
      <section className="home-hero">
        <div className="home-hero-content">
          <h1>Premium meals, delivered fresh to your door</h1>
          <p>Discover chef-crafted dishes from top local kitchens. Fast delivery, real ingredients, and flavors you will crave.</p>
          <div className="home-hero-actions">
            <div className="home-hero-search">
              <img src={assets.search_icon} alt="search" />
              <input placeholder="Search dishes, cuisines, or restaurants" />
              <button>Search</button>
            </div>
            <div className="home-hero-badges">
              <span>🚚 25 min avg delivery</span>
              <span>⭐ 4.9 customer rating</span>
              <span>🛡️ Secure checkout</span>
            </div>
          </div>
        </div>
        <div className="home-hero-art" aria-hidden>
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
      </section>

      {/* Curated Categories */}
      <section className="home-section home-curated">
        <div className="section-head">
          <h2>Explore by craving</h2>
          <p>Pick a category to get personalized recommendations.</p>
        </div>
        <ExploreMenu category={category} setCategory={setCategory} />
      </section>

      {/* Featured Grid */}
      <section className="home-section home-featured">
        <div className="section-head">
          <h2>Featured this week</h2>
          <p>Hand-picked dishes people love right now.</p>
        </div>
        <FoodDisplay category={category} />
      </section>

      {/* Benefits */}
      <section className="home-section home-benefits">
        <div className="benefit">
          <div className="icon">🥗</div>
          <h3>Fresh ingredients</h3>
          <p>Only high-quality produce and meats from trusted suppliers.</p>
        </div>
        <div className="benefit">
          <div className="icon">⚡</div>
          <h3>Lightning fast</h3>
          <p>Smart dispatching ensures your food arrives hot.</p>
        </div>
        <div className="benefit">
          <div className="icon">💳</div>
          <h3>One-tap checkout</h3>
          <p>Save your preferences and reorder in seconds.</p>
        </div>
        <div className="benefit">
          <div className="icon">🌱</div>
          <h3>For every lifestyle</h3>
          <p>Vegan, gluten-free, keto — curated menus for all.</p>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="home-section home-app">
        <div className="section-head">
          <h2>Order on the go</h2>
          <p>Get exclusive app-only deals and lightning fast checkout.</p>
        </div>
        <div className="home-app-card">
          <AppDownload />
        </div>
      </section>
    </div>
  )
}

export default Home

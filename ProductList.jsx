import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Easy to care for and filter indoor air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes harmful toxins.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114553_1280.jpg", description: "Adds humidity and purifies air.", cost: "$20" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/plant-4850669_1280.jpg", description: "Large shiny leaves that absorb pollutants.", cost: "$22" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/17/44/aloe-vera-3284587_1280.jpg", description: "Soothes burns and cleans air.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2016/07/21/11/00/lavender-1532230_1280.jpg", description: "Relaxing fragrance.", cost: "$20" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2015/06/02/01/18/jasmine-794503_1280.jpg", description: "Sweet floral scent.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating herbal scent.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/02/20/40/mint-1118728_1280.jpg", description: "Fresh minty aroma.", cost: "$10" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2016/11/29/05/07/eucalyptus-1867456_1280.jpg", description: "Clears airways and smells divine.", cost: "$25" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/05/28/13/14/lemon-balm-2350937_1280.jpg", description: "Citrus fragrance that reduces stress.", cost: "$14" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://cdn.pixabay.com/photo/2021/01/29/08/10/zz-plant-5960092_1280.jpg", description: "Thrives in low light.", cost: "$25" },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/pothos-3816921_1280.jpg", description: "Extremely resilient cascading vine.", cost: "$12" },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2020/05/20/07/35/aspidistra-5194451_1280.jpg", description: "Nearly indestructible indoor plant.", cost: "$28" },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2016/08/16/17/12/jade-plant-1598482_1280.jpg", description: "Hardy succulent bringing good luck.", cost: "$15" },
        { name: "Succulent Trio", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/succulents-1846147_1280.jpg", description: "Requires minimal watering.", cost: "$18" },
        { name: "Chinese Evergreen", image: "https://cdn.pixabay.com/photo/2021/05/01/16/48/chinese-evergreen-6221528_1280.jpg", description: "Tolerates dry air and low light.", cost: "$22" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    if (e) e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="navbar-links">
          <a href="#plants" onClick={() => setShowCart(false)}>Plants</a>
          <a href="#cart" onClick={handleCartClick} className="cart-icon-container">
            🛒 <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index} className="category-section">
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="plant-list">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                    <h3 className="plant-name">{plant.name}</h3>
                    <p className="plant-description">{plant.description}</p>
                    <p className="plant-cost">{plant.cost}</p>
                    <button
                      className={`add-to-cart-btn ${addedToCart[plant.name] || cartItems.some(item => item.name === plant.name) ? 'disabled' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)}
                    >
                      {addedToCart[plant.name] || cartItems.some(item => item.name === plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
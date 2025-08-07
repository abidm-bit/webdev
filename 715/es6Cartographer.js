const navBar = ['Home', 'Shop','Orders', 'Contact'];

const navBarButtons = navBar.map((item) => {
  return `<button class="nav-button">${item}</button>`;
});

console.log(navBarButtons.join(' ')); 
// <button class="nav-button">Home</button> <button class="nav-button">Shop</button> <button class="nav-button">Orders</button> <button class="nav-button">Contact</button>

console.log();

const prices = {'2005':39.99,'2010':49.99,'2015':59.99, '2020':69.99};

Object.keys(prices).forEach((year) => {
  console.log(`The price in ${year} was $${(prices[year]*1.0878).toFixed(2)}`);
});
// The price in 2005 was $39.99
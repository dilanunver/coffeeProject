const products = [
  {name : 'mocha', img : 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mocha-001-8301418.jpg', stok : 14, price : 10},
  {name : 'latte', img : 'https://www.caffesociety.co.uk/assets/recipe-images/latte-small.jpg', stok : 18, price : 19},
  {name : 'turkCoffee', img : 'https://www.theguideistanbul.com/wp-content/uploads/2018/10/38737621_1003563516492694_4277427688945221632_n-e1539950613399.jpg', stok : 12, price : 7},
  {name : 'cappucino', img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cappuccino_at_Sightglass_Coffee.jpg/1280px-Cappuccino_at_Sightglass_Coffee.jpg', stok : 15, price : 12}
];
const selectedProducts = [];
const productsHolder = document.querySelector('.products-holder');
const selectedProductsHolder = document.querySelector('.selectedProducts')

function renderProducts(){ 
  productsHolder.innerHTML = '';
  for(let i = 0; i < products.length; i++){
    const element = document.createElement('div');
    element.classList.add('product');
    element.setAttribute('data-name', products[i].name)
    element.innerHTML = `
    <img src=${products[i].img} width=100; height=100;></img>
    <p>${products[i].name}</p>
    <div>
      <span>Waiting Product : ${products[i].stok}</span>
      <span>Price : ${products[i].price} </span>
    </div>
    ${products[i].stok <= 0 ? '<span style="color: white; background-color: red;">out of stok</span><p style="color: white; background-color:blue;">cannot add any item, try other items</p>': '<button class="addToCard">Add To Card</button>'}`
    if (products[i].stok > 0) {
      const addToCard = element.querySelector('.addToCard');
      addToCard.addEventListener('click', addProductToCard)
    }
    
    productsHolder.appendChild(element);
  } 
}
renderSelectedProducts()
function renderSelectedProducts(){
  selectedProductsHolder.innerHTML = '';
  for(let i = 0; i < selectedProducts.length; i++){
    const element = document.createElement('div');
    element.classList.add('product');
    element.setAttribute('data-name', selectedProducts[i].name)
    element.innerHTML = `
    <img src=${selectedProducts[i].img} width=100; height=100;></img>
    <p>${selectedProducts[i].name}</p>
    <div>
      <span>Having Product: ${selectedProducts[i].stok}</span>
      <span>Price : ${selectedProducts[i].price} </span>
      <button class="deleteBtn">Delete</button>
    </div>`
    const deleteBtn = element.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', deleteItem);
    selectedProductsHolder.appendChild(element);
  }

}
renderProducts()
function addProductToCard(e){
  const element = e.currentTarget.parentElement;
  const name = element.dataset.name;
  let selectedItem;
  let sameItem;
  for(let i = 0; i<products.length; i++){
    if(name === products[i].name)
    selectedItem = products[i];
    
  }
  for(let i = 0; i<selectedProducts.length; i++){
    if(selectedProducts[i].name === selectedItem.name){
      sameItem = selectedProducts[i];
    }
  }
  selectedItem.stok--;
  if(selectedItem.stok < 0 ){
    selectedItem.stok = 0
    return
  }
  if(sameItem){ 
    sameItem.stok++;
  } else {
    let selectedOperator = {...selectedItem};
    selectedOperator.stok = 1;
    selectedProducts.push(selectedOperator) 
  }
  renderProducts();
  renderSelectedProducts()
}
function deleteItem(e){
  const element = e.currentTarget.parentElement;
  const amount = element.dataset;
  
  console.log(amount)
}
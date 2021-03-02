const products = [
  {name : 'mocha', img : 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mocha-001-8301418.jpg', stok : 14, prices : {short: 3, tall: 5, grande: 6}},
  {name : 'latte', img : 'https://www.caffesociety.co.uk/assets/recipe-images/latte-small.jpg', stok : 18, prices : {short: 2, tall: 3, grande: 5}},
  {name : 'turkCoffee', img : 'https://www.theguideistanbul.com/wp-content/uploads/2018/10/38737621_1003563516492694_4277427688945221632_n-e1539950613399.jpg', stok : 12, prices : {short: 5, tall: 6, grande: 8}},
  {name : 'cappucino', img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cappuccino_at_Sightglass_Coffee.jpg/1280px-Cappuccino_at_Sightglass_Coffee.jpg', stok : 15, prices : {short: 2.5, tall: 4, grande: 5 }}
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
      <span>Price : $${products[i].prices.short} </span>
    </div>
    ${products[i].stok <= 0 ? '<span style="color: white; background-color: red;">out of stok</span><p style="color: white; background-color:blue;">cannot add any item, try other items</p>': '<button class="addToCard">Add To Card</button>'}
    <div><input type="radio" id="short" name="radAnswer" value="short">
    <label for="short">Short</label><br>
    <input type="radio" id="tall" name="radAnswer" value="tall">
    <label for="tall">Tall</label><br>
    <input type="radio" id="grande" name="radAnswer" value="grande">
    <label for="grande">Grande</label><br></div>`
    if (products[i].stok > 0) {
      const addToCard = element.querySelector('.addToCard');
      addToCard.addEventListener('click', addProductToCard)
    }
    const short = element.querySelector('#short');
    short.addEventListener('click', shortItem)
    const tall = element.querySelector('#tall');
    tall.addEventListener('click', tallItem)
    const grande = element.querySelector('#grande');
    grande.addEventListener('click', grandeItem)
    
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
      <span>Price : $${selectedProducts[i].prices.short * selectedProducts[i].stok}</span>
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
  const element = e.currentTarget.parentElement.parentElement;
  const amount = element.dataset.name;
 let findingItem = selectedProducts.find(function(item){
    return item.name === amount;
  })
  let chosenItem = selectedProducts.indexOf(findingItem);
    console.log(findingItem.stok)
      findingItem.stok > 0 ? findingItem.stok-- : selectedProducts.splice(chosenItem,1)   
  renderSelectedProducts()
  renderProducts()
  console.log(selectedProducts)
}

function shortItem(e){
  const chosen = e.currentTarget.parentElement.parentElement;
  const name = chosen.dataset.name
  console.log(name)
}
function tallItem(e){
  console.log('you chose tall!')
}
function grandeItem(e){
  console.log('you chose grande!')
}




const products = [
  {name : 'mocha', img : 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/mocha-001-8301418.jpg', stok : 14, prices : {short: 3, tall: 5, grande: 6}, selectedSize: 'short', short: 0, tall: 0, grande: 0, totalPrice : 0 },
  {name : 'latte', img : 'https://www.caffesociety.co.uk/assets/recipe-images/latte-small.jpg', stok : 18, prices : {short: 2, tall: 3, grande: 5}, selectedSize: 'short', short: 0, tall: 0, grande: 0, totalPrice : 0 },
  {name : 'turkCoffee', img : 'https://www.theguideistanbul.com/wp-content/uploads/2018/10/38737621_1003563516492694_4277427688945221632_n-e1539950613399.jpg', stok : 12, prices : {short: 5, tall: 6, grande: 8}, selectedSize: 'short', short: 0, tall: 0, grande: 0, totalPrice : 0 },
  {name : 'cappucino', img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cappuccino_at_Sightglass_Coffee.jpg/1280px-Cappuccino_at_Sightglass_Coffee.jpg', stok : 15, prices : {short: 2.5, tall: 4, grande: 5 }, selectedSize: 'short', short: 0, tall: 0, grande: 0, totalPrice : 0 }
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
      <span>Price : $${products[i].prices[products[i].selectedSize]} </span>
    </div>
    ${products[i].stok <= 0 ? '<span style="color: white; background-color: red;">out of stok</span><p style="color: white; background-color:blue;">cannot add this item, try other items</p>': '<button class="addToCard">Add To Card</button>'}
    <div><input type="radio" ${products[i].selectedSize === 'short' ? 'checked': ''} id="short" name=${products[i].name} value="short">
    <label for="short">Short</label><br>
    <input type="radio" ${products[i].selectedSize === 'tall' ? 'checked': ''} id="tall" name=${products[i].name} value="tall">
    <label for="tall">Tall</label><br>
    <input type="radio" ${products[i].selectedSize === 'grande' ? 'checked': ''} id="grande" name=${products[i].name} value="grande">
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
      <span>Price : $${selectedProducts[i].totalPrice}</span>
      <button class="deleteShort">Delete Short</button>
      <button class="deleteTall">Delete Tall</button>
      <button class="deleteGrande">Delete Grande</button>
    </div>`
  
    const deleteShort = element.querySelector('.deleteShort');
    deleteShort.addEventListener('click', deleteShortItem);
    const deleteTall = element.querySelector('.deleteTall');
    deleteTall.addEventListener('click', deleteTallItem);
    const deleteGrande = element.querySelector('.deleteGrande');
    deleteGrande.addEventListener('click', deleteGrandeItem);
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
    sameItem[selectedItem.selectedSize] += 1
   sameItem.totalPrice = sameItem.prices.grande* sameItem.grande + sameItem.prices.short* sameItem.short + sameItem.prices.tall* sameItem.tall;
    console.log(sameItem.totalPrice)
  } else {
    let selectedOperator = {...selectedItem};
    selectedOperator.stok = 1;
    selectedOperator[selectedOperator.selectedSize] = 1
    selectedOperator.totalPrice =  selectedOperator.prices.grande* selectedOperator.grande + selectedOperator.prices.short * selectedOperator.short + selectedOperator.prices.tall * selectedOperator.tall;
    selectedProducts.push(selectedOperator) 
  }

  renderProducts();
  renderSelectedProducts()
}
function deleteShortItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  const name = element.dataset.name;
 let findingShortItem = selectedProducts.find(function(item){
   
    return item.name === name;
  })
  let chosenItem = selectedProducts.indexOf(findingShortItem);
    console.log(findingShortItem.stok)
    findingShortItem.stok > 0 ? findingShortItem.stok-- : selectedProducts.splice(chosenItem,1)   
    findingShortItem.prices.short > 0 ? findingShortItem.prices.short -5 : findingShortItem.prices.short = 0
  renderSelectedProducts()
  renderProducts()
  console.log(selectedProducts)
}
function deleteTallItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  const name = element.dataset.name;
 let findingTallItem = selectedProducts.find(function(item){
   
    return item.name === name;
  })
  let chosenItem = selectedProducts.indexOf(findingTallItem);
    console.log(findingTallItem.stok)
    findingTallItem.stok > 0 ? findingTallItem.stok-- : selectedProducts.splice(chosenItem,1)   
    findingTallItem.prices.tall > 0 ? findingTallItem.prices.tall -3 : findingTallItem.prices.tall= 0
  renderSelectedProducts()
  renderProducts()
  console.log(selectedProducts)
}
function deleteGrandeItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  const name = element.dataset.name;
 let findingGrandeItem = selectedProducts.find(function(item){
   
    return item.name === name;
  })
  let chosenItem = selectedProducts.indexOf(findingGrandeItem);
    console.log(findingGrandeItem.stok)
    findingGrandeItem.stok > 0 ? findingGrandeItem.stok-- : selectedProducts.splice(chosenItem,1)   
    findingGrandeItem.prices.grande > 0 ? findingGrandeItem.prices.grande -= findingGrandeItem.prices.grande  : findingGrandeItem.prices.grande = 0
  renderSelectedProducts()
  renderProducts()
  console.log(findingGrandeItem.prices.grande )
}
function shortItem(e){
  const chosen = e.currentTarget.parentElement.parentElement;
  const name = chosen.dataset.name
  console.log(name)
  const sizeName = e.currentTarget.id;
  let chosenItem = products.find(function(item){
    return item.name === name;
  })
  chosenItem.selectedSize = 'short';
  renderProducts()
}

function tallItem(e){
  const chosen = e.currentTarget.parentElement.parentElement;
  const name = chosen.dataset.name
 // console.log(name)
  const sizeName = e.currentTarget.id;
 // console.log(sizeName)
 let chosenItem = products.find(function(item){
  return item.name === name;
})
console.log(chosenItem)
chosenItem.selectedSize = 'tall'
renderProducts()
}

function grandeItem(e){
  const chosen = e.currentTarget.parentElement.parentElement;
  const name = chosen.dataset.name
 // console.log(name)
  const sizeName = e.currentTarget.id;
 // console.log(sizeName)
 let chosenItem = products.find(function(item){
  return item.name === name;
})
console.log(chosenItem)
chosenItem.selectedSize = 'grande'
renderProducts()
}






//Get product from Local Storage

getFromLocalStorage = () => {
	let localStorageItem = localStorage.getItem("key");

	if(!localStorageItem){
		return [];
	}

	else {
		localStorageItem = JSON.parse(localStorageItem);
		return localStorageItem;
	}
};

//Quantity Change

const qtyChange = (event, id) => {
	const currentCard = document.getElementById(('card' + id).toString());
	const qtyTab = currentCard.querySelector(".purchase-no");
	

	let StorageArray = getFromLocalStorage("key");
	let existingProduct = StorageArray.find((product) => product.id === id);
		
	let qty = existingProduct.qty;
	let name = existingProduct.name;
	let price = existingProduct.price;
	


	if(event.target.className === "plus"){
		qty = qty + 1
	}

	if(event.target.className === "minus"){ 
		if(qty>1){qty = qty - 1}
	}
	
	
	let updatedProduct = {id, name, qty, price}
	let newArray = StorageArray.map((product) => {
		return product.id === id ? updatedProduct : product;
	});
	

	localStorage.setItem("key", JSON.stringify(newArray));

	
	qtyTab.innerText = qty;
	qtyTab.setAttribute("qty-data", qty.toString());

	
};

//Price change
const priceChange = (event, id, price) => {
	const currentCard = document.getElementById(('card' + id).toString());
	const priceTab = currentCard.querySelector(".prd-price"); 
	const qtyTab = currentCard.querySelector(".purchase-no");
	let qty = parseInt(qtyTab.getAttribute("qty-data"));

	priceTab.innerText = '₹' + price*qty;
};


//Updating cart value function
const updateCart = () => {
	let StorageArray = getFromLocalStorage("key");

	const cartValue = document.querySelector(".cartValue");
	cartValue.innerText = StorageArray.length || 0;
	

};
	


//Remove from Cart function


const removeFromCart = (event, id) => {

	let StorageArray = getFromLocalStorage("key");

	const currentCard = document.getElementById(('card' + id).toString());
	
	let newArray = StorageArray.filter((product) => product.id !== id);


	

	localStorage.setItem("key", JSON.stringify(newArray));

	currentCard.remove();
	

	updateCart();
};

let StorageArray = getFromLocalStorage("key");

// Display of cards

const shop_sec = document.querySelector("#shop-sec-id");
const template = document.querySelector("#template-id");



const showCard = (StorageArray) => {

	StorageArray.forEach((prod) => {
		const {id ,name, qty, price} = prod;
		
		const templateClone = document.importNode(template.content, true);
		
		
		templateClone.querySelector("#card-no").setAttribute("id", ('card' + id).toString());
		templateClone.querySelector(".product-name").textContent = name;
		templateClone.querySelector(".purchase-no").textContent = qty;
		templateClone.querySelector(".prd-price").textContent = '₹' + qty*price;


		templateClone.querySelector(".purchase-num").addEventListener("click", (event) => {
			qtyChange(event, id);
			priceChange(event, id, price);
			total();
		});

		templateClone.querySelector(".removefromCart").addEventListener("click", (event) => {
			removeFromCart(event, id);
			total();
		});	

		shop_sec.append(templateClone);
	
	});
};

showCard(StorageArray);

updateCart();


// Totaling

let total = () => {
	let StorageArray = getFromLocalStorage("key");
	
	let subTotal = 0;

	StorageArray.forEach((product) => {
		subTotal = subTotal + product.price * product.qty;
	});

	let SubTotalTab = document.querySelector(".sub_total");
	SubTotalTab.innerText = '₹' + subTotal;

	
	let Charges = 0
	if(subTotal > 0){Charges = 50 + 0.02 * subTotal};

	let chargesTab = document.querySelector(".delivery_charge");
	chargesTab.innerText = '₹' + Charges;

	let totalCharge = subTotal + Charges;
	let totalTab = document.querySelector(".total");
	totalTab.innerText = '₹' + totalCharge;
};

total();




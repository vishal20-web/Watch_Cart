
//Product Info

let products = [
	{
	"id" : 1,
	"name" : "Wrist Watch",
	"image" : "https://thewatchlab.in/cdn/shop/files/LL102-1_OSMIOR_QP_OR_GRIS_CLAIR_RVB.jpg?v=1727768611&width=500",
	"price" : 566

	},

	{
	"id" : 2,
	"name" : "Toy Watch",
	"image" : "https://thewatchlab.in/cdn/shop/files/RESERVOIR__POPEYE_CRICKET_FRONT-fiche-produit.jpg?v=1698052299&width=800",
	"price" : 230

	},

	{
	"id" : 3,
	"name" : "Fancy Watch",
	"image" : "https://img.watchtime.in/images/2019/Jul/c4b5abfb-fc11-4437-bc58-30d178a44aa9",
	"price" : 700

	},

	{
	"id" : 4,
	"name" : "Timex Watch",
	"image" : "https://assets.myntassets.com/w_200,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2025/DECEMBER/1/OjQ1xogj_66eaf1868c77403d999d9ebc8f0fdb85.jpg",
	"price" : 456

	},

	{
	"id" : 5,
	"name" : "Digital Watch",
	"image" : "https://sylvi.in/cdn/shop/files/Sylvi_Watch_Collection_Image_Homepage_800_x_800.webp?v=1763207155",
	"price" : 756

	},

	{
	"id" : 6,
	"name" : "Luxury Watch",
	"image" : "https://sylvi.in/cdn/shop/files/Stardom_800_x_800_86b213c5-851b-409f-896a-1a74c4b95b0c.webp?v=1767079902",
	"price" : 956

	},
]

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
	let qty = parseInt(qtyTab.getAttribute("qty-data")) || 0;
	

	if(event.target.className === "plus"){
		qty = qty + 1
	}

	if(event.target.className === "minus"){
		if(qty>0){qty = qty - 1}
	}


	let StorageArray = getFromLocalStorage("key");
	let existingProduct = StorageArray.find((product) => product.id === id) || 9;
	let name = existingProduct.name;
	let price = existingProduct.price;

	if(existingProduct){
	
		let updatedProduct = {id, name, qty, price};
		let newArray = StorageArray.map((product) => {
			return product.id === id ? updatedProduct : product;
		});
	

		localStorage.setItem("key", JSON.stringify(newArray));
	
	}
	


	qtyTab.innerText = qty;
	qtyTab.setAttribute("qty-data", qty.toString());
	return qty;
};

//Quantity Display



//Updating cart value function
const updateCart = () => {
	let StorageArray = getFromLocalStorage("key");

	const cartValue = document.querySelector(".cartValue");
	cartValue.innerText = StorageArray.length || 0;
	

};
	


//Add to Cart function


const addToCart = (event, id, price) => {

	let StorageArray = getFromLocalStorage("key");

	const currentCard = document.getElementById(('card' + id).toString());
	const qtyTab = currentCard.querySelector(".purchase-no");
	let qty = parseInt(qtyTab.innerText);

	const name = (currentCard.querySelector(".product-name")).innerText;
	const image = (currentCard.querySelector(".product-img")).innerurl;
	


	//Duplicate Products in Cart

	let duplicateProduct = StorageArray.find((existingProduct) => existingProduct.id === id );

	if(duplicateProduct){return false;}

	if(qty >= 1){
	StorageArray.push({id ,name, image, qty, price});
	localStorage.setItem("key", JSON.stringify(StorageArray));
	alert(localStorage.getItem("key")); 
	}
	else{alert("Please Select Quantity")}

	updateCart();
};



// Display of cards

const shop_sec = document.querySelector("#shop-sec-id");
const template = document.querySelector("#template-id");

const showCard = (products) => {

	products.forEach((prod) => {
		const {id, name, image, price} = prod;
		
		const templateClone = document.importNode(template.content, true);
		
		
		templateClone.querySelector("#card-no").setAttribute("id", ('card' + id).toString());
		templateClone.querySelector(".product-name").textContent = name;
		templateClone.querySelector(".product-img").src = image;
		templateClone.querySelector(".prd-price").textContent = '₹' + price;
		
		templateClone.querySelector(".purchase-num").addEventListener("click", (event) => {
			qtyChange(event, id);
		});

		templateClone.querySelector(".addToCart").addEventListener("click", (event) => {
			addToCart(event, id, price);
		});	


		shop_sec.append(templateClone);
	
	});
};

showCard(products);

updateCart();
 




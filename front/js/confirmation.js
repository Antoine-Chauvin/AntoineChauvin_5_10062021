function confirmationOrder(){
    
    const orderId = document.getElementById("orderId");

    orderId.innerText = localStorage.getItem("order");
    console.log(localStorage.getItem("order"))
    // localStorage.clear();
}

confirmationOrder();

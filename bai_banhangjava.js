//anh, ten do uong, gia do uong
let drinks = [
    [1,"Assets/trabuoi.jpg", "Trà Bưởi",35000], //1 dau la so luong
    [2,"Assets/tradau.jpg", "Trà Dâu",45000],
    [3,"Assets/traman.jpg", "Trà Mận", 25000],
    [4,"Assets/trasuachanchau.jpg", "Trà sữa chân châu",50000]

]
let orders = [
    //[1, "Trà Bưởi",35000, 1], //them 1 duoi la so luong ly/1 dau la sl
    //[2, "Trà Dâu",45000, 1], 
    //["Trà Mận", 25000],
    //["Trà sữa chân châu",50000]
    //sau khi ket thuc xoa hamf nay di
]

let totalBill = 0; //lm cuoi 
let totalMoney = 0; //lm cuoi cung



function displayALLDrink() { //hien thi hinh anh,ten,gia,oder
    let str = "";
    for(let i = 0; i < drinks.length; i++) {
        str += `<div class="card">
            <div id="img-border"> 
            <img src="${drinks[i][1]}" style="width:100%">
            </div> 

            <h1>${drinks[i][2]}</h1> 
            <p class ="price">${convertMoney(drinks[i][3])} VND</p>
            <P><button onclick="addToOrder(${i})">Order</button></P>
        </div>`;
    }
    document.getElementById("drink-list").innerHTML = str;
}
//displayALLDrink();

function displayOder(){ //hien thi ten do uong
    let str = `<tr>
                <th>STT</th>
                <th>Tên đồ uống</th>
                <th>SL</th>
                <th>Giá</th>
            </tr>`;
    for(let i = 0; i < orders.length; i++) { //dong48: gia nhan sl tien =>dong78
        str += `<tr>
            <td>${i+1}</td>
            <td>${orders[i][1]}</td>
            <td>${orders[i][3]}</td> 
            <td>${convertMoney(orders[i][2] * orders[i][3])}</td>  
            <td><button onclick="removeItemFromOder(${i})">x</button></td>
        </tr>`;
    }
    document.getElementById("order-list").innerHTML = str;
    totalOder(); //goi ra tong tien
}


function addToOrder(index){  //click oder
    let indexed = -1;
    for(let i = 0; i < orders.length; i++){
        if(orders[i][0] == drinks[index][0]){
            indexed = i;
        }
    }
    if(indexed == -1){
        let oderItem = [drinks[index][0], drinks[index][2], drinks[index][3], 1];
        orders.push(oderItem);

    }else{
        orders[indexed][3] ++;
    }
    
    displayOder();
}

function totalOder() {
    let total = 0;
    for(let i = 0; i < orders.length; i ++) {
        total += orders[i][2] * orders[i][3]; //gia nhan sl
    }
    totalBill = total; //xuat ra 102
    document.getElementById("total").innerText = convertMoney(total);


}

function removeItemFromOder(index){  //delete oder
    if(orders[index][3] > 1){
        orders[index][3]--; //so 3 la: delete so luong
    }else{
        orders.splice(index, 1); //k thi xoa het
    }
    
    displayOder();

}

function convertMoney(money){
    return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(money);
}

function payment() { 
    showRevenue();
    alert("Bạn muốn thanh toán hóa đơn thành công" + convertMoney(totalBill));
    orders = [];
    displayOder();

}
function showRevenue(){
     totalMoney = loadRevenue();
    totalMoney += totalBill;
    saveRevenue();
    document.getElementById("revenue").innerText = convertMoney(totalMoney);

}


function saveRevenue() {
    localStorage.setItem("revenue", totalMoney)
}
function loadRevenue() {
    let money = localStorage.getItem("revenue") ?? 0;
    return +money;
}

displayALLDrink();
displayOder();
showRevenue();
let $noOrderProduct, $orderTable;
let saveData; // 반환된 orderData들을 저장하는 변수. 이 변수로 기간이나 배송상태 선택해서 filter
let id = location.href.split('/');
id = id[id.length - 1];


// 오늘 날짜 - 주문 날짜와 차이 계산하기 위해
let today = new Date;
today = today.toISOString().substring(0,10); // 0000-00-00 형태

// const orderData = [{
//   "_id": "6520ff94fc99058558ce39d1",
//   "deliveryStatus": "주문 완료",
//   "orderProducts": [
//       {
//           "_id": "65211f902bd5fb092aaaed38",
//           "products": {
//               "_id": "6520f029fc99058558ce39c9",
//               "productName": "chain necklace",
//               "price": 5000,
//               "category": "necklace",
//               "description": "체인 목걸이입니다.",
//               "isNew": false,
//               "isBest": true,
//               "productImg": "/img/rings/chain-necklace"
//           },
//           "count": 1,
//           "size": "L"
//       }
//   ],
//   "totalPrice": 10000,
//   "orderDate": "2023-10-12T00:00:00.000Z",
//   "user": "6520eb2efc38ba77d45fd908",
//   "orderer": "소유빈",
//   "orderPassword": null,
//   "email": "yso682879@gmail.com",
//   "orderAddress": "경기도",
//   "paidThrough": "카드 결제",
//   "isCanceled": false
// },
// {
//   "_id": "6521002bfc99058558ce39d2",
//   "deliveryStatus": "배송 완료",
//   "orderProducts": [
//       {
//           "_id": "65211f902bd5fb092aaaed39",
//           "products": {
//               "_id": "6520ef93fc99058558ce39c6",
//               "productName": "gold ring",
//               "price": 5000,
//               "category": "ring",
//               "description": "금색 반지입니다.",
//               "isNew": false,
//               "isBest": true,
//               "productImg": "/img/rings/gold-ring"
//           },
//           "count": 2,
//           "size": "S"
//       },
//       {
//           "_id": "65211f902bd5fb092aaaed3a",
//           "products": {
//               "_id": "6520f06bfc99058558ce39ca",
//               "productName": "pick earrring",
//               "price": 5000,
//               "category": "earring",
//               "description": "분홍색 귀걸이입니다.",
//               "isNew": false,
//               "isBest": false,
//               "productImg": "/img/rings/pink-earring"
//           },
//           "count": 1,
//           "size": "M"
//       }
//   ],
//   "totalPrice": 15000,
//   "orderDate": "2023-04-07T00:00:00.000Z",
//   "user": "6520eb2efc38ba77d45fd908",
//   "orderer": "소유빈",
//   "orderPassword": null,
//   "email": "yso682879@gmail.com",
//   "orderAddress": "경기도",
//   "paidThrough": "카드 결제",
//   "isCanceled": false
// }];

getOrderData(); // 초기 데이터 불러오기

async function getOrderData() {
  await fetch(`/api/users/mypage/order-tracking?userId=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 400) {
        tableDisplay("none", "display");
      } 
      return res.json();
    })
    .then((orderData) => {
        if (orderData.length < 1) { // 주문 내역 없을 때
          tableDisplay("none", "display");
        } else {
          tableDisplay("display", "none");
          saveData = orderData;
          orderData.forEach(data => {
            let { deliveryStatus, orderProducts, totalPrice, isCanceled, orderDate: date } = data;
            const orderId = data["_id"];
            date = date.toString().substring(0,10);
            addProduct(orderId, date, orderProducts, deliveryStatus, isCanceled, totalPrice);
          });
        }
    })
    .catch((err) => console.log(err));
}

// 상품 삽입
function addProduct(orderId, orderDate, orderProducts, deliveryStatus, isCanceled, totalPrice) {
  let cnt = 0;
  for (let product of orderProducts) {
    cnt += product.count;
  }
  const product = orderProducts[0].products;
  const size = orderProducts[0].size;
  const productName =
    orderProducts.length === 1
      ? String(product.productName).toUpperCase()
      : `${String(product.productName).toUpperCase()} - ${size}외 ${
          orderProducts.length - 1
        }`;
        
  let content = 
    `<tr class='order-${orderId}'>
      <td class="order-id">
        <p>${orderDate}</p>
        <p>${orderId}</p>
      </td>
      <td class="product-img"><img src='${product.productImg}'></td>
      <td class="product-name">${productName}</td>
      <td class="price">${String(totalPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
      <td class="count">${cnt}</td>
      <td>
        ${
          isCanceled === false ? '<button class="order-cancel">취소 신청</button>' : '-'
        }
      </td>
      <td class="delivery-status">${deliveryStatus}</td>
    </tr>`;

    $orderTable.insertAdjacentHTML('beforeend', content);
}

let $select = document.getElementById('order-status-select');
let orderStatus;
$select.addEventListener('change', function() {
  orderStatus = $select.options[$select.selectedIndex].label;
  if (orderStatus === "전체 주문처리상태") 
    window.location.href = `/user/orderTracking/${id}`;

  getOrderDataSelectStatus(orderStatus);
});
  
// 주문 처리상태로 검색 - 배송완료, 주문 완료, 배송중 ..
function getOrderDataSelectStatus(orderStatus) {
  // 주문 내역이 없으면 아래 함수들 실행 안되게
  if ($orderTable.querySelectorAll('tbody').length === 1) return;

  $orderTable = document.querySelector('.order-tracking-table');
  $noOrderProduct = document.querySelector('.no-order-product');
  const $tableItems = $orderTable.querySelectorAll("tr:not([class='order-title'])");
  $tableItems.forEach((el) => el.parentElement.remove());

  saveData.forEach(data => {
    let { deliveryStatus, orderProducts, totalPrice, isCanceled, orderDate: date } = data;
    const orderId = data["_id"];
    date = date.toString().substring(0,10);

    if (deliveryStatus === orderStatus)
      addProduct(orderId, date, orderProducts, deliveryStatus, isCanceled, totalPrice);
  });

  // 주문 내역이 있을 때 없을 때
  if ($orderTable.querySelectorAll('tbody').length === 1) {
    $noOrderProduct.style.display = "block";
  } else {
    $noOrderProduct.style.display = "none";
  }
}

document.querySelector('.today').addEventListener('click', (e) => getOrderDataPeriod(0));
document.querySelector('.months').addEventListener('click', () => getOrderDataPeriod(1));
document.querySelector('.three-months').addEventListener('click', () => getOrderDataPeriod(3));
document.querySelector('.six-months').addEventListener('click', () => getOrderDataPeriod(6));

// 기간으로 검색 - 오늘, 1개월, 3개월
function getOrderDataPeriod(period) {
  // 주문 내역이 없으면 아래 함수들 실행 안되게
  if ($orderTable.querySelectorAll('tbody').length === 1) return;

  $orderTable = document.querySelector('.order-tracking-table');
  $noOrderProduct = document.querySelector('.no-order-product');

  const $tr = $orderTable.querySelectorAll("tr:not([class='order-title'])");
  $tr.forEach(el => el.style.display = "block");
  const $tableItems = $orderTable.querySelectorAll("tr:not([class='order-title'])");
  $tableItems.forEach((el) => el.parentElement.remove());

  todayDate = new Date(today);

  saveData.forEach(data => {
    let { deliveryStatus, orderProducts, totalPrice, isCanceled, orderDate: date } = data;
    const orderId = data["_id"];
    date = date.toString().substring(0,10);

    let orderDate = new Date(date);

    // 오늘날짜와 주문날짜 비교해서 개월 차이 반환
    let diff = Math.abs((todayDate.getFullYear() - orderDate.getFullYear())*12 + (todayDate.getMonth() - orderDate.getMonth()));
    
    if (todayDate === date)
      addProduct(orderId, date, orderProducts, deliveryStatus, isCanceled, totalPrice);

    if (diff < period || diff === period)
      addProduct(orderId, date, orderProducts, deliveryStatus, isCanceled, totalPrice);
  });

  // 주문 내역이 있을 때 없을 때
  if ($orderTable.querySelectorAll('tbody').length === 1) {
    $noOrderProduct.style.display = "block";
  } else {
    $noOrderProduct.style.display = "none";
  }
}

function tableDisplay(trDisplay, noOrderDivDisplay) {
  $orderTable = document.querySelector('.order-tracking-table');
  $noOrderProduct = document.querySelector('.no-order-product');

  const $tr = $orderTable.querySelectorAll("tr:not([class='order-title'])");
  $tr.forEach(el => el.style.display = trDisplay);
  $noOrderProduct.style.display = noOrderDivDisplay;

}

document.querySelector('.order-tracking-table').addEventListener('click', (e) => {
  if (e.target.className === "order-cancel") {
    cancelOrder(e.target);
  }
})

async function cancelOrder(button) {
  const removeTarget = button.parentElement.closest('tr');
  const orderId = removeTarget.className.split('-')[1];

  const url = `/api/users/mypage/order-tracking?orderId=${orderId}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // JSON 데이터 전송을 위한 헤더
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) {
        removeTarget.parentElement.remove();
        window.location.href = `/user/orderTracking/${id}`;
      } else {
        alert(data.errMsg);
      }
    })
    .catch((err) => alert(err));
}
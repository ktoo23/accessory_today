const $noOrderProduct = document.querySelector('.no-order-product');
const $orderDiv = document.querySelector('.order-div');
const $orderTable = document.querySelector('.order-tracking-table');

let id = location.href.split('/');
id = id[id.length - 1];

getOrderData();

async function getOrderData() {
  await fetch(`/api/users/mypage/order-tracking?userId=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(res.status);
      if (res.status === 400) {
          $orderDiv.style.display = "none";
          $noOrderProduct.style.display = "block";
      } 
      return res.json();
    })
    .then((orderData) => {
      if (orderData.status === 200) {
          $orderDiv.style.display = "block";
          $noOrderProduct.style.display = "none";

          orderData.forEach(data => {
            let orderId = data["_id"];
            let deliveryStatus = data.deliveryStatus;
            let orderProducts = data.orderProducts;
            let isCanceled = data.isCanceled;
            addProduct(orderId, orderProducts, deliveryStatus, isCanceled);
          });
        }
    })
    .catch((err) => console.log(err));
}

function addProduct(orderId, orderProducts, deliveryStatus, isCanceled) {
  orderProducts.forEach(data => {
    let content = 
    `<tr class='order-${orderId}'>
      <td class="order-id">${orderId}
      </td>
      <td class="product-img"><img src='${data.products.productImg}'></td>
      <td class="product-name">${String(data.products.productName).toUpperCase()}</td>
      <td class="price">${String(data.products.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
      <td class="count">${data.count}</td>
      <td>
        ${
          isCanceled === false ? '<button class="order-cancel">취소 신청</button>' : '-'
        }
      </td>
      <td class="delivery-status">${deliveryStatus}</td>
    </tr>`;

    $orderTable.insertAdjacentHTML('beforeend', content);
  });
}

if ($orderTable.style.display === "block") {
  document.querySelector('.order-cancel').addEventListener('click', (e) => {
    cancelOrder(e);
 });
}
async function cancelOrder(e) {
  const target = e.target.parentElement.closest('tr');
  const orderId = target.className.split('-')[1];

  console.log(target, orderId);
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
        target.remove();
        window.location.href = `/user/orderTracking/${id}`;
      } else {
        console.log(data.errMsg);
      }
    })
    .catch((err) => alert(err));
}
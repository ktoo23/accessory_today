const currentPath = window.location.href;
const pathSegments = currentPath.split("/");
const orderId = pathSegments[pathSegments.length - 1];

// DOM이 로드될 때 비회원이 주문한 것 가져오기
document.addEventListener("DOMContentLoaded", loadNonMemberOrder);

// 주문번호는 고유하므로 비회원 주문은 1개만 보일 수밖에 없다.
// 비회원 이름 + 주문번호 + 주문 비밀번호 세 가지가 모두 일치해야 주문을 보는 것이 가능하기 때문!
async function loadNonMemberOrder(e) {
  e.preventDefault();
  await fetch(`/api/users/non-member-page?orderId=${orderId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.status !== 200) {
        alert(data.errMsg);
      } else {
        const table = document.querySelector(".order-tracking-table");
        const orderInfo = data.nonMemberOrder;
        // console.log(orderInfo);
        const orderedProducts = data.nonMemberOrder.orderProducts;
        let cnt = 0;
        for (let product of orderedProducts) {
          cnt += product.count;
        }
        const product = orderedProducts[0].products;
        const size = orderedProducts[0].size;
        // console.log(product);
        const productName =
          orderedProducts.length === 1
            ? `${product.productName}-${size}`
            : `${product.productName}-${size}외 ${
                orderedProducts.length - 1
              } 품목`;
        table.innerHTML += `<tr id=order-item0>
              <td>${orderInfo._id}</td>
              <td>
                <img src='${product.productImg}' />
              </td>
              <td>${productName}</td>
              <td>${orderInfo.totalPrice}</td>
              <td>${cnt}</td>
              <td>
                <button class='cancel-btn'>취소신청</button>
              </td>
              <td>${orderInfo.deliveryStatus}</td>
            </tr>`;
      }
    })
    .catch((err) => console.log(err));

  // 주문 취소 버튼을 클릭했을 때 해당 주문을 삭제하고 홈으로 리다이렉트 하기
  const cancelBtn = document.querySelector(".cancel-btn");
  cancelBtn.addEventListener("click", deleteTargetOrder);

  async function deleteTargetOrder(e) {
    const cancel = confirm("해당 상품 주문을 취소하시겠습니까?");
    if (cancel) {
      const targetOrderId =
        e.target.parentElement.parentElement.firstElementChild.innerText;
      const url = `/api/users/non-member-page?orderId=${targetOrderId}`;
      await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // JSON 데이터 전송을 위한 헤더
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            alert("비회원 주문 취소에 성공하였습니다. 홈페이지로 이동합니다.");
            window.location.href = "/";
          } else {
            alert(data.errMsg);
          }
        })
        .catch((err) => alert(err));
    }
  }
}

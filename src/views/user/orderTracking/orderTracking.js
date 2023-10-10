const userId = "6523ab70a7ebddef6d97827e";
const uri = '/api/users/mypage/order-tracking?userId=' + userId;

    fetch(uri, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then((res) => {
        if (res.status !== 200) {
          throw new Error("오류");
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
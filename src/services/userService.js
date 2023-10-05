import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/models/userModel.js";

// 로그인 시 토큰 발급을 위한 secret key 생성
// secret key는 한 번만 생성되어야 함.(고정)
const SECRET_KEY = "thisissecret";

class UserService {
  // 회원가입
  async join(email, password, checkPassword, username, address, phone) {
    // 중복되는 이메일이 존재하는지 검사
    const userExsist = await User.find({ email: email });
    // 중복되는 이메일이 있을 경우 이미 존재하는 사용자라고 알리기
    if (userExsist.length) {
      return {
        status: 400,
        errMsg: "이미 존재하는 이메일입니다. 다른 이메일을 입력해 주세요.",
      };
    }

    // 비밀번호란에 입력된 값과 비밀번호 확인란에 입력된 값이 다르면 비밀번호가 일치하지 않는다고 알려주기
    if (password !== checkPassword) {
      return {
        status: 400,
        errMsg: "비밀번호가 일치하지 않습니다. 다시 입력해 주세요.",
      };
    }

    // 비밀번호 암호화(해싱 5번)
    const hashedPassword = await bcrypt.hash(password, 5);
    // 암호화를 거친 비밀번호를 포함하여 새로운 사용자 정보 객체 생성
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
    });
    // db에 저장하기
    await User.create(newUser);
    // 성공 메시지와 새로 가입한 유저 정보 반환
    return {
      status: 200,
      message: "회원 가입을 축하합니다.",
      newUser: newUser,
    };
  }

  // 로그인
  async login(inputEmail, inputPassword) {
    // 입력받은 이메일이 DB에 존재하는지를 확인하고, 있으면 그 유저 정보 user에 담기
    const user = await User.findOne({ email: inputEmail });
    // 입력받은 이메일과 일치하는 이메일을 가진 유저가 없다면
    if (!user) {
      return {
        status: 400,
        errMsg: "존재하지 않는 이메일입니다.",
      };
    }

    // 해당 이메일을 가진 유저가 존재하면 그 유저의 비밀번호가 일치하는지 확인
    const isPasswordCorrect = await bcrypt.compare(
      inputPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return {
        status: 400,
        errMsg: "비밀번호가 일치하지 않습니다.",
      };
    }

    // 비밀번호가 일치하면 jwt 토큰 발급
    const tocken = await jwt.sign(
      {
        email: user.email,
      },
      SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    // 토큰 발급 중 에러가 발생하면 에러 메세지를 보냄.
    if (!tocken) {
      return {
        status: 400,
        errMsg: tocken,
      };
    }

    // 토큰이 정상적으로 발급되면 그 토큰을 응답으로 보냄.
    return {
      status: 200,
      message: `환영합니다 ${user.username}님!😊`,
      accessTocken: tocken,
    };
  }

  // 일반 회원 마이페이지
  async getMyPage(tocken) {
    // 위 로그인 시 이메일 정보만 토큰에 넘겼으므로 토큰을 decoding 했을 때 들어 있는 유저 정보는 email 뿐이다.
    // const content = await jwt.verify(tocken, SECRET_KEY, (err, decoded) => {
    //   if (err) return err;
    //   return decoded;
    // });
    // 우선 토큰이 유효한지 확인하기
    const decodingTocken = await jwt.verify(
      tocken,
      SECRET_KEY,
      (err, decoded) => {
        if (err) return err;
        return decoded;
      }
    );

    // 토큰이 유효하지 않으면 에러 메세지 보내기
    if (!decoding) {
      return {
        status: 400,
        errMsg: "토큰이 유효하지 않습니다.",
      };
    }

    // 토큰이 유효하면 해당 유저의 정보를 찾기 (토큰에는 유저의 이메일 정보만 들어 있다.)
    const user = await User.find({ email: decodingTocken.email });

    // 마이페이지에서 사용하기 위해 유저의 정보를 결과로 전달하기
    return {
      status: 200,
      message: `안녕하세요, ${user.username}님!😀`,
      user: user,
    };
  }

  // 비회원 마이페이지 비밀번호 검증하기
  postNonMember() {
    return "verify";
  }

  // 비회원 페이지 (비회원 주문조회 페이지)
  getNonMemberPage() {
    return "nonmember order";
  }
}

const userService = new UserService();

export { userService };

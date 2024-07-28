import bcrypt from "bcrypt";
import { Request, Response } from "express";
import {
  createUserService,
  findOneUserService,
  getUserService,
} from "./service";
import { decrypt, encrypt } from "../../utils/crypt";
import { signJWT } from "../../utils/jwt";

export const getUserController = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.body.id);
    const users = await getUserService({ userId });

    if (!users) {
      return res.status(400).json({ error: "Invalid user" });
    }
    return res.json({
      status: "Success",
      message: "Have user data",
      users,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  const username = req.body.username;
  const email = req.body.email;
  const pass = req.body.password;
  const tel = req.body.tel;
  const password = encrypt(pass);

  const user = await findOneUserService({ tel });
  console.log({ user });

  if (user) {
    return res.json({
      status: "error",
      message: "ໝາຍເລກໂທລະສັບນີ້ມີໃນລະບົບແລ້ວ",
    });
  }
  const create = await createUserService({ username, password, tel, email });
  if (!create) {
    return res.json({
      status: "error",
      message: "ການສ້າງຜູ້ໃຊ້ງານ ຜິດພາດ ລອງໃໝ່ໃນພາຍຫຼັງ",
    });
  }

  return res.json({
    status: "success",
    message: "ການສ້າງຜູ້ໃຊ້ງານ ສຳເລັດແລ້ວ",
    create,
  });
};

export const userLoginController = async (req: Request, res: Response) => {
  const tel = req.body.tel;
  const password = req.body.password;
  const user = await findOneUserService({ tel });
  if (!user) {
    return res.json({
      status: "error",
      message: "ບໍ່ພົບຂໍ້ມູນຜູ້ໃຊ້ງານ",
    });
  }

  if (decrypt(user.password) !== password) {
    return res.json({
      status: "error",
      message: "ໝາຍເລກໂທລະສັບ ຫຼື ລະຫັດຜ່ານ ບໍ່ຖືກຕ້ອງ",
    });
  }

  const { password: passes, ..._user } = user;

  const token = await signJWT({ _user });
  if (!token) {
    return res.json({
      status: "error",
      message: "ບໍ່ສາມາດເຂົ້າລະບົບໄດ້",
    });
  }

  return res.json({
    status: "success",
    message: "Login Success",
    user: {
      ..._user,
      token,
    },
  });
};

export const updateUserController = async () => {};
function userLoginService(arg0: { email: any; password: any }) {
  throw new Error("Function not implemented.");
}

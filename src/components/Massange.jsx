import React, { useState } from "react";
import axios from "axios";
import { carsData, marks } from "../autoPosterData";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { comment } from "postcss";

const Massange = () => {
  const [open, setOpen] = React.useState(0);
  const [link, setlink] = useState("https://auto-poster.netlify.app/");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mark, setmark] = useState("");
  const [model, setmodel] = useState("");
  const [massange, setmassange] = useState("");
  const [error, setError] = useState("");

  const faild = () =>
    toast.error("Malumotnomani toldiring 📌", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      text: "start",
    });

  const success = () =>
    toast.success("Malumot yuborildi 🚀", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      text: "start",
    });

  const [emailError, setemailerror] = useState(false);
  const [nameerror, setnameerror] = useState(false);
  const [coerror, setcoerror] = useState(false);
  const [markError, setmarkError] = useState(false);
  const [modelerror, setmodelerror] = useState(false);

  const modelArr = carsData.filter((e) => e.mark === mark);

  function setModelToArray(arr) {
    let models = new Set();
    arr.forEach((item) => {
      let model = item.name;
      models.add(model);
    });
    let ModelsArr = Array.from(models);
    return ModelsArr;
  }

  const models = setModelToArray(modelArr);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      mark === "" ||
      model === "" ||
      massange === ""
    ) {
      faild();
      // if (mark == "") {
      //   setmarkError(true);
      // }
      // if (model == "") {
      //   setmodelerror(true);
      // }
      // if (massange == "") {
      //   setcoerror(true);
      // }
      // if (name == "") {
      //   setnameerror(true);
      // } else {
      //   setnameerror(false);
      // }
      // if (email == "") {
      //   setemailerror(true);
      // }
    } else {
      success();
      const telegram_bot_id = "6385516963:AAFFX6rdrEn75OwlNSCR4Gkus-L3mVX0S5o";
      const chat_id = "6940337371";

      const telegramMessage = `
      ${link} rasmiy saytiga "${mark} ${model}" nomi automobil uchun kredit xujjatlashtirish uchun yangi foidalanuvchi sorov yubordi 📌\n\n foidalanuvchi Ismi: ${name}\n foidalanuvchi Email: ${email}\n\n foidalanuvhi izohi boyicha:\n ${massange}\n\n foidalanuvchini 👤 sorovini korib chiqish talab qilinadi ✅
      `;

      axios
        .post(`https://api.telegram.org/bot${telegram_bot_id}/sendMessage`, {
          chat_id,
          text: telegramMessage,
        })
        .then((response) => {
          setName("");
          setEmail("");
          setmark("");
          setmodel("");
          setmassange("");
        });
      // .catch((error) => {
      //   console.error(error);
      // });
    }
    if (!validateEmail(email)) {
      setError("Hatolik! Malumot email formatida emas");
      return;
    }
  };
  return (
    <div className=" w-full p-8 shadov rounded-lg text-center stick lg:w-[30%]">
      <h3 className="textStyle text-[24px]">Automobilga kredit olish</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          defaultValue={"marka"}
          className={`w-full border-2 border-gray-300 outline-none p-3 rounded-lg bg-gray-100 o2 ${
            markError && "border-red-500"
          }`}
          onChange={(e) => setmark(e.target.value)}
          value={mark}
        >
          <option value={""} selected disabled>
            mark
          </option>
          {marks.map((car) => {
            return (
              <option key={car} value={car}>
                {car}
              </option>
            );
          })}
        </select>
        <select
          defaultValue={"model"}
          className={`w-full border-2 border-gray-300 outline-none p-3 rounded-lg bg-gray-100 o2 ${
            modelerror && "border-red-500"
          }`}
          onChange={(e) => setmodel(e.target.value)}
          value={model}
        >
          <option value={""} selected disabled>
            model
          </option>
          {/* {models.length === 0 && <option value={""}>marka tanlang</option>} */}
          {models.length !== 0 &&
            models.map((e) => {
              return (
                <option key={e} value={e}>
                  {e}
                </option>
              );
            })}
        </select>
        <textarea
          className={`w-full border-2 border-gray-300 outline-none p-3 rounded-lg bg-gray-100 appearance-none resize-none ${
            coerror && "border-red-500 placeholder:text-red-500"
          }`}
          placeholder="izoxingiz..."
          onChange={(e) => setmassange(e.target.value)}
          value={massange}
        ></textarea>
        <br />
        <h3 className="textStyle text-[18px] text-left mb-4">
          malumotingizni kiriting
        </h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full border-2 border-gray-300 outline-none p-3 rounded-lg bg-gray-100 o2 ${
            nameerror && "border-red-500 placeholder:text-red-500"
          }`}
          type="text"
          placeholder="toliq ismingizni kiriting"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full border-2 border-gray-300 outline-none p-3 rounded-lg bg-gray-100 o2 ${
            emailError && "border-red-500 placeholder:text-red-500"
          }`}
          type="email"
          placeholder="Email"
        />
        {error}

        <button
          type="submit"
          className="py-3 bg-[#e70a32] w-full rounded-md text-white"
        >
          sorovni jonatish
        </button>
      </form>

      <br />
      <p className="fontStyle text-[12px] text-gray-500">
        Tugmani bosish orqali siz shaxsiy ma'lumotlarni qayta ishlashga rozilik
        bildirasiz
      </p>
      <ToastContainer />
    </div>
  );
};

export default Massange;

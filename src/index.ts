import express, {Request, Response} from "express";
import { router } from "./routes/inventory";
import { routers } from "./routes/post";

    const app = express();
    var cors = require("cors");
    const port = 8080;

app.use(cors());
    
export const contentData = [
  {
    id: 1,
    slug: "diksar",
    title: "Pendidikan dan Latihan Dasar PASAINS XVIII",
    location: "Hutan Wanagama, 2-6 November 2016",
    content: "Pendidikan dan Latihan Dasar (Diklatsar) PASAINS XVIII sudah dilaksanakan pada tanggal 2 - 6 November 2016 di Hutan Wanagama Gunung Kidul. Peserta yang ikut menjalani Diklatsar berjumlah 16 orang terdiri dari berbagai program studi di Fakultas Matematika dan Ilmu Pengetahuan Alam UGM. Peserta Diksar terdiri dari 8 perempuan dan 8 laki-laki. ",
    picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"
  },
  {
    id: 2,
    slug: "dikjutgh",
    title: "Pendidikan Lanjut Gunung dan Hutan PASAINS XVIII",
    location: "Gunung Merbabu & Merapi, 16-18 Desember 2016",
    content: "Pendidikan Lanjut Gunung dan Hutan (Dikjut GH) terlaksana pada 16 -17 Desember 2016. Dikjut GH dilaksanakan di Gunung Merbabu dan Gunung Merapi. Pendakian Gunung Merbabu melalui jalur pendakian via Wekas dan dilajutkan lintas jalur melalui jalur pendakian via Selo. Selajutnya pendakian Gunung Merapi melalui jalur pendakian via Selo.",
    picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"
  },
  {
    id: 3,
    slug: "dikjutcv",
    title: "Pendidikan Lanjut Caving PASAINS XVIII",
    location: "Gua nglibeng, 19-21 maret 2017",
    content: "Pendidikan Lanjut Caving (DIkjut CV) terlaksana pada bulan Maret 2017. Dikjut CV dilaksanakan di Gua Nglibeng untuk gua veritkal dan Gua Plelen untuk gua horizontal.",
    picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"
  },
  {
    id: 4,
    slug: "dikjutcb",
    title: "Pendidikan Lanjut Climbing PASAINS XVIII",
    location: "Tebing Siung, 24-26 Juni 2017",
    content: "Pendidikan Lanjut Climbing (Dikjut CB) terlaksana pada bulan Juni 2017. Dikjut CB dilaksanakan di Tebing Siung Gunung Kidul dan diikuti oleh 14 peserta.",
    picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"
  },
  {
    id: 5,
    slug: "dikjutimpk",
    title: "Pendidikan Lanjut IMPK PASAINS XVIII",
    location: "Sapu Angin, 5-6 September 2017",
    content: "Pendidikan Lanjut IMPK (Dikjut IMPK) terlksana pada bulan september 2017. Dikjut IMPK dilaksanakan di lereng Gunung Merapi, Klaten, Jawa Tengah dan diikuti oleh 14 peserta.",
    picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"
  },
  {id:6,
    slug: "pengembaraan",
    title: "Pengembaraan PASAINS XVIII",
    location: "Gunung Lawu, 11-13 Desember 2017",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"
  }
];

export const dataInventory = [{
  id: 1,
  slug: "carabiner",
  name: "Carabiner",
  nomor: "24/CR/102",
  description: "Merek PETZL warna silver. Skru otomatis warna biru. Nomor seri 678-545",
  picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"
},
{
  id: 2,
  slug: "seatharness",
  name: "Seat Harness Climbing",
  nomor: "24/CB/865",
  description: "Merek PETZL warna hitam lorek kuning. Seat harner climbing",
  picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"
},
{
  id: 3,
  slug: "zummar",
  name: "Zummar",
  nomor: "24/CV/453",
  description: "Merek PETZL otomatis warna biru merah. Nomor seri 7865.",
  picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"},

{
  id: 4,
  slug: "komporlapangan",
  name: "Kompor Lapangan",
  nomor: "24/KL/765",
  description: "Kompor lapangan silver merah. Pematik rusak.",
  picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"},

{
  id: 5,
  slug: "tenda",
  name: "Tenda Lafuma",
  nomor: "24/T/235",
  description: "Tenda Lafuma kuning kapasitas 6 orang.",
  picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"},

{
  id: 6,
  slug: "carmantel",
  name: "Carmantel Caving",
  nomor: "24/CV/879",
  description: "Warna hijau lorek orange",
  picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"},

{
  id: 7,
  slug: "COS",
  name: "COS",
  nomor: "24/CV/234",
  description: "Eiger warna hitam",
  picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"},
  {
  id: 8,
  slug: "COS",
  name: "COS",
  nomor: "24/CV/234",
  description: "Eiger warna hitam",
  picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"},
  
  {id: 9,
  slug: "COS",
  name: "COS",
  nomor: "24/CV/234",
  description: "Eiger warna hitam",
  picture: "https://pbs.twimg.com/media/EiSwKFkVoAAs6Wa.jpg"},

];

app.use(router);
app.use(routers);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

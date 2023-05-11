import erdogan from "../images/presidency/tayyip-erdogan.jpg";
import ince from "../images/presidency/muharrem-ince.jpeg";
import kilicdaroglu from "../images/presidency/kemal-kilicdaroglu.jpeg";
import ogan from "../images/presidency/sinan-ogan.jpeg";

const candidates = [
  {
    id: 1,
    name: "Recep Tayyip Erdoğan",
    imageUrl: erdogan,
  },
  {
    id: 2,
    name: "Muharrem İnce",
    imageUrl: ince,
    withdrawn: true,
  },
  {
    id: 3,
    name: "Kemal Kılıçdaroğlu",
    imageUrl: kilicdaroglu,
  },
  {
    id: 4,
    name: "Sinan Oğan",
    imageUrl: ogan,
  },
];

export { candidates };

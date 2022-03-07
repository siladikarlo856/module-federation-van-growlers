import "./index.scss";
import { load, subscribe } from "growlers/store";

import VanillaCart from "growlers/VanillaCart";
import VanillaTaps from "growlers/VanillaTaps";
import VanillaSearch from "growlers/VanillaSearch";

interface Beverage {
  name: string;
  producerName: string;
  beverageName: string;
  beverageColor: string;
  beverageStyle: string;
  producerLocation: string;
  abv: number;
  ibu: number;
  logo: string;
  level: number;
}

load("hv-taplist");

subscribe((state: any) => {
  const tapList = state.filteredTaps
    .slice(0, 3)
    .map(({ beverageName }: Beverage) => beverageName)
    .join(", ");
  document.querySelector("#like")!.innerHTML = tapList;
});

VanillaCart("#cart");
VanillaTaps("#taps");
VanillaSearch("#search");

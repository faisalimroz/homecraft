
import { Metadata } from "next";
import HomePage from "./home/page";

export const metadata: Metadata = {
  title: "HC | Home",
};


export default function Home() {
  return ( <HomePage/>);
}

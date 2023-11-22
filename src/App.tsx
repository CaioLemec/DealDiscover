import React, { useEffect, useState } from "react";
import "./global.css";
import styles from "./App.module.css";
import { Deal } from "./components/Deal";
import { Header } from "./components/Header";
import { SpinnerGap } from "@phosphor-icons/react";

export interface DealType {
  url: string;
  asin: string;
  price: number;
  title: string;
  rating: number;
  is_prime: boolean;
  url_image: string;
  shipping_information: string;
}

export function App(): JSX.Element {
  const [deals, setDeals] = useState<DealType[] | null>(null);

  const getDeals = async () => {
    try {
      const response = await fetch("http://localhost:5172/deals", {
        method: "GET",
      });
      const data = await response.json();
      setDeals(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDeals();
  }, []);

  return (
    <>
    <Header />
    <div className={styles.wrapper}>
      {deals ? (
        deals.map((deal) => <Deal deal={deal} />)
      ) : (
        <SpinnerGap size={50} className={styles.loading}/>
      )}
    </div>
    </>
  );
}

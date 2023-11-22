import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { DealType } from "../App";
import styles from "./Deal.module.css";
import { Sparkle, AmazonLogo } from "@phosphor-icons/react";

interface DealProps {
  deal: DealType;
}

export function Deal({ deal }: DealProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const getShippingInfo = (shippingInformation: string) => {
    const index = shippingInformation.indexOf(".");
    if (index !== -1) {
      return shippingInformation.substring(index + 1).trim();
    }
    return shippingInformation;
  };

  const openAmazonLink = (url: string) => {
    window.open(`https://www.amazon.com.br/${url}`, "_blank");
  };

  return (
    <div
      key={deal.asin}
      className={styles.dealContainer}
      onClick={() => {
        openAmazonLink(deal.url);
      }}
    >
      <img src={deal.url_image} alt={deal.title} className={styles.dealImage} />
      <span className={deal.asin}>{truncateText(deal.title, 60)}</span>
      <Tooltip anchorSelect={`.${deal.asin}`} place="top">
        {deal.title}
      </Tooltip>
      <span className={styles.primeInfo}>
        Prime <AmazonLogo className={styles.amazonLogo} />
      </span>
      <div className={styles.priceDetails}>
        <div className={styles.priceContainer}>
          <span>{`R$ ${deal.price}`}</span>
          <span>
            {deal.rating}
            <Sparkle className={styles.sparkleIcon} size={18} />
          </span>
        </div>
        <span>{getShippingInfo(deal.shipping_information)}</span>
      </div>
    </div>
  );
}

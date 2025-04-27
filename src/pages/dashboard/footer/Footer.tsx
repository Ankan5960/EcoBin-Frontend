import { DEFAULT_ITEM_PROPERTIES } from "@/configurations/default-item-properties";

const Footer = () => {
  return (
    <footer className={`${DEFAULT_ITEM_PROPERTIES.themeColor.footer} text-white text-center p-3`}>
      &copy; 2025 EcoBin. All rights reserved.
    </footer>
  );
};

export default Footer;
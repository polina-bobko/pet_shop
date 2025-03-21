import React from "react";
import styles from "./AllProductsPage.module.css";
import { useSearchParams} from "react-router-dom";
import { useEffect} from "react";
import { addToCart } from "../../../redux/slices/cartSlice";
import BreadCrumbs from "../../../components/breadCrumbs/BreadCrumbs";
import Filter from "../../../components/filter/Filter";
import sortProducts from "../../../utils/filteredProducts";
import Product from "../../../pages/Products/Product/Product";
import { getAllProducts } from "../../../redux/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function AllProductsPage() {
    const [searchParams] = useSearchParams();
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    const location = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
  
    useEffect(() => {
      dispatch(getAllProducts());
    }, [dispatch]);
  
    const filteredProducts = sortProducts(products, searchParams);
  
  return (
    <div className={styles.allProducts}>
      <BreadCrumbs
        items={[
          { path: "/", label: "Main page" },
          { path: "/categories", label: "All products", isActive: true },
        ]}
      />

      <h2>All products</h2>
      <Filter/>
      <div className={styles.allProducts_box}>
      {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Product
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))
          ) : (
            <p style={{ marginTop: "20px", fontSize: "30px", textAlign: "center"}}>No products found</p>
          )}
      </div>
    </div>
  );
}

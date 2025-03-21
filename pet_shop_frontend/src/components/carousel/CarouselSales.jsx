import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import styles from "./CarouselSales.module.css";

import { useEffect } from "react";
import { getAllProducts } from "../../redux/thunks.js";
// import required modules
import { Pagination, Autoplay} from "swiper/modules";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../pages/Products/Product/Product.jsx";

export default function CarouselSales() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
      <Swiper
        slidesPerView={4}
        spaceBetween={32}
        scrollbar={{ hide: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className={styles.mySwiper}
      >
        {products && products.length > 0 ? (
          products.map(
            (product) =>
              product.discont_price !== null && (
                <SwiperSlide key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    {/* <div className={styles.product_box}>
                      <div className={styles.product_img_box}>
                        <img
                          src={"http://localhost:3333/" + product.image}
                          className={styles.product_img}
                          alt={product.title}
                        />
                        <div className={styles.discount_icon}>
                          <p className={styles.discount}>-{Math.ceil(((product.price - product.discont_price) / product.price) * 100)}%</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "20px 32px 32px 32px", borderTop: "1px solid #DDDDDD" }}>
                        <p className={styles.product_title} style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {product.title}
                        </p>
                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "16px" }}>
                            <p className={styles.product_price}>${product.discont_price}</p>
                            <p className={styles.old_price}>${product.price}</p>
                        </div>
                      </div>
                    </div> */}
                    <Product product={product} />
                  </Link>
                </SwiperSlide>
              )
          )
        ) : (
          <p>There are no available sales</p>
        )}
      </Swiper>
    </div>
  );
}


import endPoints from '@services/api';
import { useContext, useRef } from 'react';
import Head from 'next/head';
import axios from 'axios';
import SimpleHeader from '@common/SimpleHeader';
import styles from '@styles/Product.module.scss';
import AppContext from '@context/AppContext';

export default function Product({ product }) {
  const { state, addToCart } = useContext(AppContext);
  let inCart = state?.cart.some((item) => item['id'] === product.id);
  const handleClick = (item) => {
    if (!inCart) {
      addToCart(item);
    }
  };
  const resultRef = useRef(null);
  const lensRef = useRef(null);
  const imgRef = useRef(null);
  const handleZoom = (e) => {
    lensRef.current.style.display = 'block';
    resultRef.current.style.display = 'block';
    let result = resultRef.current;
    let lens = lensRef.current;
    let img = imgRef.current;

    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();

    /*calculate the ratio between result DIV and lens:*/
    let cx = result.offsetWidth / lens.offsetWidth;
    let cy = result.offsetHeight / lens.offsetHeight;

    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = img.width * cx + 'px ' + img.height * cy + 'px';

    let pos, x, y;
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }
    /*set the position of the lens:*/
    lens.style.left = x + 'px';
    lens.style.top = y + 'px';
    /*display what the lens "sees":*/
    result.style.backgroundPosition = '-' + x * cx + 'px -' + y * cy + 'px';

    function getCursorPos(e) {
      let a,
        x = 0,
        y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
    lensRef.current.style.display = 'none';
    resultRef.current.style.display = 'none';
  }

  return (
    <>
      <Head>
        <title>Next Shop - {product.name}</title>
      </Head>
      <SimpleHeader color={'skyblue'} />
      <div className={styles['Product-container']}>
        <div className={styles['Product-content']}>
          <figure className={styles['Product-Image']}>
            <div ref={lensRef} onMouseMove={handleZoom} onMouseLeave={handleMouseLeave} className={styles['img-zoom-lens']}></div>
            <img ref={imgRef} onMouseMove={handleZoom} src={product.image} alt={product.name} />
          </figure>
          <div className={styles['Product-info']}>
            <h2>{product.name}</h2>
            <p className={styles['Price']}>${product.price}</p>
            <button onClick={() => handleClick(product)} className={`primary-button ${styles['add-to-cart-btn']}  ${inCart ? styles['added-to-cart-btn'] : ''}`}>
              <span>+</span>
              ADD TO CART
            </button>
            <h3>Description</h3>
            <p className={styles['Description']}>{product.description}</p>
            <div ref={resultRef} className={styles['img-zoom-result']}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const { productId } = context.query;
    const { data: product } = await axios.get(endPoints.products.getProduct(productId));
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

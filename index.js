import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Validator } from "../../common";
import ProductSize from "./ProductSize";
import ImageContainer from "./ImageContainer";
import ProductPrice from "./ProductPrice";

const ProductCard = ({ product }) => {
  const { Code, ProductSize: sizes = [], Name, Key } = product;
  const [productSize, setProductSize] = useState(sizes?.length ? sizes[0] : {});
  const navigator = useNavigate();
  const productCode = Validator.constructURLstring(Code);
  const url = `/pd/${productCode}/${Validator.removeSpecialCharacter(Name)}`;
  const onSizeSelect = (selectedSize) => {
    setProductSize(selectedSize);
  };

  const onProductClick = (e) => {
    e.preventDefault();
    navigator(url, { state: true });
  };

  return (
    <div>
      {productSize.PercentSave > 0 && productSize.PercentSave !== 0 ? (
        <div className="discount-block">
          {productSize.PercentSave + " "}% Off
        </div>
      ) : null}
      <div onClick={onProductClick}>
        <a href={url} title={product?.Name}>
          <ImageContainer {...productSize} />{" "}
        </a>
      </div>
      <h6 className="recome-prod-title">{Name}</h6>
      <div>
        <ProductSize
          sizes={sizes}
          onSizeSelect={onSizeSelect}
          sizeKey={productSize?.Key}
        />
        <ProductPrice productSize={productSize} />
      </div>
    </div>
  );
};

export default ProductCard;

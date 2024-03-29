import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { getShopifyImage } from "gatsby-source-shopify"
import { formatPrice } from "../utils/format-price"
import {
  productCardStyle,
  productHeadingStyle,
  productImageStyle,
  productDetailsStyle,
  productVendorStyle,
  productPrice,
} from "./product-card.module.css"

export function ProductCard({ product, eager }) {
  const {
    title,
    priceRangeV2,
    slug,
    images: [firstImage],
    vendor,
    storefrontImages,
  } = product

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    priceRangeV2.minVariantPrice.amount
  )

  let storefrontImageData = {}
  if (storefrontImages) {
    const storefrontImage = storefrontImages.edges[0].node
    try {
      storefrontImageData = getShopifyImage({
        image: storefrontImage,
        layout: "fixed",
        width: 200,
        height: 200,
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Link
      className={productCardStyle}
      to={slug}
      aria-label={`View ${title} product page`}
    >
      <div className={productImageStyle} data-name="product-image-box" style={{overflow:'visible', width:'100%', backgroundSize: '', justifyContent:'center'}}>
        <GatsbyImage
          alt={firstImage?.altText ?? title}
          image={firstImage?.gatsbyImageData ?? storefrontImageData}
          loading={eager ? "eager" : "lazy"

        }
        />
      </div>
      
      <div className={productDetailsStyle}>
        {/* <div className={productVendorStyle}>{vendor}</div> */}
        {/* <h2 as="h2" className={productHeadingStyle}>
          {title}
        </h2> */}
        {/* <div className={productPrice}>{price}</div> */}
      </div>
    </Link>
  )
}

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    title
    slug: gatsbyPath(
      filePath: "/art/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    )
    images {
      id
      altText
      gatsbyImageData(height:350)
    }
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    vendor
  }
`

import { Fragment, useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Menu, RadioGroup, Transition } from "@headlessui/react";
import {
  selectProductsById,
  FetchProductsByIdAsync,
  selectStatus,
} from "../ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  AddToCartAsync,
  selectCarts,
  selectCartsStatus,
} from "../../Cart/CartSlice";

import { discountPrice } from "../../../app/Constant";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Common/LoadingSpinner/LoadingSpinner";
import { TbLocationShare } from "react-icons/tb";
import { FaLink } from "react-icons/fa6";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import {
  whiteColor,
  blackColor,
  bg_white,
  bg_black,
} from "../../../app/Constant";
// ==========================================================================

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ==========================================================================

const ProductsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ProductData = useSelector(selectProductsById);
  const status = useSelector(selectStatus);
  const cartStatus = useSelector(selectCartsStatus);
  const GetAddToCart = useSelector(selectCarts);

  // ==========================================================================

  // to check product is already in cart or not : to implement duplicate problem

  const CheckingProductInCart = GetAddToCart.filter(
    (items) => items.product.id === ProductData.id
  );

  // ==========================================================================
  const product = {
    title: ProductData.title,
    price: discountPrice(ProductData),
    rating: ProductData.rating,
    stock: ProductData.stock,

    href: "#",
    breadcrumbs: [
      { id: 1, name: ProductData.brand, href: "#" },
      { id: 2, name: ProductData.category, href: "#" },
    ],
    thumbnail: ProductData.thumbnail,
    images: ProductData.images,
    colors: [
      { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
      { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
      { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    ],
    sizes: [
      { name: "XXS", inStock: false },
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
      { name: "2XL", inStock: true },
      { name: "3XL", inStock: true },
    ],
    description: ProductData.description,
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  };

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  const handleAddToCart = () => {
    dispatch(
      AddToCartAsync({
        quantity: 1,
        product: ProductData.id,
      })
    );
    // TODO : it will be based on the server response
    toast.success(<h3 className="font-bold"> 🛒 item added to cart</h3>);
  };

  const handleBuyProduct = () => {
    dispatch(
      AddToCartAsync({
        quantity: 1,
        product: ProductData.id,
      })
    );
    // TODO : it will be based on the server response
    toast.success(<h3 className="font-bold"> 🛒 item added to cart</h3>);
  };

  // =============================================================================

  const darkMode = useSelector((state) => state.user.dark);

  // =============================================================================

  const pageUrl = window.location.href;
  const [copy, setCopy] = useState(false);
  const productShareOption = () => {
    navigator.clipboard
      .writeText(pageUrl)
      .then(() => {
        setCopy(true);
      })
      .catch((error) => {
        setCopy(false);
      });

    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  // =============================================================================

  useEffect(() => {
    dispatch(FetchProductsByIdAsync(id));
  }, [dispatch, id]);

  // =============================================================================

  return (
    <>
      {status ? (
        <LoadingSpinner />
      ) : (
        <div className={`${darkMode ? bg_black : bg_white} relative`}>
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                {product.breadcrumbs &&
                  product.breadcrumbs.map((breadcrumb) => (
                    <li key={breadcrumb.id}>
                      {status ? (
                        <LoadingSpinner />
                      ) : (
                        <div className="flex items-center">
                          <a
                            href={breadcrumb.href}
                            className={`${
                              darkMode ? blackColor : whiteColor
                            }  mr-2 text-sm font-medium text-gray-900`}
                          >
                            {breadcrumb.name}
                          </a>
                          <svg
                            width={16}
                            height={20}
                            viewBox="0 0 16 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-5 w-4 text-gray-200"
                          >
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                          </svg>
                        </div>
                      )}
                    </li>
                  ))}
                <li className="text-sm">
                  <a
                    href={product.href}
                    aria-current="page"
                    className="font-medium text-gray-400 hover:text-gray-600"
                  >
                    {product.title}
                  </a>
                </li>

                <Menu
                  as="div"
                  className="absolute z-10 right-2 top-[5.5rem] sm:top-2 ml-3"
                >
                  <div>
                    <Menu.Button
                      className={`${
                        darkMode ? bg_white : bg_black
                      } relative p-[0.5rem] flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 `}
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <TbLocationShare
                        className={`${
                          darkMode ? whiteColor : blackColor
                        } text-[1.5rem] rounded-[0.5rem]`}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-opacity-5 focus:outline-none">
                      <div className="flex flex-col gap-3 py-2">
                        <WhatsappShareButton
                          className="flex gap-4 ml-3 "
                          url={pageUrl}
                          title={product.title}
                          separator=" - "
                        >
                          <WhatsappIcon size={22} round />
                          WhatsApp
                        </WhatsappShareButton>

                        <FacebookShareButton
                          className="flex gap-4 ml-3 "
                          url={pageUrl}
                          title={product.title}
                          separator=" - "
                        >
                          <FacebookIcon size={22} round />
                          Facebook
                        </FacebookShareButton>

                        <EmailShareButton
                          className="flex gap-4 ml-3 "
                          url={pageUrl}
                          title={product.title}
                          separator=" - "
                        >
                          <EmailIcon size={22} round />
                          Email
                        </EmailShareButton>

                        <LinkedinShareButton
                          className="flex gap-4 ml-3 "
                          url={pageUrl}
                          title={product.title}
                          separator=" - "
                        >
                          <LinkedinIcon size={22} round />
                          Linkedin
                        </LinkedinShareButton>

                        <button
                          onClick={productShareOption}
                          className="flex gap-4 ml-3 "
                        >
                          <FaLink />
                          {copy ? "Link Copied" : "Copy Link"}
                        </button>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </ol>
            </nav>
            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={
                    product.images && product.images[0]
                      ? product.images[0]
                      : product.thumbnail
                  }
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={
                      product.images && product.images[1]
                        ? product.images[1]
                        : product.thumbnail
                    }
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={
                      product.images && product.images[2]
                        ? product.images[2]
                        : product.thumbnail
                    }
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={
                    product.images && product.images[3]
                      ? product.images[3]
                      : product.thumbnail
                  }
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1
                  className={`${
                    darkMode ? blackColor : whiteColor
                  } text-2xl font-bold tracking-tight  sm:text-3xl`}
                >
                  {product.title}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                {product.stock <= 0 ? (
                  <p
                    className={"text-4xl font-bold tracking-tight text-red-500"}
                  >
                    Out of Stock
                  </p>
                ) : (
                  <p
                    className={`${
                      darkMode ? blackColor : whiteColor
                    } text-3xl tracking-tight `}
                  >
                    ₹{product.price.toLocaleString()}
                  </p>
                )}
                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating > rating
                              ? "text-gray-500"
                              : "text-gray-500",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                    <a
                      href={product.rating}
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {product.rating} reviews / {product.stock} Stock
                    </a>
                  </div>
                </div>

                <form className="mt-10">
                  {/* Colors */}
                  <div>
                    <h3
                      className={`${
                        darkMode ? blackColor : whiteColor
                      } text-sm font-medium text-gray-900`}
                    >
                      Color
                    </h3>

                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a color
                      </RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        {product.colors &&
                          product.colors.map((color) => (
                            <RadioGroup.Option
                              key={color.name}
                              value={color}
                              className={({ active, checked }) =>
                                classNames(
                                  color.selectedClass,
                                  active && checked ? "ring ring-offset-1" : "",
                                  !active && checked ? "ring-2" : "",
                                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                )
                              }
                            >
                              <RadioGroup.Label as="span" className="sr-only">
                                {color.name}
                              </RadioGroup.Label>
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  color.class,
                                  "h-8 w-8 rounded-full border border-black border-opacity-10"
                                )}
                              />
                            </RadioGroup.Option>
                          ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Sizes */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`${
                          darkMode ? blackColor : whiteColor
                        } text-sm font-medium `}
                      >
                        Size
                      </h3>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </a>
                    </div>

                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                        {product.sizes &&
                          product.sizes.map((size) => (
                            <RadioGroup.Option
                              key={size.name}
                              value={size}
                              disabled={!size.inStock}
                              className={({ active }) =>
                                classNames(
                                  size.inStock
                                    ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                    : "cursor-not-allowed bg-gray-50 text-gray-200",
                                  active ? "ring-2 ring-indigo-500" : "",
                                  "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                )
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <RadioGroup.Label as="span">
                                    {size.name}
                                  </RadioGroup.Label>
                                  {size.inStock ? (
                                    <span
                                      className={classNames(
                                        active ? "border" : "border-2",
                                        checked
                                          ? "border-indigo-500"
                                          : "border-transparent",
                                        "pointer-events-none absolute -inset-px rounded-md"
                                      )}
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span
                                      aria-hidden="true"
                                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                    >
                                      <svg
                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        stroke="currentColor"
                                      >
                                        <line
                                          x1={0}
                                          y1={100}
                                          x2={100}
                                          y2={0}
                                          vectorEffect="non-scaling-stroke"
                                        />
                                      </svg>
                                    </span>
                                  )}
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                      </div>
                    </RadioGroup>
                  </div>
                  {product.stock <= 0 ? null : (
                    <div className="flex gap-[1rem] justify-around">
                      {ProductData && CheckingProductInCart.length > 0 ? (
                        <NavLink to="/cart">
                          <button
                            type="button"
                            className="mt-10 flex w-[10rem] items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Go to Card
                          </button>
                        </NavLink>
                      ) : (
                        <button
                          onClick={handleAddToCart}
                          type="button"
                          className="mt-10 flex w-[10rem] items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          {cartStatus ? (
                            <div
                              role="status"
                              class="inline-block h-6 w-6 mr-2  animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            >
                              <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
                            </div>
                          ) : (
                            "Add to Card"
                          )}
                        </button>
                      )}
                      {ProductData && CheckingProductInCart.length > 0 ? (
                        <NavLink to="/checkout">
                          <button
                            type="button"
                            className="mt-10 flex w-[10rem] items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Buy now
                          </button>
                        </NavLink>
                      ) : (
                        <NavLink to="/checkout">
                          <button
                            onClick={handleBuyProduct}
                            type="button"
                            className="mt-10 flex w-[10rem] items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Buy now
                          </button>
                        </NavLink>
                      )}
                    </div>
                  )}
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p
                      className={`${
                        darkMode ? blackColor : whiteColor
                      } text-base`}
                    >
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3
                    className={`${
                      darkMode ? blackColor : whiteColor
                    } text-sm font-medium text-gray-900`}
                  >
                    Highlights
                  </h3>
                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {product.highlights &&
                        product.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className={darkMode ? blackColor : whiteColor}
                          >
                            <span
                              className={darkMode ? blackColor : whiteColor}
                            >
                              {highlight}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2
                    className={`${
                      darkMode ? blackColor : whiteColor
                    } text-sm font-medium text-gray-900`}
                  >
                    Details
                  </h2>

                  <div className="mt-4 space-y-6">
                    <p
                      className={`${
                        darkMode ? blackColor : whiteColor
                      } text-sm`}
                    >
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsDetails;

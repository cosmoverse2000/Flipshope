import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectBrands, selectCategories } from "../../product/productSlice";

const AdminProductForm = () => {
  //redux
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  //react-forms
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <form
        className="px-5 bg-white py-6 my-12"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          reset();
        })}
      >
        <div>
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="productname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="productname"
                    {...register("productname", {
                      required: "• Product name is Required !",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.productname && (
                    <p className="text-red-500">{errors.productname.message}</p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "• Description is Required !",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about product.
                </p>
              </div>
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    type="text"
                    {...register("brand", {
                      required: "• Brand is Required !",
                    })}
                    id="brand"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value=""> -- Choose Brand -- </option>
                    {brands.map((brand) => (
                      <option key={brand.value} value={brand.value}>
                        {" "}
                        {brand.label}{" "}
                      </option>
                    ))}
                  </select>
                  {errors.brand && (
                    <p className="text-red-500">{errors.brand.message}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    type="text"
                    {...register("category", {
                      required: "• Category is Required !",
                    })}
                    id="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value=""> -- Choose Category -- </option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {" "}
                        {category.label}{" "}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500">{errors.category.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price in INR
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register("price", {
                      required: "• Price is Required !",
                      min: { value: 1, message: "• Min-Price is Rs.1 !" },
                      max: {
                        value: 1000000,
                        message: "• Max-Price is Rs.1000000 !",
                      },
                    })}
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.price && (
                    <p className="text-red-500">{errors.price.message}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register("discount", {
                      required: "• Discount is Required !",
                      min: { value: 0, message: "• Min-Discount %  is 0 !" },
                      max: {
                        value: 100,
                        message: "• Max-Discount %  is 100 !",
                      },
                    })}
                    id="discount"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.discount && (
                    <p className="text-red-500">{errors.discount.message}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register("stock", {
                      required: "• Stock is Required !",
                      min: { value: 0, message: "• Min-Stock is 0 !" },
                    })}
                    id="stock"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.stock && (
                    <p className="text-red-500">{errors.stock.message}</p>
                  )}
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail Link
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="thumbnail"
                    {...register("thumbnail", {
                      required: "• Thumbnail Link is Required !",
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.thumbnail && (
                    <p className="text-red-500">{errors.thumbnail.message}</p>
                  )}
                </div>
              </div>
              {/* //To get 4 image input creted an garbage array  */}
              {Array.from({
                length: 4,
              }).map((e, index) => {
                return (
                  <div key={index} className="col-span-full">
                    <label
                      htmlFor={`image_${index + 1}`}
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image {index + 1}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id={`image_${index + 1}`}
                        {...register(`image_${index + 1}`, {
                          required: `• Image-${index + 1} Link is Required !`,
                        })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors[`image_${index + 1}`] && (
                        <p className="text-red-500">
                          {errors[`image_${index + 1}`].message}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" flex items-center justify-end gap-x-6 py-4">
            <button
              type="button"
              onClick={() => {
                reset();
              }}
              className="rounded-md border-2 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add to Products
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;

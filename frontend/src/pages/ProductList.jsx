import { useState } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../redux/api/productApiSlice.js";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./Admin/AdminMenu.jsx";
import Loader from "../components/Loader.jsx";
import axios from "axios";
const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("image", imageUrl);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      console.log(productData);
      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    console.log(e.target.files[0]);
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "images_preset");

    try {
      // const res = await uploadProductImage(formData).unwrap();
      let api = "https://api.cloudinary.com/v1_1/dbfahboiz/image/upload";
      // const res = await fetch(
      //   "https://api.cloudinary.com/v1_1/dbfahboiz/image/upload",
      //   {
      //     method: "POST",
      //     body: formData,
      //   }
      // );
      setLoading(true);
      const res = await axios.post(api, formData);
      const { secure_url } = res.data;
      toast.success(res.message);
      setImage(secure_url);

      setImageUrl(secure_url);
      setLoading(false);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12">Create Product</div>
        {loading ? (
          <Loader />
        ) : (
          imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )
        )}

        <div className="mb-3">
          <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 ">
            {image ? image.name : "Upload Image"}

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className={!image ? "hidden" : "text-white"}
            />
          </label>
        </div>

        <div className="p-3">
          <div className="flex flex-wrap">
            <div className="one">
              <label htmlFor="name" className="block mb-2 text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="two ml-5">
              <label htmlFor="name block" className="block mb-2 text-white">
                Price
              </label>
              <input
                type="number"
                id="name"
                className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="one">
              <label htmlFor="name block" className="block mb-2 text-white">
                Quantity
              </label>
              <input
                type="number"
                id="name"
                className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="two ml-5">
              <label htmlFor="name block" className="block mb-2 text-white">
                Brand
              </label>
              <input
                type="text"
                className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>

          <label className="my-5">Description</label>
          <textarea
            type="text"
            className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="flex justify-between">
            <div>
              <label htmlFor="name block">Count In Stock</label> <br />
              <input
                type="text"
                className="p-4 mb-3  w-[30rem] border rounded-lg bg-[#101011] text-white"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="" className="ml-[30px] mb-3">
                Category
              </label>
              <br />
              <select
                aria-placeholder="Choose Category"
                className="p-4 mb-3 translate-x-6 w-[30rem] border rounded-lg bg-[#101011] text-white"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductList;

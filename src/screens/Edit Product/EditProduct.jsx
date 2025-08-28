import React, { useState } from 'react'
import BaseForm from '../../components/Base Form/BaseForm';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const EditProduct = () => {
    const { id } = useParams();
    const navigate=useNavigate();
  const [initialData, setInitialData] = useState({});
  const productFields = [
    { label: "Product Name", name: "name" },
    { label: "Category", name: "category" },
    { label: "Price", name: "price" },
    { label: "Description", name: "description" },
    { label: "Image URL", name: "image", type:'url' },

  ];

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "Products", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setInitialData(snap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);
  const handleProductSubmit = (data) => {
    console.log("Products Data:", data);
    updateDoc(doc(db, "Products", id), data);

    setTimeout(() => {
      navigate("/view-product");
    }, 1500);
  };

  return (
    <>
{initialData && (
        <BaseForm
          title="Edit Product"
          fields={productFields}
        //   radioOptions={{
        //     label: "Classes",
        //     name: "allocatedClass",
        //     options: [
        //       { label: "Class 9", value: "Class 9" },
        //       { label: "Class 10", value: "Class 10" },
        //       { label: "Class 11", value: "Class 11" },
        //       { label: "Class 12", value: "Class 12" },
        //     ],
        //   }}
          onSubmit={handleProductSubmit}
          initialValues={initialData}
          toastValue="Product Updated"
        />
      )}
    </>
  )
}

export default EditProduct
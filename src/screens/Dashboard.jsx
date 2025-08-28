import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import stylesheet from "../components/Base Container/BaseContainer.module.css"
import BaseForm from "../components/Base Form/BaseForm";
import { BaseTable } from "../components/Base Table/BaseTable";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  // Add Form
  const resultFields = [
    { label: "Student Name", name: "name" },
    { label: "Subject", name: "subject" },
    { label: "Marks", name: "marks" },
    { label: "Email", name: "email", type: "email" },
    { label: "Field", name: "field" },
  ];

  // View Table
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Admissions"), (snapshot) => {
      let arr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataArr(arr);
    });

    return () => unsub();
  }, []);

  // Edit Form
  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const teacherFields = [
    { label: "Full Name", name: "name" },
    { label: "Email", name: "email", type: "email" },
    { label: "Profile", name: "profile" },
    { label: "Subject", name: "allocatedSubject" },

  ];

  React.useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const docRef = doc(db, "Teachers", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setInitialData(snap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };
    fetchTeacher();
  }, [id]);
  const handleTeacherSubmit = (data) => {
    console.log("Teacher Data:", data);
    updateDoc(doc(db, "Teachers", id), data);

    setTimeout(() => {
      navigate("/viewteacher");
    }, 1500);
  };

  return (
    <>
      <div className={stylesheet.baseContainer}>
      <h1>Dashboard</h1>

{/* Add Form */}
      <BaseForm
        title="Add Result"
        radioOptions={{
          label: "Class",
          name: "class",
          options: [
            { label: "Class 9", value: "9" },
            { label: "Class 10", value: "10" },
            { label: "Class 11", value: "11" },
            { label: "Class 12", value: "12" },
          ],
        }}
        toastValue="Result Added"
        fields={resultFields}
        initialValues={{}}
        // onSubmit={handleSubmit}
      />
{/* View Table */}
<BaseTable
        headers={["Name", "Email", "Class", "Field", "DOB", "Address", "Phone"]}
        keys={["name", "email", "class", "field", "dob", "address", "phone"]}
        rows={dataArr}
        // onDelete={handleDelete}
        // editPath="/editadmission"
        btnText="Admission"
        // btnNavigatePath="/createadmission"
      />

{/* Edit Form */}
{initialData && (
        <BaseForm
          title="Edit Teacher"
          fields={teacherFields}
          radioOptions={{
            label: "Classes",
            name: "allocatedClass",
            options: [
              { label: "Class 9", value: "Class 9" },
              { label: "Class 10", value: "Class 10" },
              { label: "Class 11", value: "Class 11" },
              { label: "Class 12", value: "Class 12" },
            ],
          }}
          onSubmit={handleTeacherSubmit}
          initialValues={initialData}
          toastValue="Teacher Updated"
        />
      )}
      </div>
    </>
  );
};

export default Dashboard;

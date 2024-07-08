import React, { useState } from "react";
import * as Yup from "yup";

const FormWithoutHook = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interest: [],
    birthDate: "",
  });

  const [err, setErr] = useState({});

  const signUpObject = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password should be atleast 8 characters")
      .matches(
        /[!@#$%^&*()<>|{}.?:;"~]/,
        "Password should have atleast one special character"
      )
      .matches(/[a-z]/, "Password should have atleast one lowercase character")
      .matches(/[A-Z]/, "Password should have atleast one uppercase character")
      .matches(/[0-9]/, "Password should have atleast one digit")
      .required("Password is required"),

    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "password must be matched"
    ),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(18, "Age must be above 18")
      .max(90, "Age must be below 90")
      .required("Age is required"),

    gender: Yup.string().required("Gender is required"),
    interest: Yup.array()
      .min(1, "Must select one interest")
      .required("Interest is required"),
    birthDate: Yup.date().required("DOB is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpObject.validate(data, { abortEarly: false });
      localStorage.setItem("user", JSON.stringify(data));
      alert("Signup succesfull..");
      setErr({});
    } catch (error) {
      // console.log(error.inner)
      const allErrors = {};
      error.inner.forEach((err) => {
        allErrors[err.path] = err.message;
      });
      setErr(allErrors);
    }
  };

  const handleClick = (e) => {
    let { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setData((prevInterest) => {
      if (checked) {
        return { ...prevInterest, interest: [...prevInterest.interest, name] };
      } else {
        return {
          ...prevInterest,
          interest: prevInterest.interest.filter((inter) => inter !== name),
        };
      }
    });
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>First name:</label>
          <input
            type="text"
            name="firstname"
            value={data.firstname}
            placeholder="Enter First name"
            onChange={handleClick}
          />
          {err.firstname && <div className="err">*{err.firstname}</div>}
        </div>

        <div>
          <label>Last name:</label>
          <input
            type="text"
            name="lastname"
            value={data.lastname}
            placeholder="Enter Last name"
            onChange={handleClick}
          />
          {err.lastname && <div className="err">*{err.lastname}</div>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Enter Email"
            onChange={handleClick}
          />
          {err.email && <div className="err">*{err.email}</div>}
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="number"
            name="phoneNumber"
            value={data.phoneNumber}
            placeholder="Enter Phone Number"
            onChange={handleClick}
          />
          {err.phoneNumber && <div className="err">*{err.phoneNumber}</div>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Enter Password"
            onChange={handleClick}
          />
          {err.password && <div className="err">*{err.password}</div>}
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            placeholder="Enter Confirmed Password"
            onChange={handleClick}
          />
          {err.confirmPassword && (
            <div className="err">*{err.confirmPassword}</div>
          )}
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={data.age}
            placeholder="Enter Age"
            onChange={handleClick}
          />
          {err.age && <div className="err">*{err.age}</div>}
        </div>

        <div>
          <label>Gender:</label>
          <select name="gender" onChange={handleClick}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {err.gender && <div className="err">*{err.gender}</div>}
        </div>

        <div>
          <label>Interest:</label>
          <label>
            <input
              type="checkbox"
              name="dsa"
              checked={data.interest.includes("dsa")}
              onChange={handleCheckBoxChange}
            />
            DSA
          </label>
          <label>
            <input
              type="checkbox"
              name="web"
              checked={data.interest.includes("web")}
              onChange={handleCheckBoxChange}
            />
            Web Dev
          </label>
          <label>
            <input
              type="checkbox"
              name="devOps"
              checked={data.interest.includes("devOps")}
              onChange={handleCheckBoxChange}
            />
            DevOps
          </label>
          {err.interest && <div className="err">*{err.interest}</div>}
        </div>

        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="birthDate"
            value={data.birthDate}
            placeholder="Enter Birth Date"
            onChange={handleClick}
          />
          {err.birthDate && <div className="err">*{err.birthDate}</div>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormWithoutHook;

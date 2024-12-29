import React, { useState } from "react";
import { Formik, Field, Form } from "formik";

function App() {
  // Initial data as a single array with default status_pemeriksaan unset (null)
  const [data, setData] = useState([
    {
      id_pemeriksaan: "A1",
      status_pemeriksaan: null, // Default unset
      verified_by: "pengawas",
    },
    {
      id_pemeriksaan: "A2",
      status_pemeriksaan: null, // Default unset
      verified_by: "pengawas",
    },
    {
      id_pemeriksaan: "A3",
      status_pemeriksaan: null, // Default unset
      verified_by: "pengawas",
    },
    {
      id_pemeriksaan: "A4",
      status_pemeriksaan: null, // Default unset
      verified_by: "pengawas",
    },
    {
      id_pemeriksaan: "A5",
      status_pemeriksaan: null, // Default unset
      verified_by: "pengawas",
    },
  ]);

  // Update the status_pemeriksaan in the data array dynamically
  const handleChange = (id_pemeriksaan, status) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id_pemeriksaan === id_pemeriksaan
          ? { ...item, status_pemeriksaan: status }
          : item
      )
    );
  };

  // Button click handler to log the entire array
  const handleSubmit = () => {
    console.log(data);
  };

  return (
    <div className="App">
      <h1>Radio Button Table Example</h1>
      <Formik
        initialValues={{}}
        onSubmit={(values) => console.log("Form data:", values)}>
        {() => (
          <Form>
            <table>
              <thead>
                <tr>
                  <th>ID Pemeriksaan</th>
                  <th>Status Pemeriksaan</th>
                  <th>Verified By</th>
                  <th>Selected</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id_pemeriksaan}>
                    <td>{item.id_pemeriksaan}</td>
                    <td>
                      {item.status_pemeriksaan
                        ? item.status_pemeriksaan
                        : "Belum Dipilih"}
                    </td>
                    <td>{item.verified_by}</td>
                    <td>
                      <Field
                        type="radio"
                        id={`status-${item.id_pemeriksaan}-memenuhi`}
                        name={`status-${item.id_pemeriksaan}`}
                        value="memenuhi"
                        checked={item.status_pemeriksaan === "memenuhi"}
                        onChange={() =>
                          handleChange(item.id_pemeriksaan, "memenuhi")
                        }
                      />
                      Memenuhi
                      <Field
                        type="radio"
                        id={`status-${item.id_pemeriksaan}-tidak_memenuhi`}
                        name={`status-${item.id_pemeriksaan}`}
                        value="tidak_memenuhi"
                        checked={item.status_pemeriksaan === "tidak_memenuhi"}
                        onChange={() =>
                          handleChange(item.id_pemeriksaan, "tidak_memenuhi")
                        }
                      />
                      Tidak Memenuhi
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button type="button" onClick={handleSubmit}>
              Log Data
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;

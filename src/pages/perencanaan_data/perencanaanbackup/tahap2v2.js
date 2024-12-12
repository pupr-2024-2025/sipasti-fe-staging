import { Button } from "@material-tailwind/react";
import { Field, FieldArray, Form, Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";

export default function Tahap2V2() {
  const [selectedValue, setSelectedValue] = useState(0);
  const [provincesOptions, setProvincesOptions] = useState([]);

  useEffect(() => {
    const fetchProvincesOptions = async () => {
      const response = await fetch(
        "https://api-ecatalogue-staging.online/api/provinces-and-cities"
      );
      const data = await response.json();
      console.log(data.data);
      setProvincesOptions(data.data);
    };

    fetchProvincesOptions();
  }, []);

  const items = ["Material", "Peralatan", "Tenaga Kerja"];
  const initialValues = {
    materials: [
      {
        nama_material: "",
        satuan: "",
        spesifikasi: "",
        ukuran: "",
        kodefikasi: "",
        kelompok_material: "",
        jumlah_kebutuhan: 0,
        merk: "",
        provincies_id: 0,
        cities_id: 0,
      },
    ],
    peralatans: [
      {
        nama_peralatan: "",
        satuan: "",
        spesifikasi: "",
        kapasitas: "",
        kodefikasi: "",
        kelompok_peralatan: "",
        jumlah_kebutuhan: 0,
        merk: "",
        provincies_id: 0,
        cities_id: 0,
      },
    ],
    tenagaKerjas: [
      {
        jenis_tenaga_kerja: "",
        satuan: "",
        jumlah_kebutuhan: 0,
        kodefikasi: "",
        provincies_id: 0,
        cities_id: 0,
      },
    ],
  };

  console.log(selectedValue);

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h1>Home</h1>
      <Tabs
        items={items}
        onChange={(index) => setSelectedValue(index)}
        selectedValue={selectedValue}
      />

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <MaterialForm
              values={values}
              setFieldValue={setFieldValue}
              hide={selectedValue !== 0}
              provincesOptions={provincesOptions}
            />
            <PeralatanForm
              values={values}
              setFieldValue={setFieldValue}
              hide={selectedValue !== 1}
              provincesOptions={provincesOptions}
            />
            <TenagaKerjaForm
              values={values}
              setFieldValue={setFieldValue}
              hide={selectedValue !== 2}
              provincesOptions={provincesOptions}
            />
            <Button type="submit" className="text-black">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const MaterialForm = ({ values, setFieldValue, hide, provincesOptions }) => {
  return (
    <div className={`${hide ? "hidden" : ""}`}>
      <h1>Material</h1>
      <FieldArray name="materials">
        {({ push, remove }) => (
          <div>
            {values.materials.map((_, index) => (
              <div key={index}>
                <Field
                  name={`materials.${index}.nama_material`}
                  placeholder="Nama Material"
                />
                <Field
                  name={`materials.${index}.satuan`}
                  placeholder="Satuan"
                />
                <Field
                  name={`materials.${index}.spesifikasi`}
                  placeholder="Spesifikasi"
                />
                <Field
                  name={`materials.${index}.ukuran`}
                  placeholder="Ukuran"
                />
                <Field
                  name={`materials.${index}.kodefikasi`}
                  placeholder="Kodefikasi"
                />
                <Field
                  as="select"
                  name={`materials.${index}.kelompok_material`}
                  placeholder="Kelompok Material">
                  <option value="">Pilih Kelompok Material</option>
                  <option value="Bahan Baku">Bahan Baku</option>
                  <option value="Bahan Olahan">Bahan Olahan</option>
                  <option value="Bahan Jadi">Bahan Jadi</option>
                </Field>
                <Field
                  name={`materials.${index}.jumlah_kebutuhan`}
                  placeholder="Jumlah Kebutuhan"
                />
                <Field name={`materials.${index}.merk`} placeholder="Merk" />
                <Field as="select" name={`materials.${index}.provincies_id`}>
                  <option value="">Pilih Provinsi</option>
                  {provincesOptions.map((province) => (
                    <option
                      key={province.id_province}
                      value={province.id_province}>
                      {province.province_name}
                    </option>
                  ))}
                </Field>
                <Field as="select" name={`materials.${index}.cities_id`}>
                  <option value="">Pilih Kota</option>
                  {/* after province set it should only filter the cities based on the selected province */}
                  {provincesOptions.map(
                    (province) =>
                      province.id_province ===
                        (values.materials[index]?.provincies_id ?? 0) &&
                      province.cities.map((city) => (
                        <option key={city.cities_id} value={city.cities_id}>
                          {city.cities_name}
                        </option>
                      ))
                  )}
                </Field>
                <Button onClick={() => remove(index)} className="text-black">
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={() => push()} className="text-black">
              Add
            </Button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

const PeralatanForm = ({ values, setFieldValue, hide, provincesOptions }) => {
  return (
    <div className={`${hide ? "hidden" : ""}`}>
      <h1>Peralatan</h1>
      <FieldArray name="peralatans">
        {({ push, remove }) => (
          <div>
            {values.peralatans.map((_, index) => (
              <div key={index}>
                <Field
                  name={`peralatans.${index}.nama_peralatan`}
                  placeholder="Nama Peralatan"
                />
                <Field
                  name={`peralatans.${index}.satuan`}
                  placeholder="Satuan"
                />
                <Field
                  name={`peralatans.${index}.spesifikasi`}
                  placeholder="Spesifikasi"
                />
                <Field
                  name={`peralatans.${index}.kapasitas`}
                  placeholder="Kapasitas"
                />
                <Field
                  name={`peralatans.${index}.kodefikasi`}
                  placeholder="Kodefikasi"
                />
                <Field
                  as="select"
                  name={`materials.${index}.kelompok_peralatan`}
                  placeholder="Kelompok Perlatan">
                  <option value="">Pilih Kelompok Peralatan</option>
                  <option value="Mekanis">Mekanis</option>
                  <option value="Semi Mekanis">Semi Mekanis</option>
                </Field>
                <Field
                  name={`peralatans.${index}.jumlah_kebutuhan`}
                  placeholder="Jumlah Kebutuhan"
                />
                <Field name={`peralatans.${index}.merk`} placeholder="Merk" />
                <Field as="select" name={`peralatans.${index}.provincies_id`}>
                  <option value="">Pilih Provinsi</option>
                  {provincesOptions.map((province) => (
                    <option
                      key={province.id_province}
                      value={province.id_province}>
                      {province.province_name}
                    </option>
                  ))}
                </Field>
                <Field as="select" name={`peralatans.${index}.cities_id`}>
                  <option value="">Pilih Kota</option>
                  {/* after province set it should only filter the cities based on the selected province */}
                  {provincesOptions.map(
                    (province) =>
                      province.id_province ===
                        (values.peralatans[index]?.provincies_id ?? 0) &&
                      province.cities.map((city) => (
                        <option key={city.cities_id} value={city.cities_id}>
                          {city.cities_name}
                        </option>
                      ))
                  )}
                </Field>
                <Button onClick={() => remove(index)} className="text-black">
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={() => push()} className="text-black">
              Add
            </Button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

const TenagaKerjaForm = ({ values, setFieldValue, hide, provincesOptions }) => {
  return (
    <div className={`${hide ? "hidden" : ""}`}>
      <h1>Tenaga Kerja</h1>
      <FieldArray name="tenagaKerjas">
        {({ push, remove }) => (
          <div>
            {values.tenagaKerjas.map((_, index) => (
              <div key={index}>
                <Field
                  name={`tenagaKerjas.${index}.jenis_tenaga_kerja`}
                  placeholder="Jenis Tenaga Kerja"
                />
                <Field
                  name={`tenagaKerjas.${index}.satuan`}
                  placeholder="Satuan"
                />
                <Field
                  name={`tenagaKerjas.${index}.jumlah_kebutuhan`}
                  placeholder="Jumlah Kebutuhan"
                />
                <Field
                  name={`tenagaKerjas.${index}.kodefikasi`}
                  placeholder="Kodefikasi"
                />
                <Field as="select" name={`tenagaKerjas.${index}.provincies_id`}>
                  <option value="">Pilih Provinsi</option>
                  {provincesOptions.map((province) => (
                    <option
                      key={province.id_province}
                      value={province.id_province}>
                      {province.province_name}
                    </option>
                  ))}
                </Field>
                <Field as="select" name={`tenagaKerjas.${index}.cities_id`}>
                  <option value="">Pilih Kota</option>
                  {/* after province set it should only filter the cities based on the selected province */}
                  {provincesOptions.map(
                    (province) =>
                      province.id_province ===
                        (values.tenagaKerjas[index]?.provincies_id ?? 0) &&
                      province.cities.map((city) => (
                        <option key={city.cities_id} value={city.cities_id}>
                          {city.cities_name}
                        </option>
                      ))
                  )}
                </Field>
                <Button onClick={() => remove(index)} className="text-black">
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={() => push()} className="text-black">
              Add
            </Button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

function Tabs({ index, items, onChange, selectedValue }) {
  const handleClick = (index) => {
    onChange(index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <Button
          key={index}
          color={selectedValue === index ? "blue" : "gray"}
          onClick={() => handleClick(index)}>
          <div
            className={`${
              selectedValue === index ? "text-blue-400" : "text-black"
            }`}>
            {item}
          </div>
        </Button>
      ))}
    </div>
  );
}

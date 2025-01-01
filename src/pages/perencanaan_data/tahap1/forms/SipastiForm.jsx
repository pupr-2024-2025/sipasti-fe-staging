import { Field, Form, Formik } from "formik";
import SimpleTabs from "../../../../components/SimpleTabs";
import TextInput from "../../../../components/input";
import Button from "../../../../components/button";
import tahap1Store from "./store/tahap1store";

const SipastiForm = ({
  initialValues = {
    kodeRup: "",
    namaPaket: "",
    namaPpk: "",
    jabatanPpk: "",
  },
  hide = true,
}) => {
  const { setSelectedTab } = tahap1Store();

  return (
    <div className={`${hide ? "hidden" : ""}`}>
      <div className="space-y-4">
        <div className="flex flex-row justify-between items-center">
          <SimpleTabs
            items={["Sinkron data dari SIPASTI", "Input Manual"]}
            selectedValue={0}
            onChange={(tabIndex) => setSelectedTab(tabIndex)}
          />
        </div>
      </div>
      <div className="">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
          enableReinitialize={true}
        >
          <Form>
            <div className="mt-3 bg-neutral-100 px-6 py-8 rounded-[16px] space-y-8">
              <Field name="kodeRup" type="input">
                {({ field, form }) => (
                  <div className="flex flex-row items-center space-x-4">
                    <TextInput
                      {...field}
                      label="Kode RUP"
                      labelPosition="left"
                      placeholder="Masukkan Kode RUP"
                      size="Medium"
                      errorMessage="Kode RUP tidak boleh kosong"
                      onChange={(e) =>
                        form.setFieldValue(field.name, e.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <Field name="namaPaket" type="input">
                {({ field, form }) => (
                  <div className="flex flex-row items-center space-x-4">
                    <TextInput
                      {...field}
                      label="Nama Paket"
                      labelPosition="left"
                      placeholder="Masukkan Nama Paket"
                      size="Medium"
                      errorMessage="Nama Paket tidak boleh kosong"
                      onChange={(e) =>
                        form.setFieldValue(field.name, e.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <div className="px-[236px]">
                <Button variant="disabled" size="Medium" onClick={() => {}}>
                  Cari Data di SIPASTI
                </Button>
              </div>
              <Field name="namaPpk" type="input">
                {({ field, form }) => (
                  <div className="flex flex-row items-center space-x-4">
                    <TextInput
                      {...field}
                      label="Nama PPK"
                      labelPosition="left"
                      placeholder="Masukkan Nama PPK"
                      size="Medium"
                      errorMessage="Nama PPK tidak boleh kosong"
                      onChange={(e) =>
                        form.setFieldValue(field.name, e.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <Field name="jabatanPpk" type="input">
                {({ field, form }) => (
                  <div className="flex flex-row items-center space-x-4">
                    <TextInput
                      {...field}
                      label="Jabatan PPK"
                      labelPosition="left"
                      placeholder="Masukkan Jabatan PPK"
                      size="Medium"
                      errorMessage="Jabatan PPK tidak boleh kosong"
                      onChange={(e) =>
                        form.setFieldValue(field.name, e.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="flex flex-row justify-end items-right space-x-4 mt-3 bg-neutral-100 px-6 py-8 rounded-[16px]">
        <Button
          type="button"
          variant="outlined_yellow"
          size="Medium"
          onClick={() => {}}
        >
          Kembali
        </Button>
        <Button
          type="submit"
          variant="solid_blue"
          size="Medium"
          onClick={() => {}}
        >
          Lanjut
        </Button>
      </div>
    </div>
  );
};

export default SipastiForm;

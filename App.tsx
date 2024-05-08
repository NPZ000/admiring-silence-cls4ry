import React from "react";
import { createForm, isDataField, onFormValuesChange } from "@formily/core";
import { FormProvider, Field, ArrayField, ObjectField } from "@formily/react";
import { Input, Button, Space, Radio } from "antd";

const form = createForm({
  effects() {
    onFormValuesChange(async (form) => {
      console.log("formvalue-->", JSON.parse(JSON.stringify(form.values)));
    });
  },
});
window.formily = form;
export default () => (
  <FormProvider form={form}>
    <Field
      name={"index"}
      component={[Input]}
      value={2}
      reactions={(field) => {
        const img = field.query("img").take();
        if (isDataField(img)) {
          if (!field.value) {
            img.value = undefined;
          }
          img.visible = !!field.value;
        }
        const video = field.query("video").take();
        isDataField(video) && (video.visible = !!!field.value);
      }}
    />
    <ObjectField name="img">
      <Field name={"key"} initialValue={1} />
      <ArrayField name="array">
        {(field) => {
          return (
            <>
              <div>
                {[1]?.map((item, index) => (
                  <ObjectField name="0">
                    <Field name={"image"} component={[Input]} />
                  </ObjectField>
                ))}
              </div>
            </>
          );
        }}
      </ArrayField>
    </ObjectField>
    <>1</>
    <ObjectField name="video" visible={false}>
      <Field name={"key"} initialValue={1} />
      <ArrayField name="list">
        {(field) => {
          return (
            <>
              <div>
                {[1]?.map((item, index) => (
                  <ObjectField name="0">
                    <Field name={"videoInfo"} component={[Input]} value={1} />
                  </ObjectField>
                ))}
              </div>
            </>
          );
        }}
      </ArrayField>
    </ObjectField>
  </FormProvider>
);

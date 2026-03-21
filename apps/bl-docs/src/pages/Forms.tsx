import { InputField, SelectField, Toggle, Checkbox, RadioGroup, RadioOption, TextArea, FileUpload, FormRow, ValidationMessage } from '@opswat/blue-line'
import { Section, Subsection, Guideline, ComponentBlock, InlineCode } from '../components/ComponentBlock'

export function FormsPage() {
  return (
    <Section
      id="forms"
      title="Forms"
      description="Input fields, select dropdowns, toggles, checkboxes, radios, text areas, file uploads, validation messages, and form layout rows."
    >
      <Guideline>
        Use <InlineCode>FormRow</InlineCode> for horizontal label-field alignment. All inputs are 32px
        height with consistent border and focus styles.
      </Guideline>

      <Subsection title="Input Field">
        <ComponentBlock
          preview={
            <div className="flex flex-col gap-3 max-w-xs">
              <InputField placeholder="Enter value" />
              <InputField placeholder="Error state" status="error" />
              <InputField placeholder="Success state" status="success" />
              <InputField placeholder="Disabled" disabled />
            </div>
          }
          code={`<InputField placeholder="Enter value" />
<InputField placeholder="Error state" status="error" />
<InputField placeholder="Success state" status="success" />
<InputField placeholder="Disabled" disabled />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Select Field">
        <ComponentBlock
          preview={
            <div className="flex flex-col gap-3 max-w-xs">
              <SelectField>
                <option>Choose option</option>
                <option>Option A</option>
                <option>Option B</option>
              </SelectField>
              <SelectField status="error">
                <option>Error state</option>
              </SelectField>
            </div>
          }
          code={`<SelectField>
  <option>Choose option</option>
  <option>Option A</option>
</SelectField>
<SelectField status="error">
  <option>Error state</option>
</SelectField>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Text Area">
        <ComponentBlock
          preview={
            <div className="max-w-sm">
              <TextArea placeholder="Enter description..." rows={3} />
            </div>
          }
          code={`<TextArea placeholder="Enter description..." rows={3} />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Toggle">
        <ComponentBlock
          preview={
            <div className="flex gap-6 items-center">
              <Toggle defaultChecked />
              <Toggle />
              <Toggle disabled />
            </div>
          }
          code={`<Toggle defaultChecked />
<Toggle />
<Toggle disabled />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Checkbox">
        <ComponentBlock
          preview={
            <div className="flex gap-6 items-center">
              <Checkbox label="Checked" checked readOnly />
              <Checkbox label="Unchecked" />
              <Checkbox label="Disabled" disabled />
            </div>
          }
          code={`<Checkbox label="Checked" checked onChange={handler} />
<Checkbox label="Unchecked" />
<Checkbox label="Disabled" disabled />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Radio Group">
        <ComponentBlock
          preview={
            <RadioGroup name="demo-radio" value="a">
              <RadioOption value="a" label="Option A" />
              <RadioOption value="b" label="Option B" />
              <RadioOption value="c" label="Option C" disabled />
            </RadioGroup>
          }
          code={`<RadioGroup name="demo" value="a">
  <RadioOption value="a" label="Option A" />
  <RadioOption value="b" label="Option B" />
  <RadioOption value="c" label="Option C" disabled />
</RadioGroup>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="File Upload">
        <ComponentBlock
          preview={
            <div className="max-w-sm">
              <FileUpload />
            </div>
          }
          code={`<FileUpload />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Validation Message">
        <ComponentBlock
          preview={
            <div className="flex flex-col gap-2">
              <ValidationMessage type="error">This field is required</ValidationMessage>
              <ValidationMessage type="success">Looks good!</ValidationMessage>
              <ValidationMessage type="error">Minimum 8 characters</ValidationMessage>
            </div>
          }
          code={`<ValidationMessage type="error">This field is required</ValidationMessage>
<ValidationMessage type="success">Looks good!</ValidationMessage>
<ValidationMessage type="error">Minimum 8 characters</ValidationMessage>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Form Row">
        <ComponentBlock
          preview={
            <div className="flex flex-col gap-4">
              <FormRow label="Name">
                <InputField placeholder="Enter name" />
              </FormRow>
              <FormRow label="Role">
                <SelectField>
                  <option>Select role</option>
                  <option>Admin</option>
                  <option>User</option>
                </SelectField>
              </FormRow>
            </div>
          }
          code={`<FormRow label="Name">
  <InputField placeholder="Enter name" />
</FormRow>
<FormRow label="Role">
  <SelectField>
    <option>Select role</option>
  </SelectField>
</FormRow>`}
          language="tsx"
        />
      </Subsection>
    </Section>
  )
}

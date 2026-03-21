import { useState } from 'react'
import { InputField, SelectField, Toggle, Checkbox, RadioGroup, RadioOption, TextArea, FileUpload, FormRow, ValidationMessage } from '@opswat/blue-line'
import { Section, Subsection, Guideline, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function FormsPage() {
  const [toggled, setToggled] = useState(true)
  const [radioValue, setRadioValue] = useState('a')

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

      <Subsection title="Password Input">
        <ComponentBlock
          preview={
            <div className="max-w-xs">
              <InputField type="password" placeholder="Enter password" />
            </div>
          }
          code={`<InputField type="password" placeholder="Enter password" />`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Clearable Input">
        <ComponentBlock
          preview={
            <div className="max-w-xs">
              <InputField placeholder="Clearable" clearable onClear={() => {}} />
            </div>
          }
          code={`<InputField placeholder="Clearable" clearable onClear={() => {}} />`}
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
              <Toggle checked={toggled} onChange={setToggled} />
              <Toggle checked={false} onChange={() => {}} />
              <Toggle checked={false} disabled />
            </div>
          }
          code={`const [toggled, setToggled] = useState(true)

<Toggle checked={toggled} onChange={setToggled} />
<Toggle checked={false} onChange={() => {}} />
<Toggle checked={false} disabled />`}
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
            <RadioGroup name="demo-radio" value={radioValue} onChange={setRadioValue}>
              <RadioOption value="a" label="Option A" />
              <RadioOption value="b" label="Option B" />
              <RadioOption value="c" label="Option C" disabled />
            </RadioGroup>
          }
          code={`const [radioValue, setRadioValue] = useState('a')

<RadioGroup name="demo" value={radioValue} onChange={setRadioValue}>
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

      <Subsection title="InputField Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>type</InlineCode>, <InlineCode>{"'text' | 'email' | 'password' | 'number' | 'date' | 'search'"}</InlineCode>, <InlineCode>"text"</InlineCode>, 'Input type (password shows eye toggle)'],
            [<InlineCode>placeholder</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Placeholder text'],
            [<InlineCode>status</InlineCode>, <InlineCode>{"'default' | 'error' | 'success'"}</InlineCode>, <InlineCode>"default"</InlineCode>, 'Visual status (border color)'],
            [<InlineCode>clearable</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Show clear button when field has a value'],
            [<InlineCode>onClear</InlineCode>, <InlineCode>{'() => void'}</InlineCode>, '—', 'Called when clear button is clicked'],
            [<InlineCode>disabled</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Disable the input'],
            [<InlineCode>value</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Controlled value'],
            [<InlineCode>onChange</InlineCode>, <InlineCode>ChangeEventHandler</InlineCode>, '—', 'Change handler'],
            [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
          ]}
        />
      </Subsection>

      <Subsection title="SelectField Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>status</InlineCode>, <InlineCode>{"'default' | 'error' | 'success'"}</InlineCode>, <InlineCode>"default"</InlineCode>, 'Visual status (border color)'],
            [<InlineCode>disabled</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Disable the select'],
            [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
            [<InlineCode>children</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'Option elements'],
          ]}
        />
      </Subsection>

      <Subsection title="TextArea Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>placeholder</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Placeholder text'],
            [<InlineCode>rows</InlineCode>, <InlineCode>number</InlineCode>, '—', 'Number of visible text rows'],
            [<InlineCode>status</InlineCode>, <InlineCode>{"'default' | 'error' | 'success'"}</InlineCode>, <InlineCode>"default"</InlineCode>, 'Visual status'],
            [<InlineCode>disabled</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Disable the textarea'],
            [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
          ]}
        />
      </Subsection>

      <Subsection title="Toggle Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>checked</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Whether the toggle is on'],
            [<InlineCode>onChange</InlineCode>, <InlineCode>{'(checked: boolean) => void'}</InlineCode>, '—', 'Called when toggled'],
            [<InlineCode>disabled</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Disable the toggle'],
          ]}
        />
      </Subsection>

      <Subsection title="Checkbox Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>label</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Label text next to the checkbox'],
            [<InlineCode>checked</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Whether the checkbox is checked'],
            [<InlineCode>onChange</InlineCode>, <InlineCode>{'(checked: boolean) => void'}</InlineCode>, '—', 'Called when toggled'],
            [<InlineCode>disabled</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Disable the checkbox'],
          ]}
        />
      </Subsection>

      <Subsection title="RadioGroup Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>name</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Form field name (groups radios together)'],
            [<InlineCode>value</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Currently selected value'],
            [<InlineCode>onChange</InlineCode>, <InlineCode>{'(value: string) => void'}</InlineCode>, '—', 'Called when selection changes'],
            [<InlineCode>children</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'RadioOption elements'],
          ]}
        />
      </Subsection>

      <Subsection title="FileUpload Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>accept</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Accepted file types (e.g. ".csv,.json")'],
            [<InlineCode>disabled</InlineCode>, <InlineCode>boolean</InlineCode>, <InlineCode>false</InlineCode>, 'Disable the upload area'],
            [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
          ]}
        />
      </Subsection>

      <Subsection title="FormRow Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>label</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Label text displayed to the left of the field'],
            [<InlineCode>children</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'Form field component'],
            [<InlineCode>className</InlineCode>, <InlineCode>string</InlineCode>, '—', 'Additional CSS classes'],
          ]}
        />
      </Subsection>

      <Subsection title="ValidationMessage Props">
        <PropsTable
          headers={['Prop', 'Type', 'Default', 'Description']}
          rows={[
            [<InlineCode>type</InlineCode>, <InlineCode>{"'error' | 'success'"}</InlineCode>, '—', 'Message type (determines color and icon)'],
            [<InlineCode>children</InlineCode>, <InlineCode>ReactNode</InlineCode>, '—', 'Message text'],
          ]}
        />
      </Subsection>
    </Section>
  )
}

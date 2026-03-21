import { useState } from 'react'
import { Tabs, TabPanel } from '@opswat/blue-line'
import { Section, Subsection, ComponentBlock, PropsTable, InlineCode } from '../components/ComponentBlock'

export function TabsPage() {
  const [active, setActive] = useState('tab1')

  const tabs = [
    { id: 'tab1', label: 'Overview' },
    { id: 'tab2', label: 'Settings' },
    { id: 'tab3', label: 'Logs' },
  ]

  return (
    <Section
      id="tabs"
      title="Tabs"
      description="Horizontal tab navigation for switching between content panels within the same view."
    >
      <Subsection title="Default">
        <ComponentBlock
          preview={
            <div>
              <Tabs tabs={tabs} activeTab={active} onTabChange={setActive}>
                <TabPanel id="tab1" activeTab={active}>
                  <div className="p-4 text-[14px] text-[var(--text-subtle)]">Overview content here.</div>
                </TabPanel>
                <TabPanel id="tab2" activeTab={active}>
                  <div className="p-4 text-[14px] text-[var(--text-subtle)]">Settings content here.</div>
                </TabPanel>
                <TabPanel id="tab3" activeTab={active}>
                  <div className="p-4 text-[14px] text-[var(--text-subtle)]">Logs content here.</div>
                </TabPanel>
              </Tabs>
            </div>
          }
          code={`const [active, setActive] = useState('tab1')

const tabs = [
  { id: 'tab1', label: 'Overview' },
  { id: 'tab2', label: 'Settings' },
  { id: 'tab3', label: 'Logs' },
]

<Tabs tabs={tabs} activeTab={active} onTabChange={setActive}>
  <TabPanel id="tab1" activeTab={active}>
    Overview content here.
  </TabPanel>
  <TabPanel id="tab2" activeTab={active}>
    Settings content here.
  </TabPanel>
</Tabs>`}
          language="tsx"
        />
      </Subsection>

      <Subsection title="Props">
        <PropsTable
          headers={['Prop', 'Type', 'Description']}
          rows={[
            [<InlineCode>tabs</InlineCode>, <InlineCode>TabItem[]</InlineCode>, 'Array of { id, label } tab definitions'],
            [<InlineCode>activeTab</InlineCode>, <InlineCode>string</InlineCode>, 'Currently active tab id'],
            [<InlineCode>onTabChange</InlineCode>, <InlineCode>(id: string) =&gt; void</InlineCode>, 'Tab change callback'],
          ]}
        />
      </Subsection>
    </Section>
  )
}

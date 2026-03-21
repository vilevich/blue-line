import { DocsLayout } from './components/DocsLayout'
import { OverviewPage } from './pages/Overview'
import { TokensPage } from './pages/Tokens'
import { IconsPage } from './pages/Icons'
import { ButtonsPage } from './pages/Buttons'
import { FormsPage } from './pages/Forms'
import { TabsPage } from './pages/TabsPage'
import { TagsPage } from './pages/Tags'
import { BadgesPage } from './pages/Badges'
import { ChipsPage } from './pages/Chips'
import { ScanStatusPage } from './pages/ScanStatus'
import { CardsPage } from './pages/Cards'
import { TablesPage } from './pages/Tables'
import { PaginationPage } from './pages/Pagination'
import { ToastsPage } from './pages/Toasts'
import { ModalsPage } from './pages/Modals'
import { LayoutPage } from './pages/Layout'

export function App() {
  return (
    <DocsLayout>
      <OverviewPage />
      <TokensPage />
      <IconsPage />
      <ButtonsPage />
      <FormsPage />
      <TabsPage />
      <TagsPage />
      <BadgesPage />
      <ChipsPage />
      <ScanStatusPage />
      <CardsPage />
      <TablesPage />
      <PaginationPage />
      <ToastsPage />
      <ModalsPage />
      <LayoutPage />
    </DocsLayout>
  )
}

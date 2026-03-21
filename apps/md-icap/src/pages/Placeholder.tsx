export function PlaceholderPage(title: string) {
  return (
    <>
      <div className="flex items-center h-8">
        <h2 className="text-[24px] font-medium leading-[27px] text-[var(--text-strong)]">{title}</h2>
      </div>
      <div className="flex-1 flex items-center justify-center text-[var(--text-muted)] text-[14px]">
        Coming soon
      </div>
    </>
  )
}

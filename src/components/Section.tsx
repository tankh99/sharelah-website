'use client';

export const Section = ({children}: React.PropsWithChildren) => {
  return (
    <section className="mb-6">
      {children}
    </section>
  )
}
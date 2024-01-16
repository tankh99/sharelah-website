'use client';

export const Header = ({children}: React.PropsWithChildren) => {
  return (
    <h3 className="text-3xl mb-4">
      {children}
    </h3>
  )
}